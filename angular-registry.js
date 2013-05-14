'use strict';

/**
 * Angular Registry - A Registry Module for Angular
 *
 */

angular.module('johannestroeger.registry', [])

.provider('$registry', function () {

  var register = {};
  var defaults = {};

  this.defaults = function (obj) {
    defaults = obj;
    angular.extend(register, defaults);
  };

  this.$get = ['$parse', function ($parse) {

    var cache = {};

    var fnCache = function (exp) {
      return (cache[exp]) ? cache[exp] : cache[exp] = $parse(exp);
    };

    var registry = function (root, exp, value, del) {
      var parse = fnCache(exp);

      if(value || del) {
        return parse.assign(root, value);
      }
      if(exp) {
        return parse(root);
      }

      return root;
    };

    return {
      set: function (exp, value) {
        return registry(register, exp, value);
      },
      get: function (exp) {
        return registry(register, exp);
      },
      del: function (exp) {
        return registry(register, exp, undefined, true);
      },
      reset: function(exp) {
        if(exp) {
          return registry(register, exp, registry(defaults, exp));
        }
        register = {};
        return angular.extend(register, defaults);
      }
    };
  }];
});
