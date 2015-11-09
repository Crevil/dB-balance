/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="facebook.interfaces.ts" />
/* 
 * Directive: facebookfeed
 * Description: Get facebook feed and present the posts
 */
module dBapp.facebookfeed {
    'use strict';

    export interface IFacebookFeedDirectiveScope extends angular.IScope {
        facebookUrl: string;
        maxPosts: number;
    }

    export function facebookFeed(): angular.IDirective {
        return {
            restrict: 'A',
            scope: {
                facebookUrl: "=dbFacebookUrl",
                maxPosts: "=dbMaxPosts"
            },
            controller: FacebookFeedController,
            controllerAs: "vm",
            templateUrl: 'components/facebookfeed/facebookfeed.html'
        }
    }

    class FacebookFeedController {
        // restrict: string = 'A';
        // scope = {
        //     facebookUrl: "=dbFacebookUrl",
        //     maxPosts: "=dbMaxPosts"
        // };
        // controller =  FacebookFeedController;
        // controllerAs = "vm";
        // templateUrl = "components/facebookfeed/facebookfeed.html";
                
        facebookId: string;
        posts: Facebook.IPost[];
        loading: boolean;
        errorMessage: string;
        
        maxPosts: number;
        facebookUrl: string;
        
        static $inject = ["$http", "$facebook", "$scope"];
        constructor(private $http: angular.IHttpService, private $facebook, isolatedScope: IFacebookFeedDirectiveScope) {
            this.facebookUrl = isolatedScope.facebookUrl;
            this.maxPosts = isolatedScope.maxPosts;
            this.facebookId = "dB.balance";    
            
            this.getPosts();
        }

        private getPosts() {
            this.loading = true;
            this.$facebook.api(this.facebookId + "/posts?limit=" + this.maxPosts, "get", {fields: "id,message,picture,link,likes.summary(true),shares"})
                .then((data) => {
                    this.posts = data.data;
                    this.loading = false;
                },(error) => {
                    console.log(error);
                    this.errorMessage = "Det er ikke muligt at oprette forbindelse til facebook.";
                    this.loading = false;                
                });
        }
        
        public like(postId: string) {
            console.log("like");
            // this.$facebook.getLoginStatus().then((ret) => {
            //     if (ret.status != "connected") {
            //         this.$facebook.login().then((ret) => {
            //             this.likePost(postId);
            //         });
            //     } else {
            //         this.likePost(postId);
            //     }
            // }, (error) => console.log(error));
        }
        
        public unlike(postId: string) {
            console.log("unlike");
        }
        
        public share(url: string) {
            this.$facebook.ui({
                method: "share",
                href: url
            }).then(
                (success) => {
                    this.getPosts();
                },
                (error) => {
                    console.log(error);
                });
        }

        private likePost(postId: string) {
            this.$facebook.api(postId + "/likes", "post")
                .then(
                    (success) => {
                        this.getPosts()
                    }, 
                    (error) => console.log(error));
        }
    }

    angular
        .module('dBApp.facebookfeed')
        .directive('dbFacebookFeed', dBapp.facebookfeed.facebookFeed);
}
