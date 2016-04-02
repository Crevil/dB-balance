/// <reference path="../../../typings/tsd.d.ts" />
/*
 * Name: homeController
 * Description: Retreive data from API, set title and present data according to URL
 */
module dBApp.home {
    'use strict';

    export interface IHomeController {
        gallery: services.IGalleryService;
        visibility: services.IVisibilityService;
        data: { texts: any[] };

        facebookUrl: string;
        facebookPosts: number;
    }

    export class HomeController implements IHomeController {
        static $inject: Array<string> = ['$location', 'textService', 'galleryService', 'visibilityService'];

        data: { texts: any[] };
        gallery: services.IGalleryService;
        visibility: services.IVisibilityService;

        facebookUrl: string;
        facebookPosts: number;


        constructor(
            $location: angular.ILocationService,
            textService: services.ITextService,
            galleryService: services.IGalleryService,
            visibilityService: services.IVisibilityService) {
            this.gallery = galleryService;
            this.visibility = visibilityService;

            let location: string = $location.path();

            textService
                .getPageTexts(location.substring(1, location.length))
                .then((data: any) => {
                    this.data = data.data;
                });

            this.facebookUrl = 'https://www.facebook.com/dB.balance';
            this.facebookPosts = 2;
        }
    }

    angular
        .module('dBApp.home')
        .controller('homeController', HomeController);
}
