/// <reference path="../../../typings/tsd.d.ts" />
/*
 * Name: liveController
 * Description: retreive data from API, set title and present data according to URL
 */
module dBApp.live {
    'use strict';

    export interface ILiveController {
        data: any;
    }

    export class LiveController {
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
        .module('dBApp.live')
        .controller('liveController', LiveController);
}
