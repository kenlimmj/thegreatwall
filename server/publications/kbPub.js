Meteor.publish('kbAll', function(limit) {
    check(limit, Match.Integer);

    publishCount(this, 'kbAllCount', KB.findFaster({}, {
        fields: {
            _id: 1
        }
    }), {
        noReady: true
    });

    return KB.findFaster({}, {
        limit: limit
    });
});

Meteor.publish('kbById', function(kbId) {
    check(kbId, String);

    return KB.findOneFaster(kbId);
});