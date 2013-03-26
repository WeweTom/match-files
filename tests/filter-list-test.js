// -*- coding: utf-8; -*-
var assert = require('assert')
  , FilterList = require('../lib/filter-list')

describe('filter-list.js test',function(){
  it('#include exclude getList',function(){
    var filterlist = new FilterList()
      , list
    filterlist.include('*.js')
    filterlist.exclude('*.combo.js')
    list = filterlist.getList()
    assert.equal(list+'',['*.js','!*.combo.js']+'')
  })
})
