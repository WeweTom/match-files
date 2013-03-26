// -*- coding: utf-8; -*-
var assert = require('assert')
  , util = require('../lib/util')

describe('util function tools test',function(){
  it('#isAbsolutePath',function(){
    assert(util.isAbsolutePath('/a/b/c'),true)
    assert(util.isAbsolutePath('**a/b/c'),true)
    assert.equal(util.isAbsolutePath('a/b/c'),false)
    assert.equal(util.isAbsolutePath('*a/b/c'),false)
  })

  it('#getRootFromString',function(){
    assert.equal(util.getRootFromString('a/b/c'),process.cwd()+'/a')
    assert.equal(util.getRootFromString('*a/b/c'),process.cwd())
    assert.equal(util.getRootFromString('**a/b/c'),'/')
    assert.equal(util.getRootFromString('/a/b/c'),'/a')
  })

  it('#getProperPath',function(){
    assert.equal(util.getProperPath('var/www/f/dropbox/gits/abcenter/*/test'),'var/www/f/dropbox/gits/abcenter')
  })

  it('#getBeginPath',function(){
    assert.equal(util.getBeginPath(['/var/www/f/dropbox/gits/abcenter/ABC/test/parse_config/**/a.js','/var/www/f/dropbox/gits/abcenter/*/test/**/a.js']),'/var/www/f/dropbox/gits/abcenter')
  })
  it('#makeMoney',function(){
    var mm = util.makeMoney
    assert.equal(mm('/a/*/c/**/e.js','/a/b/c/dddd/fff/e.js')+'',["b", "dddd/fff"]+'')
    assert.equal(mm('/aaa/*/cccc/**/e.js','/aaa/b/cccc/dddd/fff/e.js')+'',["b", "dddd/fff"]+'')
    assert.equal(mm('**.js','/aaa/b/cccc/dddd/fff/e.js')+'',['/aaa/b/cccc/dddd/fff/e']+'')
    assert.equal(mm('*.js','/aaa/b/cccc/dddd/fff/e.js')+'',['/aaa/b/cccc/dddd/fff/e']+'')
  })
})







