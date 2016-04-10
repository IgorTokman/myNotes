(function(){
    var app = angular.module('myNotes');
    
    app.factory('noteStore', function () {
        var notes = angular.fromJson(window.localStorage['notes'] || '[]');

        function persist() {
            window.localStorage['notes'] = angular.toJson(notes);
        }
        return {

            list: function () {
                return notes;
            },

            get: function (id) {
                return notes[id - 1];
            },

            update: function (note) {
                notes[note.id - 1 ] = note;
                persist();
            },

            create: function (note) {
                notes.push(note);
                persist();
            },

            remove: function (id) {
                notes.splice(id-1, 1);
                persist();
            }
        }
    })
})();