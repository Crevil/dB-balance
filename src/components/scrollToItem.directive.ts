/// <reference path="../../typings/main.d.ts" />
/*
 * Directive: ScrollToItem
 * Description: Directive to scroll to an element identified by a jQuery selector
 */
namespace dBApp.directives {
    'use strict';

    interface IScrollToItemDirectiveScope extends angular.IScope {
        scrollTo: string;
        scrollEnable: boolean;
    }

    interface IScrollToItemDirectiveAttributes extends angular.IAttributes {
        dbScrollTo: string;
        dbScollEnable: boolean;
    }

    class ScrollToItemDirective implements angular.IDirective {
        scope: any = {
            scrollEnable: '=dbScrollEnable',
            scrollTo: '@dbScrollTo'
        };
        restrict: string = 'A';

        static factory(): angular.IDirectiveFactory {
            const directive: any = () => new ScrollToItemDirective();
            directive.$inject = [];
            return directive;
        }

        link: any = (scope: IScrollToItemDirectiveScope, element: angular.IAugmentedJQuery, attrs: IScrollToItemDirectiveAttributes) => {
            element.on('click', () => {
                if (scope.scrollEnable === false) {
                    return;
                }

                $('html, body').animate(
                    { scrollTop: $(scope.scrollTo).offset().top },
                    '200');
            });
        };
    }

    angular
        .module('dBApp.directives')
        .directive('dbScrollToItem', ScrollToItemDirective.factory());
}
