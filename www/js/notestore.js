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
                return notes[id];
            },

            update: function (note) {
                notes[note.id] = note;
                persist();
            },

            create: function (note) {
                notes.push(note);
                persist();
            },

            move: function (note, from, to) {
                notes.splice(from, 1);
                notes.splice(to, 0, note);
                persist();
            },

            remove: function (id) {
                notes.splice(id, 1);
                persist();
            }
        }
    })
})();