const config = {
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  endOfLine: 'auto',
  printWidth: 80,
  bracketSpacing: true,
  arrowParens: 'always',

  plugins: [
    'prettier-plugin-organize-imports',
    'prettier-plugin-packagejson',
    'prettier-plugin-tailwindcss',
  ],
};

export default config;
