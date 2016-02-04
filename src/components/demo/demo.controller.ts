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
        
        static $inject = ["$location", "textService"];

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
        .controller('demoController', DemoController);
}
