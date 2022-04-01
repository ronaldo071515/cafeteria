
const { src, dest, watch, series, parallel } = require('gulp');

//CSS Y SCSS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

//IMAGENES
const imagenmin  = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css( done ) {

    //Copilar sass
    //pasos: 1, didentificar, 2, compilar, guardar el .css
    src('src/scss/app.scss')
        .pipe( sass({ outputStyle: 'compressed' }) )
        .pipe( postcss( [ autoprefixer() ] ) )
        .pipe( dest('build/css') )
    done();
}

function imagenes() {
    return src('src/img/**/*')
        .pipe( imagenmin({ optimizationLevel: 3 }) )
        .pipe( dest('build/img') );
}

function versionWebp() {
     return src('src/img/**/*.{png,jpg}')
        .pipe( webp() )
        .pipe( dest('build/img') )
}

function versionAvif() {
    const options = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe( avif( options ) )
        .pipe( dest('build/img') )
}

function dev() {
    watch( 'src/scss/**/*.scss', css );
    watch( 'src/img/**/*', imagenes );
}



exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series( imagenes, versionWebp, versionAvif, css, dev );

//series - se inicia una tarea, y hasta que se finaliza inicia la siguiente

//paralell - Todas inician al mismo tiempo