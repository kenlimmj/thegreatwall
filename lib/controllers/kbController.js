KbListController = GlobalController.extend({
    waitOn: function() {
        Session.setDefault('kbAllLimit', 10);

        return listSubs.subscribe('kbAll', Session.get('kbAllLimit'));
    },
    data: function() {
        return {
            kb: KB.findFaster({})
        }
    }
});

KbByIdController = GlobalController.extend({
    waitOn: function() {
        return singleSubs.subscribe('kbById', this.params.kbId)
    },
    data: function() {
        return KB.findOneFaster(this.params.kbId);
    }
})