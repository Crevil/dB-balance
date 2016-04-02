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
        .module('dBApp.contact')
        .controller('ContactController', ContactController);
}
