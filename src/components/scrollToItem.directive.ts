/// <reference path="../../typings/tsd.d.ts" />
/* 
 * Directive: ScrollToItem
 * Description: Directive to scroll to an element identified by a jQuery selector
*/
module dBApp.directives {

	interface IScrollToItemDirectiveScope extends angular.IScope {
		scrollTo: string;
		scrollEnable: boolean;
	}

	interface IScrollToItemDirectiveAttributes extends angular.IAttributes {
		dbScrollTo: string;
		dbScollEnable: boolean;
	}

	class ScrollToItemDirective implements angular.IDirective {
		scope = {
			scrollTo: "@dbScrollTo",
			scrollEnable: "=dbScrollEnable"
		};
		restrict: string = "A";

		link = (scope: IScrollToItemDirectiveScope, element: angular.IAugmentedJQuery, attrs: IScrollToItemDirectiveAttributes) => {
			element.on("click", () => {
				if(scope.scrollEnable == false) {
					return;
				}
				
				$("html, body").animate(
					{ scrollTop: $(scope.scrollTo).offset().top },
					"200");
			});
		};

		static factory(): angular.IDirectiveFactory {
			const directive = () => new ScrollToItemDirective();
			directive.$inject = [];
			return directive;
		}
	}

	angular
		.module("dBApp.directives")
		.directive("dbScrollToItem", ScrollToItemDirective.factory());
}
