declare namespace jPlayer {
    export interface IjPlayerCssSelector {
        jPlayer: string;
        cssSelectorAncestor: string;
    }

    export interface IjPlayerOptions {
        playlistOptions: {
            enableRemoveControls: boolean;
            displayTime: string;
        };
        supplied: string;
    }

    /* tslint:disable */
    export class jPlayerPlaylist {
        constructor(cssSelector: IjPlayerCssSelector, playlist: any[], options: IjPlayerOptions);
    }
    /* tslint:enable */
}
