/// <reference path="../../../typings/main.d.ts" />
/// <reference path="facebook.interfaces.d.ts" />

/*
 * Directive: facebookfeed
 * Description: Get facebook feed and present the posts
 */
namespace dBapp.facebookfeed {
    'use strict';

    export interface IFacebookFeedDirectiveScope extends angular.IScope {
        facebookUrl: string;
        maxPosts: number;
    }

    export function facebookFeed(): angular.IDirective {
        return {
            controller: FacebookFeedController,
            controllerAs: 'vm',
            restrict: 'A',
            scope: {
                facebookUrl: '=dbFacebookUrl',
                maxPosts: '=dbMaxPosts'
            },
            templateUrl: 'components/facebookfeed/facebookfeed.html'
        };
    }

    class FacebookFeedController {
        static $inject: Array<string> = ['$http', '$facebook', '$timeout', '$q', '$scope'];
        static apiTimeout: number = 5000;

        facebookId: string;
        posts: Facebook.IPost[];
        loading: boolean;
        errorMessage: string;

        maxPosts: number;
        facebookUrl: string;

        constructor(
            private $http: angular.IHttpService,
            private $facebook: angular.ngFacebook.IFacebookService,
            private $timeout: angular.ITimeoutService,
            private $q: angular.IQService,
            isolatedScope: IFacebookFeedDirectiveScope) {

            this.facebookUrl = isolatedScope.facebookUrl;
            this.maxPosts = isolatedScope.maxPosts;
            this.facebookId = 'dB.balance';

            this.getPosts();
        }

        public like(postId: string): void {
            console.log('like');
            // this.$facebook.getLoginStatus().then((ret) => {
            //     if (ret.status != 'connected') {
            //         this.$facebook.login().then((ret) => {
            //             this.likePost(postId);
            //         });
            //     } else {
            //         this.likePost(postId);
            //     }
            // }, (error) => console.log(error));
        }

        public unlike(postId: string): void {
            console.log('unlike');
        }

        public share(url: string): void {
            this.$facebook.ui({
                href: url,
                method: 'share'
            }).then(
                (success: any) => {
                    this.getPosts();
                },
                (error: any) => {
                    console.log(error);
                });
        }

        private getPosts(): void {
            this.loading = true;

            let defer: angular.IDeferred<void> = this.$q.defer<void>();

            let timeoutPromise: angular.IPromise<void> = this.$timeout(
                () => {
                    defer.reject('timeout');
                },
                FacebookFeedController.apiTimeout);

            this.$facebook.api(
                `${this.facebookId}/posts?limit=${this.maxPosts}`,
                'get',
                { fields: 'id,message,picture,link,likes.summary(true),shares' }
            )
                .then(
                (data: any) => {
                    this.$timeout.cancel(timeoutPromise);
                    this.posts = data.data;

                    defer.resolve();
                },
                (error: any) => {
                    console.log('facebook error', error);

                    defer.reject();
                });

            defer.promise.catch(
                () => {
                    this.errorMessage = 'Det er ikke muligt at oprette forbindelse til Facebook i øjeblikket.';
                })
                .finally(() => {
                    this.loading = false;
                });
        }

        // private likePost(postId: string) {
        //     this.$facebook.api(postId + '/likes', 'post')
        //         .then(
        //         (success: any) => {
        //             this.getPosts()
        //         },
        //         (error: any) => console.log(error));
        // }
    }

    angular
        .module('dBApp.facebookfeed', [])
        .directive('dbFacebookFeed', dBapp.facebookfeed.facebookFeed);
}
