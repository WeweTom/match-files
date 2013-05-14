// -*- coding: utf-8; -*-
var Path = require('path')

function isString(o){
  return toString.call(o) === '[object String]'
}

exports.isString = isString

// a/b/c   -> cwd+/a
// *a/b/c  -> cwd
// **a/b/c -> /
// /a/b/c  -> /a
function getRootFromString(strs,cwd,sep){
  if(!strs) return Path.sep
  sep || (sep = Path.sep);
  cwd || (cwd = process.cwd())
  var astr = strs.split(sep)
  var str = astr[0]
  var ret ;

  if(str.indexOf('**') > -1){
    ret = sep
  }else if(str.indexOf('*') > -1){
    ret = cwd
  }else if(str == ''){
    ret = sep+astr[1]
  }else{
    ret = cwd+sep+str
  }
  return Path.resolve(ret);
}
exports.getRootFromString = getRootFromString

// a/b/*/*.js -> a/b
// a/**/*.js  -> a
// b.js ->
function getProperPath(str,sep){
  var i = str.indexOf('*')
    , p
    , pa
  sep|| (sep = Path.sep);
  if(i>-1){
    p = str.slice(0,i)
  }else{
    p = str
  }

  pa = p.split(sep)
  pa.pop()
  return pa.join(sep)
}
exports.getProperPath = getProperPath;

// 测试一个路径是否为绝对路径
// '/'开始的为绝对路径
// 通配符"**"开始的路径也看做绝对路径
// TODO C://path/filename 也是绝对路径
function isAbsolutePath(p){
  return p[0] === '/'
      || p[1] == ':'
      || p.slice(0,2) == "**"
}

exports.isAbsolutePath = isAbsolutePath

function getBeginPath(path_pattern_arr,sep){
  sep || (sep = Path.sep);
  var max = path_pattern_arr[0]
  if(isString(path_pattern_arr)){
    path_pattern_arr = [path_pattern_arr]
  }
  for(var i=1;i<path_pattern_arr.length;i++){
    var p
    p = getProperPath(path_pattern_arr[i],sep)
    if(p && p.length<max.length){
      max = p
    }
  }
  return max
}

exports.getBeginPath = getBeginPath

function makeMoney(wild,path){
  wild = wild.replace(/\*{2,}/g,'(.@)')
             .replace(/\*/g,'(.@?)')
             .replace(/\@/g,'*')
  wild = wild.replace(/\\/g,'/');

  var re = new RegExp(wild,'g')
    , tmp
  tmp = re.exec(path)
  if(tmp){
    return tmp.slice(1)
  }else{
    return []
  }
}
exports.makeMoney = makeMoney