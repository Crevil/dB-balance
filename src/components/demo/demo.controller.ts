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
        .module('dBApp.demo')
        .controller('demoController', DemoController);
}
