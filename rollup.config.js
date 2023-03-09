import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript';
import JsonPlugin from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer';
// import dts from 'rollup-plugin-dts';
import eslint from '@rollup/plugin-eslint';
import excludeDependenciesFromBundle from "rollup-plugin-exclude-dependencies-from-bundle"

const packageJson = require('./package.json');
const { getFiles } = require('./scripts/utils');

const extensions = ['.js', '.ts', '.jsx', '.tsx'];

console.log(
    'getFiles(../ src / components, extensions)',
    ...getFiles('src/components', extensions)
);

export default defineConfig({
    input: [
        './src/index.ts'
    ],
    output: [
        // {
        //     dir: 'dist',
        //     format: 'es',
        //     // 用了source搬到build里面去后，就不能用file，只能用dir
        //     preserveModules: true,
        //     preserveModulesRoot: 'src',
        //     sourcemap: true
        // },
        {
            dir: 'es',
            format: 'es',
            preserveModules: true,
            preserveModulesRoot: 'src',
            sourcemap: true
        }
        // {
        //     file: 'es/index.js',
        //     format: 'es'
        // },
    ],
    plugins: [
        resolve({
            extensions: ['.js', 'jsx', '.ts', '.tsx', '.less']
        }),
        commonjs(),
        typescript({
            exclude: ['**/*.stories.tsx', '**/*.test.tsx'],
        }),
        eslint(),
        JsonPlugin(),
        excludeDependenciesFromBundle(),
        postcss({
            use: {
                sass: null,
                stylus: null,
                less: { javascriptEnabled: true }
            },
            extract: true
        }),
        // postcss({
        //     extensions: ['.less', '.css'],
        //     use: ['less'],
        //     plugins: [autoprefixer()]
        // }),
    ]
});
