var matchFiles = require('../lib/match-files')

// 寻找../lib下的path-matcher.js
var stream = matchFiles('../lib','path-matcher.js')

stream.on('file',function(abs,filename,extname,$){
  console.log(filename)
})

/* result

   path-patcher.js

*/
