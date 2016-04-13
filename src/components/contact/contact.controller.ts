/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../services/data.service.ts" />
/*
 * Name: ContactController
 * Description: retreive data from API, set title and present data according to URL
 */
namespace dBApp.contact {
    'use strict';

    export interface IContactController {
        data: any;
    }

    export class ContactController {
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
        .module('dBApp.contact', [])
        .controller('ContactController', ContactController)
        .config(['$stateProvider', ($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state('contact', {
                controller: ContactController,
                controllerAs: 'vm',
                templateUrl: 'components/contact/contact.html',
                url: '/contact'
            });
        }]);
}
