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
        static $inject: Array<string> = ['$location', 'textService'];

        data: any;

        constructor($location: angular.ILocationService, textService: services.ITextService) {
            let location: string = $location.path();

            textService.getPageTexts(location.substring(1, location.length))
                .then((data: any) => {
                    this.data = data.data;
                });
        }
    }

    angular
        .module('dBApp.equipment')
        .controller('equipmentController', EquipmentController);
}
