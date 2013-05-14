## angular-registry [![Build Status](https://travis-ci.org/johannestroeger/angular-registry.png?branch=master)](https://travis-ci.org/johannestroeger/angular-registry) [![Build Status](https://travis-ci.org/johannestroeger/angular-registry.png?branch=unstable)](https://travis-ci.org/johannestroeger/angular-registry)
A Registry Module for AngularJS. Handle Values and Constants within Angular-Projects easily and controller-wide.
***

### Features 
* set and get deep objects / arrays and even functions by string notation
* configure defaults and reset to them

### Demos
* [simple set / get / reset](http://plnkr.co/edit/aYy6Akic3rZN1zQ0Tea1?p=preview)
* *saving functions* soon!
* *broadcasting (two-way bind)* soon!

## Installation
Angular-Registry as a [Bower](http://bower.io/) Package
```sh
$ bower install angular-registry
```
Or if you already using Bower, add this entry into `bower.json`:

```javascript
"dependencies": {
  "angular-registry": "0.x.x"
}
```
## API
* defaults(object)
* get([expression])
* set(expression, value)
* del(expression)
* reset([expression])

## Usage

### Define dependencies
```javascript
var app = angular.module('app', ['johannestroeger.registry']);
```

### Set Defaults (optional) 
```javascript
app.config(function ($registryProvider){
  $registryProvider.defaults({
    "default": "values"
  })
});

```
### Set / Get / Del (and Reset, if you have set defaults)
```javascript
app.controller('MyCtrl', ['$registry', function ($registry) {
  $registry.set('key', 'value'); // setting registry entry: 'key' => 'value'
  $registry.get('key')           // getting register entry: 'key'
  $registry.get()                // complete register 
  $registry.reset()              // reset to configured defaults
}]);

```
