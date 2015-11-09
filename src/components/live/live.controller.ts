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
        .module('dBApp.live')
        .controller('liveController', ["$location", "textService", ($l: angular.ILocationService, t: services.ITextService) => new LiveController($l, t)]);
}
