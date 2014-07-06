Template.questionListNavComponent.helpers({
    activeClass: function() {
        return Session.equals('activeQuestion', this._id) ? "active" : "";
    }
});