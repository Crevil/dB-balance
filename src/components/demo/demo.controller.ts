/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../services/data.service.ts" />
/*
 * Name: demoController
 * Description: retreive data from API, set title and present data according to URL
 */
namespace dBApp.demo {
    'use strict';

    export interface IDemoController {
        data: any;
    }

    export class DemoController {
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
        .module('dBApp.demo', [])
        .controller('demoController', DemoController)
        .config(['$stateProvider', ($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state('demo', {
                controller: DemoController,
                controllerAs: 'vm',
                templateUrl: 'components/demo/demo.html',
                url: '/demo'
            });
        }]);
}
