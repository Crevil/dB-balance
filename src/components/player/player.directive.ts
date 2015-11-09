/// <reference path="../../../typings/tsd.d.ts" />
module dBApp.directives.player {
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

    interface IjPlayerOptions {
        cssSelector: {
            jPlayer: string;
            cssSelectorAncestor: string;
        };
        options: {
            playlistOptions: {
                enableRemoveControls: boolean;
                displayTime: string;
            };
            supplied: string;
        };
        playlist: any[];
    }

    function playerDirective($resource: angular.resource.IResourceService): IPlayerDirective {
        return {
            restrict: 'AE',
            link: link,
            transclude: true,
            templateUrl: 'components/player/player.html',
            scope: {
                'status': '=dbPlayerStatus'
            }
        };

        function link(scope: IPlayerDirectiveScope, element: angular.IAugmentedJQuery, attrs: IPlayerDirectiveAttributes) {
            
            if($.jPlayer == undefined) {
                scope.errorMessage = "Der er sket en fejl og afspilleren kan ikke indlæses. Prøv igen senere.";
                return;
            }

            var options : IjPlayerOptions = {
                "cssSelector": {
                    "jPlayer": "#jquery_jplayer",
                    "cssSelectorAncestor": "#jp_container"
                },
                "options": {
                    "playlistOptions": {
                        "enableRemoveControls": false,
                        "displayTime": 'fast'
                    },
                    "supplied": "mp3"
                },
                "playlist": []
            };

            var player = new jPlayerPlaylist(options.cssSelector, options.playlist, options.options);

            $resource("assets/music/playlist.json").get((d, r) => {
                angular.forEach(d["tracks"], (value, index) => {
                    player.add({
                        title: value["title"],
                        artist: value["artist"],
                        mp3: value["mp3"]
                    });
                });
            });

            angular.element(player.cssSelector.jPlayer).bind($.jPlayer.event.playing, function(event) {
                scope.status = "play";
                scope.$apply();
            });
            angular.element(player.cssSelector.jPlayer).bind($.jPlayer.event.pause, function(event) {
                scope.status = "stop";
                scope.$apply();
            });

            scope.status = "stop";

            scope.$watch('status', (newValue, oldValue) => {
                if (newValue !== oldValue) {
                    var p = angular.element(player.cssSelector.jPlayer);
                    switch (newValue) {
                        case "stop":
                            p.jPlayer("stop");
                            break;
                        case "play":
                            p.jPlayer("play");
                            break;
                    }
                }
            });

        }
    };

    angular
        .module('dBApp.directives')
        .directive('dbPlayer', ["$resource", ($r: angular.resource.IResourceService) => playerDirective($r)]);

}