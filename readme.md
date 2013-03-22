# 一个简单文件匹配实现

# examples

```javascript

var matchFiles = require('../lib/match-files')
  , Path = require('path')

var root = Path.resolve(Path.dirname(__filename),'../lib')

// root should be a absolute path

var stream = matchFiles(root,'*.js')

stream.on('file',function(abs,filename,extname,$){
  console.log(filename)
})
/* result 

filter-list.js
path-matcher.js
treestream.js
match-files.js
util.js

*/

```

# TODO

- 测试


