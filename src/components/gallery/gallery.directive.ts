/// <reference path="../../../typings/tsd.d.ts" />
/* 
 * Directive: gallery
 * Description: Gallery directive with methods to add images, shuffle order and binding properties
 */
module dBApp.gallery {
    'use strict';

    export interface IGalleryDirectiveScope extends angular.IScope {
        currentIndex: number;
        images: any[];

        shuffleImages(): void;
        enableAutoShufleImages(enable: boolean): void;
    }

    class GalleryDirective implements angular.IDirective {
        scope = {
            'currentIndex': '=dbGalleryCurrentIndex',
            'images': '=dbGalleryModel'
        };
        restrict: string = "A";
        templateUrl: string = "components/gallery/gallery.html";

        private galleryFilesInformation: string = 'assets/gallery.json';
        private autoShufleImagesEvent: Function = null;

        link = (scope: IGalleryDirectiveScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes) => {
            scope.shuffleImages = () => {
                var m = scope.images.length,
                    t, i;

                // While there remain elements to shuffle
                while (m) {
                    // Pick a remaining element…
                    i = Math.floor(Math.random() * m--);

                    // And swap it with the current element.
                    t = scope.images[m];
                    scope.images[m] = scope.images[i];
                    scope.images[i] = t;
                }
            };

            scope.enableAutoShufleImages = (enable: boolean) => {
                if (enable) {
                    this.autoShufleImagesEvent = this.$rootScope.$on('$stateChangeStart', (event, next, current) => {
                        scope.shuffleImages();
                    });
                } else {
                    if (this.autoShufleImagesEvent !== null) {
                        this.autoShufleImagesEvent();
                    }
                }
            };

            // Get images from json file
            this.$http.get(this.galleryFilesInformation).then((data) => {
                scope.images = data.data;
                scope.shuffleImages();
            });

            // Auto shuffle on page change
            scope.enableAutoShufleImages(true);
        };

        constructor(private $rootScope: angular.IRootScopeService, private $http: angular.IHttpService) { }
    }

    angular
        .module('dBApp.gallery')
        .directive('dbGallery', ['$rootScope', '$http', ($r, $h) => new GalleryDirective($r, $h)]);
}
