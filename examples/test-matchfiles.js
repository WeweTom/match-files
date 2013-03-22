var matchFiles = require('../lib/match-files')
  , Path = require('path')

var root = Path.resolve(Path.dirname(__filename),'../lib')
var stream = matchFiles(root,'*.js')

stream.on('file',function(abs,filename,extname,$){
  console.log(filename)
})

