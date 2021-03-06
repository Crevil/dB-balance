/// <reference path="../../../typings/main.d.ts" />
/*
 * Name: lineBreak
 * Description: Replace \n with <br /> tags
 */
namespace dBApp.filters {
    'use strict';

    angular
        .module('dBApp.filters')
        .filter('lineBreakFilter', () => {
            return (input: string) => {

                if (!input || !input.length) {
                    return;
                }

                return input.replace(/\n/g, '<br />');
            };
        });
}
