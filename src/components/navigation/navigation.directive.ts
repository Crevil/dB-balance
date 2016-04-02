/// <reference path="../../../typings/tsd.d.ts" />
/*
 * Directive: Navigation
 * Description: Navigation directive
*/
module dBApp.directives {
    'use strict';

    interface INavigationDirectiveScope extends angular.IScope {
        playerStatus: string;
        visibilityService: dBApp.services.IVisibilityService;
        isCollapsed: boolean;
        playerStop(): void;
    }

    interface INavigationDirectiveAttributes extends angular.IAttributes {
        dbNavigationPlayer: string;
        dbNavigationIsCollapsed: boolean;
        dbNavigationPlayerStop(): void;
    }

    class NavigationDirective implements angular.IDirective {
        public scope: any = {
            'playerStatus': '=dbNavigationPlayer',
            'playerStop': '&dbNavigationPlayerStop',
            'isCollapsed': '=dbNavigationIsCollapsed'
        };

        public restrict: string = 'EA';
        public templateUrl: string = 'components/navigation/navigation.html';

        public static factory(): angular.IDirectiveFactory {
            const directive: any =
                (visibilityService: dBApp.services.IVisibilityService) => new NavigationDirective(visibilityService);
            directive.$inject = ['visibilityService'];
            return directive;
        }

        constructor(public visibilityService: dBApp.services.IVisibilityService) { }

        link: any = (
            scope: INavigationDirectiveScope,
            element: angular.IAugmentedJQuery,
            attrs: INavigationDirectiveAttributes) => {
            scope.visibilityService = this.visibilityService;
            scope.isCollapsed = true;
        };
    }

    angular
        .module('dBApp.directives')
        .directive('dbNavigation', NavigationDirective.factory());
}
