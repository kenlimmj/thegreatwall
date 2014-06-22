Meteor.publish('cookbookAll', function(limit) {
    check(limit, Match.Integer);

    publishCount(this, 'cookbookAllCount', Cookbooks.findFaster({}, {
        fields: {
            _id: 1
        }
    }), {
        noReady: true
    });

    return Cookbooks.findFaster({}, {
        limit: limit
    })
});

Meteor.publish('cookbookById', function(cookbookId) {
    check(cookbookId, String);

    return Cookbooks.findOneFaster({
        _id: cookbookId
    })
});

Meteor.publish('cookbookBySubjectId', function(subjectId, limit) {
    check(subjectId, String);
    check(limit, Match.Integer);

    publishCount(this, 'cookbookBySubjectIdCount', Cookbooks.findFaster({
        subject: {
            $in: subjectId
        }
    }, {
        fields: {
            _id: 1
        }
    }), {
        noReady: true
    });

    return Cookbooks.findFaster({
        subject: {
            $in: subjectId
        }
    }, {
        limit: limit
    })
});

Meteor.publish('cookbookByUserId', function(userId, limit) {
    check(userId, String);
    check(limit, Match.Integer);

    publishCount(this, 'cookbookByUserId', Cookbooks.findFaster({
        author: userId
    }, {
        fields: {
            _id: 1
        }
    }), {
        noReady: true
    });

    return Cookbooks.findFaster({
        author: userId
    }, {
        limit: limit
    })
})