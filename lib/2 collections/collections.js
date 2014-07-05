// Define all collections and their associated metadata
// Permissions can be one (or many) of 'user', 'owner', 'admin' or empty array.
// 'user': Any logged in user
// 'owner': Owner of the current document, identified by the "author" field
// 'admin': Any user that has an admin role
// empty array: No normal users allowed
var collectionData = [{
    dbName: 'answers',
    cursorName: 'Answers',
    schema: Schema.Answer,
    permissions: {
        insert: ['user'],
        update: ['owner'],
        remove: ['owner']
    }
}, {
    dbName: 'questions',
    cursorName: 'Questions',
    schema: Schema.Question,
    permissions: {
        insert: ['user'],
        update: ['owner'],
        remove: []
    }
}, {
    dbName: 'cookbooks',
    cursorName: 'Cookbooks',
    schema: Schema.Cookbook,
    permissions: {
        insert: [],
        update: [],
        remove: []
    }
}, {
    dbName: 'lectures',
    cursorName: 'Lectures',
    schema: Schema.Lecture,
    permissions: {
        insert: [],
        update: [],
        remove: []
    }
}, {
    dbName: 'subjects',
    cursorName: 'Subjects',
    schema: Schema.Subject,
    permissions: {
        insert: [],
        update: [],
        remove: []
    }
}, {
    dbName: 'disciplines',
    cursorName: 'Disciplines',
    schema: Schema.Discipline,
    permissions: {
        insert: [],
        update: [],
        remove: []
    }
}, {
    dbName: 'jobs',
    cursorName: 'Jobs',
    schema: Schema.Job,
    permissions: {
        insert: [],
        update: [],
        remove: []
    }
}, {
    dbName: 'kb',
    cursorName: 'KB',
    schema: Schema.KnowledgeBase,
    permissions: {
        insert: [],
        update: [],
        remove: []
    }
}, {
    dbName: 'kbCategories',
    cursorName: 'KBCategories',
    schema: Schema.KnowledgeBaseCategory,
    permissions: {
        insert: [],
        update: [],
        remove: []
    }
}, {
    dbName: 'kbSecClass',
    cursorName: 'KBSecClass',
    schema: Schema.KnowledgeBaseSecClass,
    permissions: {
        insert: [],
        update: [],
        remove: []
    }
}];

collectionData.forEach(function(item) {
    // Generate a collection. This uses the infamous "eval()" function.
    eval(item.cursorName + " = new Meteor.Collection(item.dbName)");

    // Assign a variable to the collection so we don't need to use any
    // more evals. Dear god I have sinned.
    var itemName = eval(item.cursorName);

    // Assign a schema to the collection
    itemName.attachSchema(item.schema);

    // FIXME: Tentatively allow every mother and son to upsert/remove
    itemName.allow({
        insert: function() {
            return true;
        },
        update: function() {
            return true;
        },
        remove: function() {
            return true;
        }
    });
});