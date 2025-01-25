import globals from 'globals';

export default [
    {
        languageOptions: {
            globals: {
                ...globals.node,
                process: "readonly",
                __dirname: "readonly"
            },
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: "script"
            }
        },
        rules: {
            "no-undef": "off",
            "no-console": "off"
        }
    }
];
