QuestionListController = GlobalController.extend({
    waitOn: function() {
        if (Meteor.isClient) {
            Session.setDefault('questionAllLimit', 5);

            return listSubs.subscribe('questionAll', Session.get('questionAllLimit'));
        }
    },
    data: function() {
        return {
            questions: Questions.findFaster({})
        }
    }
});

QuestionByUserIdController = GlobalController.extend({
    waitOn: function() {
        if (Meteor.isClient) {
            Session.setDefault('questionByUserIdLimit', 5);

            return listSubs.subscribe('questionByUserId', Session.get('questionByUserIdLimit'));
        }
    },
    data: function() {
        return {
            questions: Questions.findFaster({
                author: userId
            })
        }
    }
})

QuestionBySubjectController = GlobalController.extend({
    waitOn: function() {
        if (Meteor.isClient) {
            Session.setDefault('questionBySubjectIdLimit', 5);

            return listSubs.subscribe('questionBySubjectId', Session.get('questionBySubjectIdLimit'));
        }
    },
    data: function() {
        return {
            questions: Questions.findFaster({
                subject: {
                    $in: this.params.subjectId
                }
            })
        }
    }
});

QuestionByIdController = GlobalController.extend({
    waitOn: function() {
        return singleSubs.subscribe('questionById', this.params.questionId)
    },
    data: function() {
        return Questions.findOneFaster(this.params.questionId);
    }
});