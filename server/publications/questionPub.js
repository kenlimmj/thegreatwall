Meteor.publish('questionAll', function(limit) {
    check(limit, Match.Integer);

    publishCount(this, 'questionAllCount', Questions.findFaster({}, {
        fields: {
            _id: 1
        }
    }), {
        noReady: true
    });

    return Questions.findFaster({}, {
        limit: limit
    })
});

Meteor.publish('questionById', function(questionId) {
    check(questionId, String);

    return Questions.findOneFaster({
        _id: questionId
    })
});

Meteor.publish('questionBySubjectId', function(subjectId, limit) {
    check(subjectId, String);
    check(limit, Match.Integer);

    publishCount(this, 'questionBySubjectIdCount', Questions.findFaster({
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

    return Questions.findFaster({
        subject: {
            $in: subjectId
        }
    }, {
        limit: limit
    })
});

Meteor.publish('questionByUserId', function(userId, limit) {
    check(userId, String);
    check(limit, Match.Integer);

    publishCount(this, 'questionByUserId', Questions.findFaster({
        author: userId
    }, {
        fields: {
            _id: 1
        }
    }), {
        noReady: true
    });

    return Questions.findFaster({
        author: userId
    }, {
        limit: limit
    })
})