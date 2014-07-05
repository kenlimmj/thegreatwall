Template.questionListNav.events({
    'click .question-selector': function() {
        Session.set('questionListActive', this._id);
    }
});

Template.questionListNav.activeClass = function() {
    return Session.equals('questionListActive', this._id) ? "active" : "";
}

Template.questionListNav.rendered = function() {
    // Session.setDefault('questionListActive', )
}

Template.questionListDisplay.activeQuestion = function() {
    return Questions.findOneFaster({
        _id: Session.get('questionListActive')
    });
}

Template.questionListDisplay.activeAnswer = function() {
    Meteor.subscribe('answer', {
        parentQuestionId: Session.get('questionListActive')
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

Template.questionListDisplay.answerClass = function() {
    if (this.approved) {
        return "panel-success"
    } else if (this.flagStatus) {
        return "panel-warning"
    } else {
        return "panel-default"
    }
}

Template.questionListDisplay.answerType = function() {

}