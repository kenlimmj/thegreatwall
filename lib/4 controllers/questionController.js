QuestionCreationController = GlobalController.extend({
    layoutTemplate: 'creationLayout',
    yieldTemplates: {
        'questionPreview': {
            to: 'preview'
        }
    },
    waitOn: function() {
        return [
            listSubs.subscribe('subject', {}, {
                schools: 0
            }, {}, 0),
            listSubs.subscribe('discipline', {}, {}, {}, 0)
        ];
    },
    data: {
        disciplines: function() {
            return Disciplines.findFaster().map(function(item) {
                if (Subjects.findOneFaster({
                    discipline: {
                        $in: [item._id]
                    }
                })) {
                    return item;
                }
            }).filter(function(n) {
                return n !== undefined;
            });
        }
    }
});

QuestionListController = GlobalController.extend({
    layoutTemplate: 'adminLayout',
    yieldTemplates: {
        'questionListNav': {
            to: 'aside'
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

QuestionByUserIdController = GlobalController.extend({
    waitOn: function() {
        if (Meteor.isClient) {
            Session.setDefault('questionByUserIdLimit', 5);

            return listSubs.subscribe('questionByUserId', Session.get('questionByUserIdLimit'));
        }
    },
    data: function() {
        return {
            questions: Questions.findFaster({
                author: userId
            })
        }
    }
})

QuestionBySubjectController = GlobalController.extend({
    waitOn: function() {
        if (Meteor.isClient) {
            Session.setDefault('questionBySubjectIdLimit', 5);

            return listSubs.subscribe('questionBySubjectId', Session.get('questionBySubjectIdLimit'));
        }
    },
    data: function() {
        return {
            questions: Questions.findFaster({
                subject: {
                    $in: this.params.subjectId
                }
            })
        }
    }
});

QuestionByIdController = GlobalController.extend({
    waitOn: function() {
        return singleSubs.subscribe('questionById', this.params.questionId)
    },
    data: function() {
        return Questions.findOneFaster(this.params.questionId);
    }
});