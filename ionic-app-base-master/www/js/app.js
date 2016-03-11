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
    //The main app controller
    .controller('ToDoCtrl', function($scope, $ionicModal){

        //Checks if the tasks exist in the window.localStorage
       if(!angular.isUndefined(window.localStorage['tasks']))
         $scope.tasks = JSON.parse(window.localStorage['tasks']);
       else
           //else gets the empty array of tasks
          $scope.tasks = [
          ];

        //Loads the view for adding the new task
        $ionicModal.fromTemplateUrl('views/add.html', function(modal){
            $scope.addModel = modal;
        },{
            scope : $scope,
            animation: 'slide-in-up'
        });

        //Loads the view for editing the task
        $ionicModal.fromTemplateUrl('views/edit.html', function(modal){
            $scope.editModel = modal;
        },{
            scope : $scope,
            animation: 'slide-in-up'
        });

        //Shows the adding window
        $scope.addNewTask = function(){

            $scope.addModel.show();
        }

        //The task item for adding new task
        $scope.ANTask = {}

        //Adds the task into the task array and saves the changes
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

        //Hides the adding window
        $scope.closeAddTask = function(){
            $scope.addModel.hide();
        }

        //Hides the editing window
        $scope.closeEditTask = function(){
            $scope.editModel.hide();
        }

        //Deletes the selected items from task array and saves the changes
        $scope.deleteItem = function(id){
            $scope.tasks.splice(id, 1);
            saveItems();
        }

        //Stores the current task id
        $scope.currentTaskId = -1;

        //Edits the selected task
        $scope.editTask = function(id){
            var task = $scope.tasks[id];
            $scope.currentTaskId = id;

            $scope.activeTask = {
                title: task.title,
                desc: task.desc,
                done: task.done
            }

            //Shows the editing window
            $scope.editModel.show();
        }

        //Saves the changes in the selected task
        $scope.saveTask = function(){
            var id = $scope.currentTaskId;

            $scope.tasks[id].title = $scope.activeTask.title;
            $scope.tasks[id].desc = $scope.activeTask.desc;
            $scope.tasks[id].done = $scope.activeTask.done;

            saveItems();

            $scope.editModel.hide();
        }

        //Saves the task array in the window.localStorage
        function saveItems(){
            window.localStorage['tasks'] = angular.toJson($scope.tasks);
        }
    });
