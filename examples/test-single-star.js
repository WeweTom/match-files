var matchFiles = require('../lib/match-files')
var stream = matchFiles('../lib','*.js')
stream.on('file',function(abs,filename,extname,$){
  console.log(filename)
})


