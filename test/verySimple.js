/* global describe,before,after,beforeEach,it */
'use strict';

var Nemo = require('nemo'),
  path = require('path'),
  util = require(path.resolve(__dirname, 'util')),
  assert = require('assert'),
  nemo = {};
var config = require("./config/config");
describe('nemo-view @verySimple@', function () {
  before(function (done) {
    nemo = Nemo(function (err) {
      if (!!err) {
        done(err);
        return;
      }
      done();
    });
    allure.addEnvironment("host", config.data);
  });
  after(function (done) {
    nemo.driver.quit().then(done);
  });

  beforeEach(function (done) {
    nemo.driver.get(nemo.data.baseUrl);
    util.waitForJSReady(nemo).then(util.doneSuccess(done), util.doneError(done));
  });
  it('should use the form view to enter values and write to outy div @useView@', function (done) {
    nemo.view._find('css:#outy').getTagName().then(function (tn) {
      assert.equal(tn.toLowerCase(), 'div');
    });
    nemo.view._finds('body').then(function (bodyArray) {
      return bodyArray[0].getTagName();
    }).then(function (tn) {
      assert.equal(tn.toLowerCase(), 'body');
    }).then(done, util.doneError(done));
  });
});