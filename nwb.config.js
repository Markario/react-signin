module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactSignin',
      externals: {
        react: 'React'
      }
    }
  },
  babel: {
    stage: 1
  }
}
