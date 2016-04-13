/// <reference path="../typings/tsd.d.ts" />
namespace dBApp {
    'use strict';

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
