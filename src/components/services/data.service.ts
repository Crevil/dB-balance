/// <reference path="../../../typings/main.d.ts" />
/*
 * Service: data
 * Description: Retreive page texts from API
 */
namespace dBApp.services {
    'use strict';

    export interface IDataService {
        getPageTexts(id: string): angular.IHttpPromise<any>;

        getAllFeedback(): angular.IHttpPromise<any>;
        getRandomFeedback(limit: number): angular.IHttpPromise<any>;
    }

    export class DataService implements IDataService {
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
        .factory('dataService', ['$http', ($h: angular.IHttpService) => new DataService($h)]);
}
