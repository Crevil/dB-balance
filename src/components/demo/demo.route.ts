/// <reference path="../../../typings/tsd.d.ts" />
/*
 * Name: demo module router
 * Description: Sets ui.router configuration
 */
module dBApp.demo {
    'use strict';

    angular
        .module('dBApp.demo')
        .config(['$stateProvider', ($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state('demo', {
                controller: DemoController,
                controllerAs: 'vm',
                templateUrl: 'components/demo/demo.html',
                url: '/demo'
            });
        }]);
}
