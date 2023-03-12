import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import JsonPlugin from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import eslint from '@rollup/plugin-eslint';
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle';
import copy from 'rollup-plugin-copy';

const packageJson = require('./package.json');
const { getFiles, copyStyleFilesToDest } = require('./scripts/utils');

const extensions = ['.js', '.ts', '.jsx', '.tsx'];
const SourceDir = 'components';
const DestDir = 'es';
const entry = `./${SourceDir}/index.ts`;

console.log(
    packageJson.name,
    packageJson.version
);
const copyFileEntries = getFiles(SourceDir, extensions);
const copyCssFileDests = copyStyleFilesToDest(copyFileEntries, [`${SourceDir}/index.ts`], SourceDir, DestDir);
console.log(copyFileEntries);
console.log(copyCssFileDests);

export default defineConfig({
    input: [
        entry
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
            dir: DestDir,
            format: 'es',
            preserveModules: true,
            preserveModulesRoot: SourceDir,
            sourcemap: true
        }
    ],
    plugins: [
        postcss({
            module: true,
            use: {
                sass: null,
                stylus: null,
                less: { javascriptEnabled: true }
            },
            plugins: [autoprefixer()],
            extract: true
        }),
        resolve({
            extensions: ['.js', 'jsx', '.ts', '.tsx']
        }),
        typescript({
            exclude: ['**/*.stories.tsx', '**/*.test.tsx'],
        }),
        eslint(),
        JsonPlugin(),
        excludeDependenciesFromBundle(),
        commonjs(),
        copy({
            targets: copyCssFileDests
        })
    ]
});
