// -*- coding: utf-8; -*-
var util = require('util')
  , configUtil = require('./util')
  , FilterList = require('./filter-list')
  , Matcher = require('./path-matcher')
  , Path = require('path')
  , Emitter = require('events').EventEmitter
  , TreeStream = require('./treestream')

function MatchFiles(cwd,include,exclude){
  if(!(this instanceof MatchFiles)){
    return new MatchFiles(cwd,include,exclude)
  }
  if(!configUtil.isAbsolutePath(cwd)){
    cwd = Path.resolve(process.cwd(),cwd)
  }

  this.cwd = cwd
  this.include = include
  this.exclude = exclude

  this.init()

  return this;
}
util.inherits(MatchFiles,Emitter);

MatchFiles.prototype.init = function(){
  var include = this.include
    , exclude = this.exclude
    , cwd = this.cwd

  var result = []
    , list
    , treestream
    , filterlist = new FilterList()
    , root
    , currentWorkingDir
    , that = this

  root = configUtil.getBeginPath(include,Path.sep)
  filterlist.include(include)
  filterlist.exclude(exclude)

  if(configUtil.isAbsolutePath(root)){
    currentWorkingDir = root
    list = filterlist.getList()
  }else{
    currentWorkingDir = Path.resolve(cwd || process.cwd())
    list = filterlist.getList(currentWorkingDir)
  }
  treestream = new TreeStream(list)

  treestream.on('file',function(path,absPath,wild){
    result.push({path:path,absPath:absPath})
    // if(wild){
      // var $ = configUtil.makeMoney(wild,absPath)
      //   , filename = Path.basename(absPath)
      //   , extname = Path.extname(absPath)
      // that.emit('file',absPath,filename,extname,$)
    // }
  })
  treestream.on('end',function(){
    var wild
    while(list.length){
      wild = list.shift();
      result.forEach(function(r){
        if(r._emited)return;
        var $ //configUtil.makeMoney(wild,absPath)
          , filename = Path.basename(r.absPath)
          , extname = Path.extname(r.absPath)
        if(Matcher.match(wild,r.absPath)){
          configUtil.makeMoney(wild,r.absPath)
          that.emit('file',r.absPath,filename,extname,$)
          r._emited = true;
        }else{
          return;
        }
      });
    }
    that.emit('end')
  })
  treestream.on('error',function(err){
    throw err
  })
  treestream.visit(currentWorkingDir)
}
module.exports = MatchFiles