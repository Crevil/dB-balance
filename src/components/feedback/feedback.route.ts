/// <reference path="../../../typings/tsd.d.ts" />
/*
 * Name: feedback module router
 * Description: Sets ui.router configuration
 */
module dBApp.feedback {
	'use strict';

	angular
		.module("dBApp.feedback")
		.config(["$stateProvider", ($stateProvider: angular.ui.IStateProvider) => {
			$stateProvider.state("feedback", {
				url: "/feedback",
				templateUrl: "components/feedback/feedback.html",
				controller: FeedbackController,
				controllerAs: "vm"
			});
		}]);
}
