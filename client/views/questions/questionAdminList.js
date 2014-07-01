Template.questionAdminList.helpers({
    displayDate: function(d, fillerString) {
        if (d) {
            if (d.length) {
                return moment(d[0]).format("MMMM Do YYYY");
            }
            return moment(d).format("MMMM Do YYYY");
        } else {
            return fillerString;
        }
    },
    getUsername: function(userId) {
        return Meteor.users.findOneFaster(userId).username;
    },
    getSubjectName: function(subjectId) {
        singleSubs.subscribe('subject', {
            _id: String(subjectId)
        }, {
            name: 1
        }, {
            name: 1
        }, 0);

        return Subjects.findOneFaster(String(subjectId)).name;
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
    makeTitle: function(s) {
        return s.toTitleCase();
    },
    thisValue: function() {
        return this;
    },
    questionAnswers: function() {
        singleSubs.subscribe('answer', {
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
            answers: Answers.findFaster({
                parentQuestionId: this._id
            }, {
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