/// <reference path="../../../typings/tsd.d.ts" />
/* 
 * Service: title
 * Description: Retreive page titles from API
 */
 module dBApp.services {
     'use strict';

     export interface ITitleService {
         title: string;
         getTitle(): void;
         formatTitle(title: string): string;
     }

     export class TitleService implements ITitleService {
         title: string;
         staticTitle: string;
         staticDelimiter: string;
         apiUrl: string;

         constructor(private $resource: angular.resource.IResourceService, private $rootScope: angular.IRootScopeService, private $location: angular.ILocationService) {
             this.staticTitle = "dB-balance";
             this.staticDelimiter = "-";
             this.apiUrl = "http://www.db-balance.dk/v4.0/api/pages";

             this.setup();

         }

         setup(): void {
             this.title = this.staticTitle;

             this.$rootScope.$on("$routeChangeSuccess", (e, n, c) => this.getTitle());
         }

         formatTitle(title: string): string {
             return (title == "" || title == undefined ? this.staticTitle : title + this.staticDelimiter + this.staticTitle);
         }

         getTitle(): void {
             var titleResource: angular.resource.IResource<any>;
             titleResource = this.$resource(this.apiUrl + ":id").get({ 
                 "id": this.extractLocation() 
             }, (data) => this.title = this.formatTitle(data.title));
         }

         extractLocation(): string {
             var location: string = this.$location.path();
             return location.substring(1, location.length);
         }
     }
     angular
         .module('dBApp.services')
         .factory('titleService', ["$resource", "$rootScope", "$location", ($re: angular.resource.IResourceService, $ro: angular.IRootScopeService, $l: angular.ILocationService) => new TitleService($re, $ro, $l)]);
 }
 