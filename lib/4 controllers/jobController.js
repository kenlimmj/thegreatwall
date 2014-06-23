JobListController = GlobalController.extend({
    waitOn: function() {
        if (Meteor.isClient) {
            Session.setDefault('jobAllLimit', 10);

            return listSubs.subscribe('jobAll', Session.get('jobAllLimit'));
        }
    },
    data: function() {
        return {
            Job: Jobs.findFaster({})
        }
    }
});

JobByIdController = GlobalController.extend({
    waitOn: function() {
        return singleSubs.subscribe('jobById', this.params.jobId)
    },
    data: function() {
        return Jobs.findOneFaster(this.params.jobId);
    }
});