Meteor.publish('lectureAll', function(limit) {
    check(limit, Match.Integer);

    publishCount(this, 'lectureAllCount', Lectures.findFaster({}, {
        fields: {
            _id: 1
        }
    }), {
        noReady: true
    });

    return Lectures.findFaster({}, {
        limit: limit
    })
});

Meteor.publish('lectureById', function(lectureId) {
    check(lectureId, String);

    return Lectures.findOneFaster({
        _id: lectureId
    })
});

Meteor.publish('lectureBySubjectId', function(subjectId, limit) {
    check(subjectId, String);
    check(limit, Match.Integer);

    publishCount(this, 'lectureBySubjectIdCount', Lectures.findFaster({
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

    return Lectures.findFaster({
        subject: {
            $in: subjectId
        }
    }, {
        limit: limit
    })
});

Meteor.publish('lectureByUserId', function(userId, limit) {
    check(userId, String);
    check(limit, Match.Integer);

    publishCount(this, 'lectureByUserId', Lectures.findFaster({
        author: userId
    }, {
        fields: {
            _id: 1
        }
    }), {
        noReady: true
    });

    return Lectures.findFaster({
        author: userId
    }, {
        limit: limit
    })
})