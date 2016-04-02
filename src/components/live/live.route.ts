/// <reference path="../../../typings/tsd.d.ts" />
/*
 * Name: page module router
 * Description: Sets ui.router configuration
 */
module dBApp.live {
    'use strict';

    angular
        .module('dBApp.live')
        .config(['$stateProvider', ($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state('live', {
                controller: LiveController,
                controllerAs: 'vm',
                templateUrl: 'components/live/live.html',
                url: '/live'
            });
        }]);
}
