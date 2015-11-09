/// <reference path="../typings/tsd.d.ts" />
module dBApp {
  angular.module('dBApp', [
	'dBApp.core',
	'dBApp.services',
	'dBApp.filters',

	'dBApp.directives',
	'dBApp.gallery',

	'dBApp.home',
	'dBApp.equipment',
	'dBApp.demo',
	'dBApp.live',
	'dBApp.contact',
	'dBApp.feedback']);
}
