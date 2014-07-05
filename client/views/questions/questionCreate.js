Template.questionCreate.events({
    'keyup #questionTitle, change #questionTitle': function(e) {
        if (e.target.value.trim() === "") {
            $('#title-preview').html("Question Title Preview");
        } else {
            $('#title-preview').html(e.target.value.trim());
        }
    },
    'keyup #questionBody, change #questionBody': function(e) {
        if (e.target.value.trim() === "") {
            $('#details-preview').html("Question Details Preview");
        } else {
            Meteor.call('parseMarkdown', e.target.value.trim(), function(error, result) {
                if (!error) {
                    $('#details-preview').html(result);

                    // Process LaTeX markup on the page
                    MathJax.Hub.Typeset();
                }
            });
        }
    },
    'submit #questionCreateForm': function(e) {
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

Template.questionCreate.helpers({
    scopeSubjects: function() {
        return Subjects.findFaster({
            discipline: {
                $in: [this._id]
            }
        });
    }
});