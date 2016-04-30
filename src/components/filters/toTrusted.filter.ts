/// <reference path="../../../typings/main.d.ts" />
/*
 * Name: toTrusted
 * Description: Trust data as html
 */
namespace dBApp.filters {
    'use strict';

    angular
        .module('dBApp.filters')
        .filter('toTrustedFilter', ['$sce', ($sce: angular.ISCEService) => {
            return (input: string) => {
                return $sce.trustAsHtml(input);
            };
        }]);
}
