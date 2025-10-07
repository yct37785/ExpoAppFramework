module.exports = {
  presets: [],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@Core': './src/Core',
          '@Managers': './src/Managers',
          '@Theme': './src/Theme',
          '@UI': './src/UI',
          '@Const': './src/Const.ts',
          '@Root': './src/Root.tsx',
          '@Utils': './src/Utils.ts',
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
      }
    ]
  ]
};
