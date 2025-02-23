import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility';
import eslintPluginImportX from 'eslint-plugin-import-x';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config(
    {
        ignores: ['tsconfig.json', 'vite.config.ts', 'eslint.config.ts'],
        extends: [
            eslint.configs.recommended,
            eslintPluginImportX.flatConfigs.recommended,
            tseslint.configs.recommended,
            pluginVueA11y.configs['flat/recommended'],
            pluginVue.configs['flat/recommended'],
            stylistic.configs.recommended,
        ],
        files: ['**/*.ts', '**/*.vue'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.browser,
            parserOptions: {
                parser: tseslint.parser,
                project: 'tsconfig.json',
                extraFileExtensions: ['.vue'],
            },
        },
        plugins: {
            'no-relative-import-paths': noRelativeImportPaths,
            stylistic: stylistic,
        },
        rules: {
            /* Vue rules */
            'vue/component-api-style': ['error', ['script-setup']], // Enforce script setup
            'vue/match-component-file-name': ['error', { extensions: ['vue'], shouldMatchCase: true }], // Enforce component name to match its file name
            'vue/max-attributes-per-line': ['error', { singleline: { max: 3 }, multiline: { max: 1 } }], // Enforce the maximum number of attributes per line
            'vue/first-attribute-linebreak': ['error', { singleline: 'beside', multiline: 'below' }], // Enforce the location of first attribute
            'vue/no-v-model-argument': 'off', // Allows adding an argument to v-model used in custom components
            'vue/component-name-in-template-casing': ['error', 'PascalCase'], // Enforce PascalCase for component namings in template
            'vuejs-accessibility/click-events-have-key-events': 'off', // Disable click events must have key events
            'vuejs-accessibility/interactive-supports-focus': 'off', // Disable buttons must have focus events
            'vue/eqeqeq': 'error', // Require the use of === and !== in <template>

            /* TypeScript rules */
            '@typescript-eslint/consistent-type-imports': 'error', // Enforce consistent usage of type imports.
            '@typescript-eslint/no-explicit-any': 'error', // No `any` use unknown instead.
            '@typescript-eslint/no-non-null-assertion': 'error', // Disallow non-null assertions using the ! postfix operator.
            '@typescript-eslint/no-floating-promises': 'error', // Must handle async calls
            '@typescript-eslint/no-unsafe-call': 'off', // allow calling a value with type any.
            '@typescript-eslint/no-unsafe-member-access': 'off', //allow member access on a value with type any.
            '@typescript-eslint/no-unsafe-assignment': 'off', // allow assigning a value with type any to variables and properties.
            '@typescript-eslint/no-unsafe-return': 'error', // Disallow returning a value with type any from a function.
            '@typescript-eslint/no-unnecessary-type-assertion': 'error', // Disallow type assertions that do not change the type of an expression.
            '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }], // Require @ts-ignore comments to include a description, preventing undocumented suppression of TypeScript errors.
            '@typescript-eslint/explicit-function-return-type': 'error', // Require explicit return types on functions and class methods.

            /* ESLint rules */
            curly: ['error', 'multi'], // Enforce curly braces on multi lines.
            'no-var': 'error', // Require let or const instead of var.
            'no-bitwise': 'error', // Disallow bitwise operators.
            'prefer-destructuring': ['error', { array: true, object: true }], // Enforce array and object destructuring where possible to improve code readability and maintainability.
            'no-param-reassign': ['error', { props: true }], // Disallow the modification of parameter properties.
            radix: ['error', 'always'], // Enforce the consistent use of the radix argument when using parseInt()
            'no-shadow': 'error', // Disallow variable declarations from shadowing variables declared in the outer scope.
            'no-underscore-dangle': ['error', { allow: [] }], // Disallow dangling underscores in identifiers, unless specified here.
            'no-nested-ternary': 'error', // Disallows nested ternary expressions.

            /* ESLint stylistic style rules */
            'stylistic/operator-linebreak': ['error'], // requires linebreaks to be placed before the operator.
            'stylistic/quotes': ['error', 'single', { avoidEscape: true }], // Enforce single quotes for strings, allowing double quotes only when necessary to avoid escaping.
            'stylistic/new-parens': 'error', //  Enforce parentheses when invoking a constructor with no arguments.
            'stylistic/no-trailing-spaces': 'error', // Disallows trailing whitespaces.
            'stylistic/eol-last': 'error', // Require newline at the end of files.
            'stylistic/max-len': ['error', { code: 150, ignorePattern: 'd="([\\s\\S]*?)"' }], // Enforces a maximum line length to increase code readability and maintainability.
            'stylistic/block-spacing': 'error', // Enforces consistent spacing inside an open block token and the next token on the same line.
            'stylistic/indent': ['error', 4], // Enforce same indentation

            /* Import rules */
            'import-x/first': 'error', // Enforce imports to be at the top of the script.
            'import-x/newline-after-import': 'error', // Enforces having one or more empty lines after the last top-level import statement.
            'import-x/no-cycle': ['error', { maxDepth: 4, ignoreExternal: true }], // Ensures that there is no resolvable path back to this module via its dependencies.
            'import-x/order': [
                'error',
                {
                    pathGroups: [
                        {
                            pattern: '**/*.vue',
                            group: 'internal',
                            position: 'after',
                        },
                    ],
                    groups: [
                        'object', // Imports that use object destructuring
                        'type', // Type imports
                        'unknown', // Unknown types of imports
                        'builtin', // Node.js built-ins (fs, path, etc.)
                        'external', // External packages (node_modules)
                        'internal', // Aliased imports (e.g., @/utils)
                        'parent', // Parent imports (../)
                        'sibling', // Sibling imports (./)
                        'index', // Index imports (./)
                    ],
                },
            ], // Enforces specific import order
            'no-relative-import-paths/no-relative-import-paths': [
                'error',
                { allowSameFolder: false, rootDir: 'src', prefix: '@' },
            ], // Enforces absolute import paths.
        },
        settings: {
            'import-x/resolver-next': [
                createTypeScriptImportResolver({
                    alwaysTryTypes: true,
                    project: 'tsconfig.json',
                }),
            ],
        },
    },
    eslintConfigPrettier,
);
