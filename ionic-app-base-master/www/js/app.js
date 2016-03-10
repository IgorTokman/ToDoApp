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
       if(!angular.isUndefined(window.localStorage['tasks']))
         $scope.tasks = JSON.parse(window.localStorage['tasks']);
       else
          $scope.tasks = [
          ];
        $ionicModal.fromTemplateUrl('views/add.html', function(modal){
            $scope.addModel = modal;
        },{
            scope : $scope,
            animation: 'slide-in-up'
        });
        $ionicModal.fromTemplateUrl('views/edit.html', function(modal){
            $scope.editModel = modal;
        },{
            scope : $scope,
            animation: 'slide-in-up'
        });

        $scope.addNewTask = function(){

            $scope.addModel.show();
        }

        $scope.ANTask = {}

        $scope.addTask = function(task){

            $scope.tasks.push({
                title:  task.title,
                desc:   task.desc,
                done:   task.done,
            });

            saveItems();
            
            $scope.ANTask = {};
            $scope.addModel.hide();
        }

        $scope.closeAddTask = function(){
            $scope.addModel.hide();
        }

        $scope.closeEditTask = function(){
            $scope.editModel.hide();
        }

        $scope.deleteItem = function(id){
            $scope.tasks.splice(id, 1);
            saveItems();
        }

        $scope.currentTaskId = -1;

        $scope.editTask = function(id){
            var task = $scope.tasks[id];
            $scope.currentTaskId = id;

            $scope.activeTask = {
                title: task.title,
                desc: task.desc,
                done: task.done
            }

            $scope.editModel.show();
        }

        $scope.saveTask = function(){
            var id = $scope.currentTaskId;

            $scope.tasks[id].title = $scope.activeTask.title;
            $scope.tasks[id].desc = $scope.activeTask.desc;
            $scope.tasks[id].done = $scope.activeTask.done;

            saveItems();

            $scope.editModel.hide();
        }

        function saveItems(){
            window.localStorage['tasks'] = angular.toJson($scope.tasks);
        }
    });
