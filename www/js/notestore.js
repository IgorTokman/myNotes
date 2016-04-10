(function(){
    var app = angular.module('myNotes');
    
    app.factory('noteStore', function () {
        var notes = [];
        return {

            list: function () {
                return notes;
            },

            get: function (id) {
                return notes[id - 1];
            },

            update: function (note) {
                notes[note.id - 1 ] = note;
            },

            create: function (note) {
                notes.push(note);
            }
        }
    })
})();