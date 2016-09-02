'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = "loading...";

            //$scope.dishes= menuFactory.getDishes();
           /* $scope.dishes = [];
            
            menuFactory.getDish()
                .then(function(response){
                
                console.log(response);
                if(response.statusCode == 200){
                    $scope.dishes = response.data;
                    $scope.showMenu = true;
                }
            },
                function(errResponse){
                
                console.log(errResponse);
                $scope.message = "Error.."+errResponse.status+" "+errResponse.statusText;
                
            });*/
            $scope.dishes = menuFactory.getDishes().query(
            function(response){
                $scope.dishes = response;
                $scope.showMenu = true;
                
            },
                function(response){
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            
            );

                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', function($scope) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

           /* $scope.dish = {};
            
            menuFactory.getDish(parseInt($stateParams.id,10))
            .then(function(response){
                $scope.dish = response.data;
                $scope.showDish=true;
            }
            , function(errResponse){
                console.log(errResponse);
                $scope.message = "Error: "+errResponse.status + " " + errResponse.statusText;
            });*/
            
           // $scope.dish = menuFactory.getDishes.get({id: parseInt($stateParams.id,10)});
            
            $scope.showDish = false;
            $scope.message="Loading ...";
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
                .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );
            
            
        }])

        .controller('DishCommentController', ['$scope','menuFactory', function($scope,menuFactory) {
            
            $scope.Childcomments = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.Childcomments.date = new Date().toISOString();
                console.log($scope.Childcomments);
                
                $scope.dish.comments.push($scope.Childcomments);
                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                $scope.commentForm.$setPristine();
                
                $scope.Childcomments = {rating:5, comment:"", author:"", date:""};
            }
        }])

        // implement the IndexController and About Controller here
        .controller('AboutController', ['$scope','corporateFactory', function($scope, corporateFactory){
    
            $scope.leaderList = corporateFactory.getLeaders();
            console.log($scope.leaderList);
    
        }])

        .controller('IndexController', ['$scope','menuFactory','corporateFactory', function($scope,menuFactory, corporateFactory){
            
            $scope.showDish = false;

           /* $scope.featuredDish = [];
            
            menuFactory.getDish(0)
            .then(function(response){
                $scope.featuredDish = response.data;
                $scope.showDish = true;
            }, 
            
            function(response) {
                $scope.message = "Error: "+response.status + " " + response.statusText;
            });*/
            
            //$scope.featuredDish = menuFactory.getDishes().get({id:0});
             $scope.message="Loading ...";
            $scope.featuredDish = menuFactory.getDishes().get({id:0})
                        .$promise.then(
                            function(response){
                                $scope.featuredDish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                          }
              );
            
            $scope.promotion = menuFactory.getPromotion(0);
            
            $scope.chief = corporateFactory.getLeader(3);
            
        }])
;
