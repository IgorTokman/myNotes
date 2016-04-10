(function(){
  var app = angular.module('myNotes', ['ionic'])

  var notes = [
    {
      id:   1,
      title:  "First Note",
      description:  "First Note"
    },
    {
      id:   2,
      title:  "Second Note",
      description:  "Second Note"
    }
  ];

  function getNote(id) {
    return notes[id - 1];
  }
  
  function updateNote(note) {
    notes[note.id - 1 ] = note;
  }

  function createNote(note) {
    notes.push(note);
  }

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

  app.controller("ListCtrl", function ($scope) {
    $scope.notes = notes;
  });

  app.controller("EditCtrl", function ($scope, $state) {
    $scope.note = angular.copy(getNote($state.params.noteId));

    $scope.save = function () {
      updateNote($scope.note);
      $state.go("list");
    }
  });
  app.controller("AddCtrl", function ($scope, $state) {
    $scope.note = {
      id: notes.length + 1,
      title:  '',
      description:  ''
    }

    $scope.save = function () {
      createNote($scope.note);
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