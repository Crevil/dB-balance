/// <reference path="../../../typings/tsd.d.ts" />
/*
 * Name: equipmentController
 * Description: retreive data from API, set title and present data according to URL
 */
module dBApp.equipment {
    'use strict';

    export interface IEquipmentController {
        data: any;
    }

    export class EquipmentController {
        data: any;

        constructor($location: angular.ILocationService, textService: services.ITextService) {
            var location: string = $location.path();

            textService.getPageTexts(location.substring(1, location.length))
                .then((data) => {
                    this.data = data.data;
                });
        }
    }

    angular
        .module('dBApp.equipment')
        .controller('equipmentController', ["$location", "textService", ($l: angular.ILocationService, t: services.ITextService) => new EquipmentController($l, t)]);
}
