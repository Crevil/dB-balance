/// <reference path="../../../typings/main.d.ts" />
/// <reference path="../services/data.service.ts" />
/// <reference path="../services/gallery.service.ts" />
/// <reference path="../services/visibility.service.ts" />
/*
 * Name: homeController
 * Description: Retreive data from API, set title and present data according to URL
 */
namespace dBApp.home {
    'use strict';

    export interface IHomeController {
        gallery: services.IGalleryService;
        visibility: services.IVisibilityService;
        data: { texts: any[] };

        facebookUrl: string;
        facebookPosts: number;
    }

    export class HomeController implements IHomeController {
        static $inject: Array<string> = ['$location', 'dataService', 'galleryService', 'visibilityService'];

        data: { texts: any[] };
        gallery: services.IGalleryService;
        visibility: services.IVisibilityService;

        facebookUrl: string;
        facebookPosts: number;


        constructor(
            $location: angular.ILocationService,
            dataService: services.IDataService,
            galleryService: services.IGalleryService,
            visibilityService: services.IVisibilityService) {
            this.gallery = galleryService;
            this.visibility = visibilityService;

            let location: string = $location.path();

            dataService
                .getPageTexts(location.substring(1, location.length))
                .then((data: any) => {
                    this.data = data.data;
                });

            this.facebookUrl = 'https://www.facebook.com/dB.balance';
            this.facebookPosts = 2;
        }
    }

    angular
        .module('dBApp.home', [
            'dBApp.facebookfeed'
        ])
        .controller('homeController', HomeController)
        .config(['$stateProvider', ($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state('home', {
                controller: HomeController,
                controllerAs: 'vm',
                templateUrl: 'components/home/home.html',
                url: '/'
            });
        }]);
}
