// -*- coding: utf-8; -*-
var assert = require('assert')
  , Matcher = require('../lib/path-matcher')

describe('match files test',function(){
  it('#match',function(){
    assert.equal((Matcher.match('*.txt','foo.txt')),true)
    assert.equal(Matcher.match('*.txt','foot.js'),false)
    assert.equal(Matcher.match('foo/**/bar/*.txt','foo/moo/goo/bar/myfile.txt'),true)
    assert.equal(Matcher.match('foo.txt','bar/foo.txt'),false)
  })

  it('#matches',function(){
    var list = ['*.js', '!bin/*.js']
    assert.equal(Matcher.matches(list,'foo.js'),'*.js')
    assert.equal(Matcher.matches(list,'lib/foo.js'),false);
    assert.equal(Matcher.matches(list,'bin/foo.js'),false);


    assert.equal((Matcher.match('/*.js','/foo.js')),true)

  })
  it('#match for absolute path',function(){
    assert.equal(Matcher.match('/var/www/f/dropbox/gits/abcenter/ABC/lib/utils/*.js','/var/www/f/dropbox/gits/abcenter/ABC/lib/utils/a.js'),true)
    assert.equal(Matcher.match('/var/www/f/**/abcenter/ABC/lib/utils/*.js','/var/www/f/dropbox/gits/abcenter/ABC/lib/utils/a.js'),true)
    assert.equal(Matcher.match('/var/www/f/*/*.js','/var/www/f/b/a.js'),true)
  })

  it('#matches for absolute paths',function(){
    assert.equal( Matcher.matches(['/var/www/f/dropbox/gits/abcenter/ABC/test/parse_config/src/a.js','/var/www/f/dropbox/gits/abcenter/ABC/test/parse_config/src/b.js'],'/var/www/f/dropbox/gits/abcenter/ABC/test/parse_config/src/c.js'),false)
    assert.equal(Matcher.matches([ '/var/www/f/dropbox/gits/abcenter/ABC/test/parse_config/**/a.js','/var/www/f/dropbox/gits/abcenter/ABC/test/parse_config/**/b.js' ],'/var/www/f/dropbox/gits/abcenter/ABC/test/parse_config/src/a.js'),'/var/www/f/dropbox/gits/abcenter/ABC/test/parse_config/**/a.js')
  })

  it('#match/matches reverse',function(){
    assert.equal(Matcher.match('lib/foo/bar/*.js','lib/foo',true),true)
    assert.equal(Matcher.match('lib/foo/bar/*.js','lib/bar',true),false)
    assert.equal(Matcher.matches([ '/var/www/f/dropbox/gits/abcenter/ABC/test/parse_config/**/a.js',
  '/var/www/f/dropbox/gits/abcenter/ABC/test/parse_config/**/b.js'],'/var/www/f/dropbox/gits/abcenter/ABC/test/parse_config/src',true),'/var/www/f/dropbox/gits/abcenter/ABC/test/parse_config/**/a.js')
  })
})









