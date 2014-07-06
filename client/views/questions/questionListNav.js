Template.questionListNav.events({
    'click .question-selector': function() {
        Session.set('activeQuestion', this._id);
    }
});