/// <reference path="../../../typings/tsd.d.ts" />
/*
 * Name: feedbackController
 * Description: Retreive data from API
 */
 module dBApp.feedback {
     'use strict';

     export interface IFeedbackController {
         gallery: services.IGalleryService;
         visibility: services.IVisibilityService;
         data: any;
     }

     export class FeedbackController {
         gallery: services.IGalleryService;
         visibility: services.IVisibilityService;
         data: any;

         constructor(galleryService: services.IGalleryService, visibilityService: services.IVisibilityService, textService: services.ITextService) {
             this.gallery = galleryService;
             this.visibility = visibilityService;

             textService.getRandomFeedback(5).then((data) => {
                 this.data = data.data;
             });
         }
     }

    angular
        .module('dBApp.feedback')
        .controller('feedbackController', ["galleryService", "visibilityService", "textService", (g: services.IGalleryService, v: services.IVisibilityService, t: services.ITextService) => new FeedbackController(g, v, t)]);
}
