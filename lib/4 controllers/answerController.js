AnswerListController = GlobalController.extend({
    waitOn: function() {
        if (Meteor.isClient) {
            Session.setDefault('answerAllLimit', 10);

            return listSubs.subscribe('answerAll', Session.get('answerAllLimit'));
        }
    },
    data: function() {
        return {
            answers: Answers.findFaster({})
        }
    }
});

AnswerByUserIdController = GlobalController.extend({
    waitOn: function() {
        if (Meteor.isClient) {
            Session.setDefault('answerByUserIdLimit', 10);

            return listSubs.subscribe('answerByUserId', Session.get('answerByUserIdLimit'));
        }
    },
    data: function() {
        return {
            answers: Answers.findFaster({
                author: userId
            }, {
                sort: {
                    votes: -1
                }
            })
        }
    }
});

AnswerByIdController = GlobalController.extend({
    waitOn: function() {
        return singleSubs.subscribe('answerById', this.params.answerId)
    },
    data: function() {
        return Answers.findOneFaster(this.params.answerId);
    }
});