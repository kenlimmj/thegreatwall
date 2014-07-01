Template.questionCreate.events({
    'keyup #questionTitle': function(e) {
        if (e.target.value.trim() === "") {
            $('#title-preview').html("Question Title Preview");
        } else {
            $('#title-preview').html(e.target.value.trim());
        }
    },
    'keyup #questionBody': function(e) {
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
            author: Meteor.userId()
        }

        Meteor.call('insertQuestionById', data, function(error, result) {
            if (!error) {
                Alerts.add('Question created. You rock!', 'success');
            } else {
                Alerts.add('Looks like something went wrong. Do us a favor and check if you got everything right?', 'warning');
            }
        })
    }
})