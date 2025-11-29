module.exports = {
  presets: [],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@Root': './src/Root.tsx',
          '@Screen': './src/Screen'
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
      }
    ]
  ]
};
