(function(){

  //Starts the main app module
  var app = angular.module('myNotes', ['ionic']);

    //Realizes the routing system
    app.config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('list', {
            url: "/list",
            templateUrl: "templates/list.html"
          })
          .state('edit', {
            url: "/edit/:noteId",
            templateUrl: "templates/edit.html",
            controller: "EditCtrl"
          })
          .state('add', {
            url: "/add",
            templateUrl: "templates/edit.html",
            controller: "AddCtrl"
          });
  
      $urlRouterProvider.otherwise("/list");
    });

    //Controller for main page
    //Executes the rendering, list reordering and deleting
    app.controller("ListCtrl", function ($scope, noteStore) {
      $scope.notes = noteStore.list();

      //Stores the reordering mode
      $scope.reorder = false;

      $scope.toggleReordering = function () {
        $scope.reorder = !$scope.reorder;
      }

      //Implements the list reordering
      $scope.move = function (note, from, to) {
        noteStore.move(note, from, to);
      }
  
      $scope.delete = function (nodeId) {
        noteStore.remove(nodeId);
      }
    });

    //Updates the existing note
    app.controller("EditCtrl", function ($scope, $state, noteStore) {
      $scope.title = "Edit note";
  
      $scope.note = angular.copy(noteStore.get($state.params.noteId));
  
      $scope.save = function () {
        noteStore.update($scope.note);
        $state.go("list");
      }
    });

    //Adds the new note into note list
    app.controller("AddCtrl", function ($scope, $state, noteStore) {
      $scope.title = "Add new note";

      $scope.note = {
        id: new Date().getTime().toString(),
        title:  '',
        description:  ''
      }
  
      $scope.save = function () {
        noteStore.create($scope.note);
        $state.go("list");
      }

    });

    //Performs the cordova settings
    app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

}());