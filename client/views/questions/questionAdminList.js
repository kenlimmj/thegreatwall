Template.questionAdminList.helpers({
    getSubjectName: function(subjectId) {
        Meteor.subscribe('subject', {
            _id: subjectId.toString()
        }, {
            name: 1
        }, {
            name: 1
        }, 0);

        return Subjects.findOneFaster().name;
    },
    getQuestionStatus: function(openStatus) {
        return openStatus ? "Open" : "Closed"
    },
    getAnswerStatus: function(answerStatus) {
        return answerStatus ? "Answered" : "Un-answered"
    },
    getFlagStatus: function(flagStatus) {
        return flagStatus ? "True" : "False"
    },
    questionAnswers: function() {
        Meteor.subscribe('answer', {
            parentQuestionId: this._id
        }, {
            displayExcerpt: 0,
            ogExcerpt: 0
        }, {
            createdAt: 1,
            updatedAt: 1,
            votes: 1
        }, 0);

        return {
            answers: Answers.findFaster({}, {
                fields: {
                    displayExcerpt: 0,
                    ogExcerpt: 0
                },
                sort: {
                    createdAt: 1,
                    updatedAt: 1,
                    votes: 1
                }
            })
        }
    }
});

Template.questionAdminList.events({
    'click #view-more': function(e) {
        e.preventDefault();

        if (Session.get('questionLimit') >= Counts.get('questionCount')) {
            e.target.parentElement.remove();
        } else {
            Session.set('questionLimit', Session.get('questionLimit') + 20);

            if (Session.get('questionLimit') >= Counts.get('questionCount')) {
                e.target.parentElement.remove();
            }
        }
    }
});