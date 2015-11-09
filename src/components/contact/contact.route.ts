/// <reference path="../../../typings/tsd.d.ts" />
/*
 * Name: contact module router
 * Description: Sets ui.router configuration
 */
module dBApp.contact {
	'use strict';

	angular
		.module("dBApp.contact")
		.config(["$stateProvider", ($stateProvider: angular.ui.IStateProvider) => {
		$stateProvider.state("contact", {
			url: "/contact",
			templateUrl: "components/contact/contact.html",
			controller: ContactController,
				controllerAs: "vm"
			});
		}]);
}
