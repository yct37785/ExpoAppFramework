module.exports = {
  presets: [],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          // '@Managers': './src/Managers',
          // '@UI': './src/UI',
          // '@Const': './src/Const.ts',
          '@Root': './src/Root.tsx',
          '@Screen': './src/Screen',
          // '@Utils': './src/Utils.ts',
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
      }
    ]
  ]
};
