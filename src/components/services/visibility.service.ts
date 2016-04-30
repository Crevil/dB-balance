/// <reference path="../../../typings/main.d.ts" />
/*
 * Service: visibility
 * Description: Handle page visibility
 */
namespace dBApp.services {
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
        public static $inject: Array<string> = ['$rootScope', '$document'];

        gallery: boolean;
        player: boolean;
        autoHideGalleryEvent: Function;
        autoHidePlayerEvent: Function;


        constructor(private $rootScope: angular.IRootScopeService, private $document: angular.IDocumentService) {
            this.enableAutoHideGallery(true);
            this.enableAutoHidePlayer(true);
        }

        toggleGallery: any = (show?: boolean): void => {
            if (show === undefined) {
                this.gallery = !this.gallery;
            } else {
                this.gallery = show;
            }

            if (this.gallery) {
                this.player = false;
            }
        };

        togglePlayer: any = (show?: boolean): void => {
            if (show === undefined) {
                this.player = !this.player;
            } else {
                this.player = show;
            }

            if (this.player) {
                this.gallery = false;
            }
        };

        enableAutoHideGallery: any = (enable: boolean): void => {
            if (enable) {
                this.autoHideGalleryEvent = this.$rootScope.$on('$locationChangeStart', () => this.toggleGallery(false));
            } else {
                if (this.autoHideGalleryEvent) {
                    this.autoHideGalleryEvent();
                }
            }
        };

        enableAutoHidePlayer: any = (enable: boolean): void => {
            if (enable) {
                this.autoHidePlayerEvent = this.$rootScope.$on('$locationChangeStart', () => this.togglePlayer(false));
            } else {
                if (this.autoHidePlayerEvent) {
                    this.autoHidePlayerEvent();
                }
            }
        };
    }

    angular
        .module('dBApp.services')
        .service('visibilityService', VisibilityService);
}
