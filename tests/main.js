var Path = require('path')
  , Matchfiles = require('../lib/match-files.js')

var stream = Matchfiles('.','*.less','');
stream.on('file',function(abs,filename,extname,$){
  console.log(abs);
})

