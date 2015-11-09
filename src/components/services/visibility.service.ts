/// <reference path="../../../typings/tsd.d.ts" />
/* 
 * Service: visibility
 * Description: Handle page visibility
 */
 module dBApp.services {
    'use strict';

    export interface IVisibilityService {
        gallery: boolean;
        player: boolean;
        toggleGallery(show?: boolean): void;
        togglePlayer(show?: boolean): void;
        enableAutoHideGallery(enable: boolean): void;
        enableAutoHidePlayer(enable: boolean): void;
    }

    export class VisibilityService implements IVisibilityService {
        gallery: boolean;
        player: boolean;
        
        public static $inject = ["$rootScope", "$document"];
        
        constructor(private $rootScope: angular.IRootScopeService, private $document: angular.IDocumentService) {
            this.enableAutoHideGallery(true);
            this.enableAutoHidePlayer(true);
        }

        toggleGallery(show?: boolean): void {
            if(show == undefined) {
                this.gallery = !this.gallery;
            } else  {
                this.gallery = show;
            }

            if(this.gallery) {
                this.player = false;
            }
        }

        togglePlayer(show?: boolean): void {
            if (show == undefined) {
                this.player = !this.player;
            } else {
                this.player = show;
            }

            if (this.player) {
                this.gallery = false;
            }
        }

        autoHideGalleryEvent: Function;

        enableAutoHideGallery(enable: boolean): void {
            if(enable) {
                this.autoHideGalleryEvent = this.$rootScope.$on("$locationChangeStart", (event, next, current) => this.toggleGallery(false) );
            } else {
                if(this.autoHideGalleryEvent !== null) {
                    this.autoHideGalleryEvent();
                }
            }
        }

        autoHidePlayerEvent: Function;

        enableAutoHidePlayer(enable: boolean): void {
            if (enable) {
                this.autoHidePlayerEvent = this.$rootScope.$on("$locationChangeStart", (event, next, current) => this.togglePlayer(false));
            } else {
                if (this.autoHidePlayerEvent !== null) {
                    this.autoHidePlayerEvent();
                }
            }
        }        
    }

    angular
        .module('dBApp.services')
        .service('visibilityService', VisibilityService);
 }
