var collections = [{
    name: 'answer',
    cursor: Answers
}, {
    name: 'lecture',
    cursor: Lectures
}, {
    name: 'question',
    cursor: Questions
}, {
    name: 'subject',
    cursor: Subjects
}, {
    name: 'discipline',
    cursor: Disciplines
}, {
    name: 'job',
    cursor: Jobs
}, {
    name: 'kb',
    cursor: KB
}, {
    name: 'cookbook',
    cursor: Cookbooks
}, {
    name: 'user',
    cursor: Meteor.users
}];

var countCollectionKey = "Count"

collections.forEach(function(item) {
    Meteor.publish(item.name + countCollectionKey, function(selectorObj) {
        check(selectorObj, Object);

        publishCount(this, item.name + countCollectionKey, item.cursor.findFaster(selectorObj, {
            fields: {
                _id: 1
            },
            sort: {
                _id: 1
            }
        }));
    });

    Meteor.publish(item.name, function(selectorObj, returnFields, sortFields, returnLimit) {
        check(selectorObj, Object);
        check(returnFields, Object);
        check(sortFields, Object);
        check(returnLimit, Match.Integer);

        if (sortFields === {}) {
            sortFields = {
                _id: 1
            };
        }

        return item.cursor.findFaster(selectorObj, {
            fields: returnFields,
            sort: sortFields,
            limit: returnLimit
        });
    });
});