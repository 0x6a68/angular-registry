'use strict';

describe('Registry Module - function definitions', function () {

  beforeEach(module('ngRegistry'));

  it('should have a set function', inject(function ($registry) {
    expect(typeof $registry.set === 'function').toBe(true);
  }));

  it('should have a get function', inject(function ($registry) {
    expect(typeof $registry.get === 'function').toBe(true);
  }));

  it('should have a det function', inject(function ($registry) {
    expect(typeof $registry.del === 'function').toBe(true);
  }));

  it('should have a reset function', inject(function ($registry) {
    expect(typeof $registry.reset === 'function').toBe(true);
  }));

});

describe('Registry Module - Functionality Set & Get', function () {

  var mock = {
    'mockkey': 'value',
    'other': 'other value'
  };

  beforeEach(module('ngRegistry'));
  beforeEach(module(function ($registryProvider) {
    $registryProvider.defaults(mock);
  }));

  it('should get the setted defaults', inject(function ($registry) {
    expect($registry.get()).toEqual(mock);
  }));

  it('should set a simple key - value pair', inject(function ($registry) {
    $registry.set('key', 'value');
    expect($registry.get('key')).toBe('value');
  }));

  it('should set a deep object', inject(function ($registry) {
    var deep = {
      deep: {
        key: 'value'
      }
    };
    $registry.set('deep', deep);
    expect($registry.get('deep')).toEqual(deep);
    expect($registry.get('deep.deep')).toEqual(deep.deep);
    expect($registry.get('deep.deep.key')).toBe('value');
  }));

  it('should set an array', inject(function ($registry) {
    $registry.set('array', []);
    $registry.set('array[2]', 5);
    expect($registry.get('array[2]')).toBe(5);
  }));

  it('should set a function', inject(function ($registry) {
    $registry.set('fn', function (num) {
      return num+num;
    });
    expect($registry.get('fn')(4)).toBe(8);
  }));

});

describe('Registry Module - Functionality Del & Reset', function () {

  var defaults = {
    mock: 'value',
    other: 'other value'
  };

  beforeEach(module('ngRegistry'));

  beforeEach(module(function ($registryProvider) {
    $registryProvider.defaults(defaults);
  }));

  it('should reset to defaults', inject(function ($registry) {
    $registry.set('mock', 'changed');
    $registry.reset();
    expect($registry.get('mock')).toBe('value');
  }));

  it('should reset a part of defaults', inject(function ($registry) {
    $registry.set('mock', 'changed');
    $registry.set('new.key.pair', 'value');
    $registry.reset('mock');
    expect($registry.get('mock')).toBe('value');
    expect($registry.get('new.key.pair')).toBe('value');
  }));

  it('should delete a key - value pair', inject(function ($registry) {
    $registry.set('key.pair', 'value');
    $registry.del('key.pair');
    expect($registry.get('key.pair')).toBeUndefined();
  }));

});
