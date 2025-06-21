import pluginJs from '@eslint/js';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: globals.node,
        },
        plugins: {
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
        },
    },
    pluginJs.configs.recommended,
];
