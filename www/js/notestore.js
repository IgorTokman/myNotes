(function(){
    
    var app = angular.module('myNotes');

    //Performs the basic operations with note list
    app.factory('noteStore', function () {
        var notes = angular.fromJson(window.localStorage['notes'] || '[]');

        //Saves notes in the window.localStorage
        function persist() {
            window.localStorage['notes'] = angular.toJson(notes);
        }
        return {

            list: function () {
                return notes;
            },

            get: function (id) {
                for(var i=0; i< notes.length; i++)
                    if(notes[i].id == id)
                        return notes[i];

            },

            update: function (note) {
                for(var i=0; i< notes.length; i++)
                    if(notes[i].id == note.id) {
                        notes[i] = note;
                        persist();
                        return ;
                    }
            },

            create: function (note) {
                notes.push(note);
                persist();
            },

            //Realizes the list reordering
            move: function (note, from, to) {
                notes.splice(from, 1);
                notes.splice(to, 0, note);
                persist();
            },

            remove: function (id) {
                for(var i=0; i< notes.length; i++)
                    if(notes[i].id == id) {
                        notes.splice(i, 1);
                        persist();
                        return;
                    }
            }
        }
    })
})();