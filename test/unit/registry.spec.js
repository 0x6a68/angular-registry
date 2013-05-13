'use strict';

describe('Registry Module - Simple Tasks', function () {

  var mock = {
    'mockkey': 'value',
    'other': 'other value'
  };

  beforeEach(module('ngRegistry'));
  beforeEach(module(function ($registryProvider) {
    $registryProvider.defaults(mock);
  }));

  it('should get the complete defaults', inject(function ($registry) {
    expect($registry.get()).toEqual(mock);
  }));

  it('should set a key - value pair', inject(function ($registry) {
    $registry.set('keypair', 'value');
    expect($registry.get('keypair')).toBe('value');
  }));

  it('should update a key - value pair', inject(function ($registry) {
    $registry.set('keypair', 'value');

    expect($registry.get('keypair')).toBe('value');

    $registry.set('keypair', 'changed');

    expect($registry.get('keypair')).not.toBe('value');
    expect($registry.get('keypair')).toBe('changed');
  }));

  it('should be able to delete a simple key:value pair', inject(function ($registry) {
    $registry.set('key', 'value');
    $registry.del('key');
    expect($registry.get('key')).not.toBe('value');
    expect($registry.get('key')).toBeUndefined();
  }));

  it('should set and get a deep object', inject(function ($registry){
    var deep = {
      deep: {
        deep: {
          key: 'value'
        }
      }
    };
    $registry.set('deep key', deep);

    expect($registry.get('deep key')).toEqual(deep);
  }));

  it('should be able to reset to defaults', inject(function ($registry) {
    $registry.set('additional key', 'value');

    expect($registry.get()).not.toEqual(mock);

    $registry.reset();

    expect($registry.get()).toEqual(mock);
  }));
});

describe('Registry Module - Advanced Tasks', function() {

  var mock = {
    'mock key': {
      'deeper mock key': 'value',
      'another deep mock key': 'other value'
    },
    'other': 'other value'
  };

  beforeEach(module('ngRegistry'));
  beforeEach(module(function ($registryProvider) {
    $registryProvider.defaults(mock);
  }));

  it('should set and get a deep object, by a string notation', inject(function ($registry) {
    var mock = {
      deep: {
        key: 'value'
      }
    };
    $registry.set('mock', mock);

    expect($registry.get('mock.deep')).toEqual(mock.deep);
    expect($registry.get('mock.deep.key')).toBe('value');
  }));

  it('should reset to only a part of default, by key', inject(function ($registry) {
    $registry.set('mock key.deeper mock key', 'changed');
    $registry.set('other', 'also changed');
    $registry.reset('mock key');

    expect($registry.get('mock key.deeper mock key')).toBe('value');
    expect($registry.get('other')).toBe('also changed');
  }));

  it('should be able to delete a complex object structure', inject(function ($registry) {
    var mock = {
      deep: {
        key: 'value'
      },
      otherdeep: {
        key: 'other value'
      }
    };

    $registry.set('mock', mock);
    $registry.del('mock.deep.key');

    expect($registry.get('mock.deep.key')).not.toBe('value');
    expect($registry.get('mock.deep.key')).toBeUndefined();

    $registry.set('mock', mock);
  }));
});
