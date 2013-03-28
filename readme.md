# 一个简单文件匹配实现

# Examples
## 最简单的完全匹配
```javascript
var matchFiles = require('../lib/match-files')

// 寻找../lib下的path-matcher.js
var stream = matchFiles('../lib','path-matcher.js')

stream.on('file',function(abs,filename,extname,$){
  console.log(filename)
})

/* result

   path-patcher.js

*/
```
## 单星号匹配
```javascript
var matchFiles = require('../lib/match-files')
var stream = matchFiles('../lib','*.js')
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

## 双星号匹配 
```javascript
var matchFiles = require('../lib/match-files')

var stream = matchFiles('../../','match-files/**/treestream.js')
stream.on('file',function(abs,filename,extname,$){
  console.log(filename)
})

/* result:

treestream.js

*/

```
# API

## constructor
```javascript

MatchFiles(searchDir,include,exclude)

```
  - `searchDir` {String} 搜索的起始路径
  - `include` {String | Array} 要搜索的文件
  - `exclude` {String | Array} 要排除的文件

## 事件

  - `file`  回调函数中 `abs,filename,extname,$` 分别表示匹配到的文件的绝对路径,文件名,后缀名,匹配到的`*`或`**`数组
  - `end`
