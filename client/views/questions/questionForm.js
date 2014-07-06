Template.questionForm.events({
    'keyup #questionTitle, change #questionTitle': function(e) {
        var displayTarget = '#questionTitleDisplay';

        if (e.target.value.trim() === "") {
            $(displayTarget).html("Question Title");
        } else {
            $(displayTarget).html(e.target.value.trim());
        }
    },
    'keyup #questionBody, change #questionBody': function(e) {
        var displayTarget = '#questionBodyDisplay';

        if (e.target.value.trim() === "") {
            $(displayTarget).html("Question Details");
        } else {
            Meteor.call('parseMarkdown', e.target.value.trim(), function(error, result) {
                if (!error) {
                    $(displayTarget).html(result);

                    // Process LaTeX markup on the page
                    MathJax ? MathJax.Hub.Typeset() : null;
                } else {
                    Alerts.add(error.message, 'warning');
                }
            });
        }
    },
    'submit #questionForm': function(e) {
        e.preventDefault();

        var data = {
            title: $('#questionTitle').val().trim(),
            mdContent: $('#questionBody').val().trim(),
            author: Meteor.userId(),
            subject: $('#questionSubject').val(),
            openStatus: $('#questionStatus').val() === "true"
        }

        Questions.insert(data, function(error, result) {
            if (error) {
                Alerts.add(error.message, 'warning');
            } else {
                Alerts.add('Question created. You rock!', 'success');
            }
        });
    }
});

Template.questionForm.helpers({
    disciplines: function() {
        singleSubs.subscribe('subject', {}, {
            schools: 0
        }, {}, 0),

        singleSubs.subscribe('discipline', {}, {}, {}, 0)

        return Disciplines.findFaster().map(function(item) {
            if (Subjects.findOneFaster({
                discipline: {
                    $in: [item._id]
                }
            })) {
                return {
                    name: item.name,
                    childSubjects: Subjects.findFaster({
                        discipline: {
                            $in: [item._id]
                        }
                    })
                };
            }
        }).filter(function(n) {
            return n !== undefined;
        });
    }
})