import typescript from '@rollup/plugin-typescript';
import buble from '@rollup/plugin-buble';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
//import uglify from 'rollup-plugin-uglify';
import {minify} from 'uglify-js';

/**
 * Default/development Build
 */
const config = {
    input: 'src/player-shadow-root.ts',
    output: {
      file: 'dist/player-shadow-root.js',
      format: 'umd',
      name: 'Player',
      sourcemap: true
    },
    plugins: [
        typescript(),
        buble(),
        resolve(),
        commonjs()
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
    config.plugins.push(minify)
}

// Report destination paths on console
console.info(`\u001b[36m\[Rollup ${process.env.BUILD} build\]\u001b[97m \nConverting Typescript from ${config.entry} to javascript, exporting to: ${config.targets[0].dest}`);

export default config