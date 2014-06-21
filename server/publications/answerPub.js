Meteor.publish('answerAll', function(limit) {
    check(limit, Match.Integer);

    publishCount(this, 'answerAllCount', Answers.findFaster({}, {
        sort: {
            votes: -1
        },
        fields: {
            _id: 1
        }
    }), {
        noReady: true
    });

    return Answers.findFaster({}, {
        limit: limit
    });
});

Meteor.publish('answerById', function(answerId) {
    check(answerId, String);

    return Answers.findOneFaster(answerId);
});

Meteor.publish('answerByQuestionId', function(questionId, limit) {
    check(questionId, String);
    check(limit, Match.Integer);

    publishCount(this, 'answerByQuestionIdCount', Answers.findFaster({
        parentQuestionId: questionId
    }, {
        sort: {
            votes: -1
        },
        fields: {
            _id: 1
        }
    }), {
        noReady: true
    });

    return Answers.findFaster({
        parentQuestionId: questionId
    }, {
        sort: {
            votes: -1
        },
        limit: limit
    });
});

Meteor.publish('answerByUserId', function(userId, limit) {
    check(userId, String);
    check(limit, Match.Integer);

    publishCount(this, 'answerByUserIdCount', Answers.findFaster({
        author: userId
    }, {
        sort: {
            votes: -1
        },
        fields: {
            _id: 1
        }
    }), {
        noReady: true
    });

    return Answers.findFaster({
        author: userId
    }, {
        sort: {
            votes: -1
        },
        limit: limit
    });
})