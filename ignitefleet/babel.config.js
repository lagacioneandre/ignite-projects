module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./app'],
          alias: {
            '@assets': './app/assets',
            '@components': './app/components',
            '@routes': './app/routes',
            '@screens': './app/screens',
            '@storage': './app/storage',
            '@theme': './app/theme',
            '@utils': './app/utils',
          },
        },
      ],
      [
        'module:react-native-dotenv',
        {
          'moduleName': '@env',
          'allowUndefined': false,
        }
      ]
    ],
  };
};
