/// <reference path="../../../typings/tsd.d.ts" />
/*
* Name: shellController
* Description: Static data and page setup
*/
module dBApp.core {
    'use strict';

    export interface ICoreController {
        player: IPlayer;
        footer: IFooter;
        galleryService: services.IGalleryService;
        visibilityService: services.IVisibilityService;
        facebookPageUrl: string;

        handleKeyPress($event): void;
        showSpinner: boolean;
    }

    interface IPlayer {
        status: string;
        stop(): void;
    }

    interface IFooter {
        date: Date;
        name: string;
        address: string;
        cvr: number;
        bank: {
            reg: number;
            num: number;
        };
        contact: {
            mail: string;
            title: string;
        }
    }

    export class CoreController implements ICoreController {
        player: IPlayer;
        footer: IFooter;
        facebookPageUrl: string;
        showSpinner: boolean;

        static $inject = ['$location', '$scope', 'visibilityService', 'titleService', 'galleryService'];
        
        constructor(
            $location: angular.ILocationService, 
            $scope: angular.IScope,
            public visibilityService: services.IVisibilityService, 
            public titleService: services.ITitleService, 
            public galleryService: services.IGalleryService) {

            this.player = {
                "status": "stop",
                "stop": () => this.player.status = "stop"
            };

            this.footer = {
                "date": new Date(),
                "name": "dB-balance",
                "address": "Taphedevej 13, 8800 Viborg",
                "cvr": 34436045,
                "bank": {
                    "reg": 9255,
                    "num": 3489174838
                },
                "contact": {
                    "mail": "kontakt@db-balance.dk",
                    "title": "Kontakt lydstudiet dB-balance"
                }
            };

            this.facebookPageUrl = "https://www.facebook.com/dB.balance";
            this.showSpinner = true;

            $scope.$on("$stateChangeStart", (event, toState, toParams, fromState, fromParams) => {
                this.showSpinner = true;
            });

            $scope.$on("$stateChangeSuccess", (event, toState, toParams, fromState, fromParams) => {
                this.showSpinner = false;
            });
        }

        handleKeyPress = ($event) => {
            if($event.keyCode == 27) { // esc key
                this.visibilityService.toggleGallery(false);
                this.visibilityService.togglePlayer(false);
            } else if(this.visibilityService.gallery) {
                if ($event.keyCode == 37) { // left arrow
                    this.galleryService.currentIndex--;
                } else if ($event.keyCode == 39) { // right arrow
                    this.galleryService.currentIndex++;
                }
            }
        }
    }

    angular.module("dBApp.core")
        .controller('coreController', CoreController);
}
