/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../services/data.service.ts" />
/*
 * Name: equipmentController
 * Description: retreive data from API, set title and present data according to URL
 */
namespace dBApp.equipment {
    'use strict';

    export interface IEquipmentController {
        data: any;
    }

    export class EquipmentController {
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
        .module('dBApp.equipment', [])
        .controller('equipmentController', EquipmentController)
        .config(['$stateProvider', ($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state('equipment', {
                controller: EquipmentController,
                controllerAs: 'vm',
                templateUrl: 'components/equipment/equipment.html',
                url: '/equipment'
            });
        }]);
}
