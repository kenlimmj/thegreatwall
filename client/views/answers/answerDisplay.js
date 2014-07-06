Template.answerDisplay.helpers({
    answerClass: function() {
        if (this.flagStatus) {
            return "panel-warning";
        } else if (this.approved) {
            return "panel-success";
        } else {
            return "panel-default";
        }
    },
    answerType: function() {
        if (this.flagStatus) {
            return "Flagged for Review";
        } else if (this.approved) {
            return "Approved";
        }
    }
});