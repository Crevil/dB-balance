/// <reference path="../../../typings/tsd.d.ts" />
/*
 * Name: home module router
 * Description: Sets ui.router configuration
 */
module dBApp.home {
    'use strict';

    angular
        .module('dBApp.home')
        .config(['$stateProvider', ($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state('home', {
                controller: HomeController,
                controllerAs: 'vm',
                templateUrl: 'components/home/home.html',
                url: '/'
            });
        }]);
}
