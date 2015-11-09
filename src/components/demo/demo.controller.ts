/// <reference path="../../../typings/tsd.d.ts" />
/*
 * Name: demoController
 * Description: retreive data from API, set title and present data according to URL
 */
module dBApp.demo {
    'use strict';

    export interface IDemoController {
        data: any;
    }

    export class DemoController {
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
        .module('dBApp.demo')
        .controller('demoController', ["$location", "textService", ($l: angular.ILocationService, t: services.ITextService) => new DemoController($l, t)]);
}
