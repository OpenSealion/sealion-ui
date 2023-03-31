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
import url from '@rollup/plugin-url';
import inject from '@rollup/plugin-inject';

const packageJson = require('./package.json');
const { getFiles, copyStyleFilesToDest } = require('./scripts/utils');

const extensions = ['.js', '.ts', '.jsx', '.tsx'];
const SourceDir = 'src';
const DestDir = 'dist';
const entry = `./${SourceDir}/index.tsx`;

console.log(
    packageJson.name,
    packageJson.version
);
const copyFileEntries = getFiles(SourceDir, extensions);
const copyCssFileDests = copyStyleFilesToDest(copyFileEntries, [`${SourceDir}/index.ts`, `${SourceDir}/style/index.ts`], SourceDir, DestDir);
console.log(copyFileEntries);
// 把通用css复制到生成文件
copyCssFileDests.push({
    src: `${SourceDir}/style`,
    dest: `${DestDir}`
});

export default defineConfig([
    {
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
                file: 'dist/index.js',
                format: 'es',
                sourcemap: true
            }
        ],
        plugins: [
            url(),
            postcss({
                module: true,
                plugins: [autoprefixer],
                extensions: ['.less', '.css'],
                use: ['less'],
                extract: true,
                sourceMap: 'inline'
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
            // copy({
            //     targets: copyCssFileDests
            // })
            copy({
                targets: [{
                    src: `${SourceDir}/style/core/iconfont`,
                    dest: `${DestDir}`
                }]
            }),
            inject({
                React: 'react',
                include: ['.jsx', 'tsx']
            })
        ]
    }
]);
