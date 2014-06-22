JobListController = GlobalController.extend({
    waitOn: function() {
        Session.setDefault('jobAllLimit', 10);

        return listSubs.subscribe('jobAll', Session.get('jobAllLimit'));
    },
    data: function() {
        return {
            Job: Jobs.findFaster({})
        }
    }
});

JobByIdController = GlobalController.extend({
    waitOn: function() {
        return singleSubs.subscribe('JobById', this.params.JobId)
    },
    data: function() {
        return Jobs.findOneFaster(this.params.JobId);
    }
});