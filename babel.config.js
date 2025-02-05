
const presets = [
  [
    '@babel/preset-env', 
    { 
      // Указываем, какие версии браузеров поддерживать
      targets: { 
        edge: '17',
        ie: '11',
        firefox: '50',
        chrome: '64',
        safari: '11.1'
      }
    }
  ]
];