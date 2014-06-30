String.prototype.toTitleCase = function() {
    var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

    return this.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title) {
        if (index > 0 && index + match.length !== title.length &&
            match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
            (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
            title.charAt(index - 1).search(/[^\s-]/) < 0) {
            return match.toLowerCase();
        }

        if (match.substr(1).search(/[A-Z]|\../) > -1) {
            return match;
        }

        return match.charAt(0).toUpperCase() + match.substr(1);
    });
};

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
        return Subjects.findOneFaster(String(subjectId), {
            fields: {
                name: 1
            }
        }).name;
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