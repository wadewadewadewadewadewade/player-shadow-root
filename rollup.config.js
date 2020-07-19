import multi from '@rollup/plugin-multi-entry'
import scss from 'rollup-plugin-scss'
//import typescript from '@rollup/plugin-typescript';
//import buble from '@rollup/plugin-buble';
//import resolve from '@rollup/plugin-node-resolve';
//import commonjs from '@rollup/plugin-commonjs';
//import {minify} from 'uglify-js';

/**
 * Default/development Build
 */
const config = {
    input: ['lib/declarations.d.js','lib/CustomElementDecorator.js','lib/player-shadow-root.js'],
    output: {
      file: 'dist/player-shadow-root.js',
      format: 'umd',
      name: 'Player',
      sourcemap: true
    },
    plugins: [
      multi(),
      scss({output: false})
      //typescript(),
      //buble(),
      //resolve(),
      //commonjs()
    ]
}

// Minified JS Build
if (process.env.BUILD === 'minify') {
    config.output = {
      file: 'dist/player-shadow-root.min.js',
      format: 'umd',
      name: 'Player',
      sourcemap: false
    };
    //config.plugins.push(minify)
}

export default config