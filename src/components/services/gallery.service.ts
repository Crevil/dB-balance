/// <reference path="../../../typings/tsd.d.ts" />
/* 
 * Service: gallery
 * Description: Holds data related to dbGallery directive for inter-controller comunication
 */
module dBApp.services {
    'use strict';

    export interface IGalleryService {
        currentIndex: number;
        images: any[];
        setCurrentIndex(index: number): void;
    }

    export class GalleryService implements IGalleryService {
        currentIndex: number;
        images: any[];

        constructor() {
            this.currentIndex = 0;
            this.images = [];
        }

        setCurrentIndex(index: number): void {
            this.currentIndex = index;
        }
    }

    angular
        .module('dBApp.services')
        .factory('galleryService', () => new GalleryService());

}
