Template.questionList.helpers({
    activeQuestion: function() {
        return Questions.findOneFaster({
            _id: Session.get('activeQuestion')
        });
    },
    activeAnswers: function() {
        Meteor.subscribe('answer', {
            parentQuestionId: Session.get('activeQuestion')
        }, {}, {}, 0);

        return {
            answers: Answers.findFaster({}, {
                sort: {
                    votes: -1,
                    updatedAt: -1,
                    createdAt: -1
                }
            })
        }
    }
});