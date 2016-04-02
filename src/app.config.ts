/// <reference path="../typings/tsd.d.ts" />

module dBApp {
    'use strict';

    interface IAppRootScope extends angular.IRootScopeService {
        facebookAppid: string;
    }

    angular
        .module('dBApp')
        .config(
        [
            '$urlRouterProvider',
            '$facebookProvider',
            ($urlRouterProvider: angular.ui.IUrlRouterProvider, $facebookProvider: angular.ngFacebook.IFacebookProvider) => {
                $urlRouterProvider.otherwise('/');
                $facebookProvider.setAppId('421032427990165');
                $facebookProvider.setPermissions('publish_actions');
                $facebookProvider.setVersion('v2.4');
            }])
        .run(['$rootScope', ($rootScope: IAppRootScope) => {
            $rootScope.facebookAppid = '[421032427990165]';

            let id: string = 'facebook-jssdk',
                ref: HTMLScriptElement = document.getElementsByTagName('script')[0];

            if (document.getElementById(id)) {
                return;
            }

            let js: HTMLScriptElement = document.createElement('script');
            js.id = id;
            js.async = true;
            js.src = '//connect.facebook.net/en_US/sdk.js';

            ref.parentNode.insertBefore(js, ref);
        }]);
}
