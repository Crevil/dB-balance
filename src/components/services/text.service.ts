/// <reference path="../../../typings/tsd.d.ts" />
/*
 * Service: text
 * Description: Retreive page texts from API
 */
module dBApp.services {
    'use strict';

    export interface ITextService {
        getPageTexts(id: string): angular.IHttpPromise<any>;

        getAllFeedback(): angular.IHttpPromise<any>;
        getRandomFeedback(limit: number): angular.IHttpPromise<any>;
    }

    export class TextService implements ITextService {
        // apiUrl: string = 'http://www.db-balance.dk/v4.0/api/';
        apiUrl: string;

        constructor(private $http: angular.IHttpService) {
            this.apiUrl = 'assets/api/';
        }

        getPageTexts(id: string): angular.IHttpPromise<any> {
            if (id === '') {
                id = 'home';
            }

            return this.$http.get(this.apiUrl + 'texts/' + id + '.json');
        }

        getAllFeedback(): angular.IHttpPromise<any> {
            return this.$http.get(this.apiUrl + 'feedback.json');
        }

        getRandomFeedback(limit: number): angular.IHttpPromise<{}> {
            let limitString: string = limit ? '/' + limit : '';

            return this.$http.get(this.apiUrl + 'feedback/random' + limitString + '.json');
        }
    }

    angular
        .module('dBApp.services')
        .factory('textService', ['$http', ($h: angular.IHttpService) => new TextService($h)]);
}
