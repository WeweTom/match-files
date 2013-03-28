var matchFiles = require('../lib/match-files')

var stream = matchFiles('../../','match-files/**/treestream.js')
stream.on('file',function(abs,filename,extname,$){
  console.log(filename)
})

/* result:

treestream.js

*/
