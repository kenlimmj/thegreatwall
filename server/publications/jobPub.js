Meteor.publish('jobAll', function(limit) {
    check(limit, Match.Integer);

    publishCount(this, 'jobAllCount', Jobs.findFaster({}, {
        fields: {
            _id: 1
        }
    }), {
        noReady: true
    });

    return Jobs.findFaster({}, {
        limit: limit
    });
});

Meteor.publish('jobById', function(jobId) {
    check(jobId, String);

    return Jobs.findOneFaster(jobId);
});