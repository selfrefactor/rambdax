const testConfig = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
}

module.exports = function(api) {
  const isTest = api.env('test')
  if(isTest) return testConfig
  
  return {
    presets: [ "@babel/preset-env"],
    plugins: [
      "@babel/plugin-proposal-export-default-from",
      "@babel/plugin-proposal-object-rest-spread"
    ]
  }
}
