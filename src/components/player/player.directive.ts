/// <reference path="../../../typings/main.d.ts" />
/// <reference path="jPlayer.d.ts" />
namespace dBApp.directives.player {
    'use strict';

    export interface IPlayerDirective extends angular.IDirective {
    }

    export interface IPlayerDirectiveScope extends angular.IScope {
        status: string;
        errorMessage: string;
    }

    export interface IPlayerDirectiveAttributes extends angular.IAttributes {
        dbPlayerStatus: string;
    }

    function playerDirective($resource: angular.resource.IResourceService): IPlayerDirective {
        return {
            link: link,
            restrict: 'AE',
            scope: {
                'status': '=dbPlayerStatus'
            },
            templateUrl: 'components/player/player.html',
            transclude: true
        };

        function link(scope: IPlayerDirectiveScope, element: angular.IAugmentedJQuery, attrs: IPlayerDirectiveAttributes): void {

            if (!$.jPlayer) {
                scope.errorMessage = 'Der er sket en fejl og afspilleren kan ikke indlæses. Prøv igen senere.';
                return;
            }

            let options: { cssSelector: jPlayer.IjPlayerCssSelector, options: jPlayer.IjPlayerOptions, playlist: any[]} = {
                'cssSelector': {
                    'jPlayer': '#jquery_jplayer',
                    'cssSelectorAncestor': '#jp_container'
                },
                'options': {
                    'playlistOptions': {
                        'enableRemoveControls': false,
                        'displayTime': 'fast'
                    },
                    'supplied': 'mp3'
                },
                'playlist': []
            };

            let player: any = new jPlayerPlaylist(options.cssSelector, options.playlist, options.options);

            $resource('assets/music/playlist.json').get((d: any, r: any) => {
                angular.forEach(d.tracks, (value: any, index: number) => {
                    player.add({
                        artist: value.artist,
                        mp3: value.mp3,
                        title: value.title
                    });
                });
            });

            angular.element(player.cssSelector.jPlayer).bind($.jPlayer.event.playing, () => {
                scope.status = 'play';
                scope.$apply();
            });
            angular.element(player.cssSelector.jPlayer).bind($.jPlayer.event.pause, () => {
                scope.status = 'stop';
                scope.$apply();
            });

            scope.status = 'stop';

            scope.$watch('status', (newValue: string, oldValue: string) => {
                if (newValue !== oldValue) {
                    let p: IPlayerAugmentedJQuery = angular.element(player.cssSelector.jPlayer) as IPlayerAugmentedJQuery;
                    switch (newValue) {
                        case 'play':
                            p.jPlayer('play');
                            break;
                        default:
                            p.jPlayer('stop');
                            break;
                    }
                }
            });

        }
    };

    interface IPlayerAugmentedJQuery extends angular.IAugmentedJQuery {
        jPlayer(action: string): void;
    }

    angular
        .module('dBApp.directives')
        .directive('dbPlayer', ['$resource', ($r: angular.resource.IResourceService) => playerDirective($r)]);
}
