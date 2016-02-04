/// <reference path="../../../typings/tsd.d.ts" />
/*
 * Name: ContactController
 * Description: retreive data from API, set title and present data according to URL
 */
module dBApp.contact {
    'use strict';

    export interface IContactController {
        data: any;
    }

    export class ContactController {
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
        .module('dBApp.contact')
        .controller('ContactController', ContactController);
}
