'use strict';
angular.module('confusionApp')

        .controller('MenuController',['$scope','menuFactory',function($scope, menuFactory) {
                        $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
          // $scope.dishes = menuFactory.getDishes();


          $scope.dishes= [];
            menuFactory.getDishes()
            .then(function(response) {
                    $scope.dishes = response.data;
            },
            function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
            });

            $scope.toggleDetails = function(){
                $scope.showDetails = !$scope.showDetails;
            };
            
            
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
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
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

            //$scope.dish= menuFactory.getDish(parseInt($stateParams.id,10)); 
            $scope.dish = {};
            $scope.showDish = false;
            $scope.message="Loading ...";

            menuFactory.getDish(parseInt($stateParams.id,10))
            .then(
                function(response){
                    $scope.dish = response.data;
                    $scope.showDish=true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });
            
        }])

        .controller('DishCommentController', ['$scope', function($scope) {
            
            //Step 1: Create a JavaScript object to hold the comment from the form
            $scope.Childcomments = { author:"", rating:"5", comment: "" , date:""};

            console.log($scope.Childcomments);
            
            $scope.submitComment = function () {
                

               
                //Step 2: This is how you record the date
               $scope.Childcomments.date = new Date().toISOString();
                

                 console.log($scope.Childcomments);

                // Step 3: Push your comment into the dish's comment array
                $scope.dish.comments.push($scope.Childcomments);
                
                //Step 4: reset your form to pristine
                $scope.commentForm.$setPristine();
                
                //Step 5: reset your JavaScript object that holds your comment
                $scope.Childcomments = { author:"", rating:"5", comment: "" , date:""};
            };
        }])

        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function ($scope, menuFactory, corporateFactory) {

          //$scope.featured = menuFactory.getDish(0);     
          $scope.featured = {};
          $scope.showDish = false;
          $scope.message="Loading ...";
          
          menuFactory.getDish(0)
            .then(function(response){
                $scope.featured = response.data;
                $scope.showDish = true;

        },function(response){
            console.log("Error Response"+response.status);
            $scope.message = "Error: "+response.status + " " + response.statusText;
        });

          $scope.promotion = menuFactory.getPromotion(0);
          $scope.specialist = corporateFactory.getLeader(3);   
        }])

        .controller('AboutController', [ '$scope', 'corporateFactory', function ($scope, corporateFactory) {
            $scope.leaders = corporateFactory.getLeaders();   
        }]);  