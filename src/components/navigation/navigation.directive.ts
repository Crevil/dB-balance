/// <reference path="../../../typings/tsd.d.ts" />
/* 
 * Directive: Navigation
 * Description: Navigation directive
*/
module dBApp.directives {

	interface INavigationDirectiveScope extends angular.IScope {
		playerStatus: string;
		playerStop(): void;
		visibilityService: dBApp.services.IVisibilityService;
		
		isCollapsed: boolean;
	}

	interface INavigationDirectiveAttributes extends angular.IAttributes {
		dbNavigationPlayer: string;
		dbNavigationPlayerStop(): void;
		dbNavigationIsCollapsed: boolean;
	}

	class NavigationDirective implements angular.IDirective {
		public scope = {
			"playerStatus": "=dbNavigationPlayer",
			"playerStop": "&dbNavigationPlayerStop",
			"isCollapsed": "=dbNavigationIsCollapsed"
		};
		
		public restrict: string = "EA";
		public templateUrl: string = "components/navigation/navigation.html";
		
		constructor(public visibilityService: dBApp.services.IVisibilityService) {
		}
		
		link = (scope: INavigationDirectiveScope, element: angular.IAugmentedJQuery, attrs: INavigationDirectiveAttributes) => {
			scope.visibilityService = this.visibilityService;
			scope.isCollapsed = true;
		};

		public static factory(): angular.IDirectiveFactory {
			const directive = (visibilityService: dBApp.services.IVisibilityService) => new NavigationDirective(visibilityService);
			directive.$inject = ["visibilityService"];
			return directive;
		}
	}
	
	angular
		.module("dBApp.directives")
		.directive("dbNavigation", NavigationDirective.factory());
}
