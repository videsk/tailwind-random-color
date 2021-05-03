// Build plugins
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
// Serve plugins
import replace from 'rollup-plugin-replace';
import livereload from 'rollup-plugin-livereload';

import pkg from "./package.json";

const production = !process.env.ROLLUP_WATCH;

function serve() {
    let server;

    function toExit() {
        if (server) server.kill(0);
    }

    return {
        writeBundle() {
            if (server) return;
            server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
                shell: true
            });
            process.on('SIGTERM', toExit);
            process.on('exit', toExit);
        }
    };
}

function outputName(name) {
    return production ? name : 'public/bundle.js';
}

function addToBuild(options) {
    return production && options;
}

export default {
    input: 'src/index.js',
    output: [
        {
            file: outputName(pkg.browser),
            format: 'umd',
            name: 'FileShare',
            esModule: false,
            sourcemap: !production,
            strict: false,
        },
        addToBuild({
            file: pkg.main,
            format: 'cjs',
            sourcemap: !production,
        }),
        addToBuild({
            file: pkg.module,
            format: 'es',
            sourcemap: !production,
        }),
    ],
    plugins: [
        replace({ 'process.env.NODE_ENV': JSON.stringify( 'production' ) }),
        resolve({
            browser: true
        }),
        commonjs(),
        // In dev mode, call `npm run start` once
        // the bundle has been generated
        !production && serve(),
        // Watch the `public` directory and refresh the
        // browser on changes when not in production
        !production && livereload('public'),
        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser(),
    ],
    watch: {
        clearScreen: false
    }
}
