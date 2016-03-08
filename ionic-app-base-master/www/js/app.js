angular.module('ToDo', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
})
    .controller('ToDoCtrl', function($scope, $ionicModal){
      $scope.tasks = [
        {title: 'one_one_one', desc:'1',done:true},
        {title: 'two_two_two', desc:'2',done:true},
        {title: 'three_three_three', desc:'3',done:false},
        {title: 'four_four_four', desc:'4',done:false},
      ];
        $ionicModal.fromTemplateUrl('views/task.html', function(modal){
            $scope.taskModel = modal;
        },{
            scope : $scope,
            animation: 'slide-in-up'
        });
        $scope.openTask = function(){
            $scope.taskModel.show();
        }
        $scope.closeTask = function(){
            $scope.taskModel.hide();
        }
    });
