/// <reference path="../../../typings/main.d.ts" />
/// <reference path="../services/data.service.ts" />
/// <reference path="../services/gallery.service.ts" />
/// <reference path="../services/visibility.service.ts" />
/*
 * Name: feedbackController
 * Description: Retreive data from API
 */
namespace dBApp.feedback {
    'use strict';

    export interface IFeedbackController {
        gallery: services.IGalleryService;
        visibility: services.IVisibilityService;
        data: any;
    }

    export class FeedbackController {
        static $inject: Array<string> = ['galleryService', 'visibilityService', 'dataService'];
        gallery: services.IGalleryService;
        visibility: services.IVisibilityService;
        data: any;


        constructor(
            galleryService: services.IGalleryService,
            visibilityService: services.IVisibilityService,
            dataService: services.IDataService) {
            this.gallery = galleryService;
            this.visibility = visibilityService;

            dataService.getRandomFeedback(5).then((data: any) => {
                this.data = data.data;
            });
        }
    }

    angular
        .module('dBApp.feedback', [])
        .controller('feedbackController', FeedbackController)
        .config(['$stateProvider', ($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state('feedback', {
                controller: FeedbackController,
                controllerAs: 'vm',
                templateUrl: 'components/feedback/feedback.html',
                url: '/feedback'
            });
        }]);
}
