QuestionCreationController = CreationController.extend({
    yieldTemplates: {
        'questionCreatePreview': {
            to: 'preview'
        }
    }
});

QuestionEditController = CreationController.extend({
    yieldTemplates: {
        'questionEditPreview': {
            to: 'preview'
        }
    },
    waitOn: function() {
        return [
            singleSubs.subscribe('question', {
                _id: this.params.questionId
            }, {}, {}, 0)
        ];
    },
    data: {
        questions: function() {
            return Questions.findOneFaster()
        }
    }
});

QuestionListController = ListController.extend({
    yieldTemplates: {
        'questionListNav': {
            to: 'nav'
        }
    },
    waitOn: function() {
        if (Meteor.isClient) {
            Session.setDefault('questionLimit', 20);

            return listSubs.subscribe('question', {}, {}, {
                createdAt: -1
            }, Session.get('questionLimit'));
        }
    },
    data: function() {
        return {
            questions: Questions.findFaster({}, {
                sort: {
                    createdAt: -1
                }
            })
        }
    }
});