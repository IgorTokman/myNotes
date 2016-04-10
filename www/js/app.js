(function(){
  var app = angular.module('myNotes', ['ionic']);

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

  app.controller("ListCtrl", function ($scope, noteStore) {
    $scope.notes = noteStore.list();

    $scope.reorder = false;

    $scope.toggleReordering = function () {
      $scope.reorder = !$scope.reorder;
    }

    $scope.move = function (note, from, to) {
      noteStore.move(note, from, to);
    }

    $scope.delete = function (nodeId) {
      noteStore.remove(nodeId);
    }
  });

  app.controller("EditCtrl", function ($scope, $state, noteStore) {
    $scope.title = "Edit note";

    $scope.note = angular.copy(noteStore.get($state.params.noteId));

    $scope.save = function () {
      noteStore.update($scope.note);
      $state.go("list");
    }
  });
  
  app.controller("AddCtrl", function ($scope, $state, noteStore) {
    $scope.title = "Add new note";

    $scope.note = {
      id: noteStore.list().length,
      title:  '',
      description:  ''
    }

    $scope.save = function () {
      noteStore.create($scope.note);
      $state.go("list");
    }
  });

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