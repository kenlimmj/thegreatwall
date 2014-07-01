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