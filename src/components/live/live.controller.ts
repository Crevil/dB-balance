/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../services/data.service.ts" />
/*
 * Name: liveController
 * Description: retreive data from API, set title and present data according to URL
 */
namespace dBApp.live {
    'use strict';

    export interface ILiveController {
        data: any;
    }

    export class LiveController {
        static $inject: Array<string> = ['$location', 'dataService'];

        data: any;

        constructor($location: angular.ILocationService, dataService: services.IDataService) {
            let location: string = $location.path();

            dataService.getPageTexts(location.substring(1, location.length))
                .then((data: any) => {
                    this.data = data.data;
                });
        }
    }

    angular
        .module('dBApp.live', [])
        .controller('liveController', LiveController)
        .config(['$stateProvider', ($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state('live', {
                controller: LiveController,
                controllerAs: 'vm',
                templateUrl: 'components/live/live.html',
                url: '/live'
            });
        }]);
}
