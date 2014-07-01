Subjects = new Meteor.Collection('subjects');
Subjects.attachSchema(Schema.Subject);

Subjects.allow({
    insert: function(userId, _) {
        return true
    },
    update: function(userId, _, _, _) {
        return true
    },
    remove: function(userId, _) {
        return true
    }
});

Disciplines = new Meteor.Collection('disciplines');
Disciplines.attachSchema(Schema.Discipline);

Disciplines.allow({
    insert: function(userId, _) {
        return true
    },
    update: function(userId, _, _, _) {
        return true
    },
    remove: function(userId, _) {
        return true
    }
});