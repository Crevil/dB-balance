/// <reference path="../../../typings/tsd.d.ts" />
/*
 * Name: page module router
 * Description: Sets ui.router configuration
 */
module dBApp.equipment {
    'use strict';

    angular
        .module('dBApp.equipment')
        .config(['$stateProvider', ($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state('equipment', {
                controller: EquipmentController,
                controllerAs: 'vm',
                templateUrl: 'components/equipment/equipment.html',
                url: '/equipment'
            });
        }]);
}
