var collectionCounts = [
    listSubs.subscribe('questionCount', {}),
    listSubs.subscribe('disciplineCount', {}),
    listSubs.subscribe('cookbookCount', {}),
    listSubs.subscribe('lectureCount', {}),
    listSubs.subscribe('jobCount', {}),
    listSubs.subscribe('userCount', {})
];

QuestionAdminListController = GlobalController.extend({
    waitOn: function() {
        if (Meteor.isClient) {
            Session.setDefault('questionSelection', {});
            Session.setDefault('questionSort', {});
            Session.setDefault('questionLimit', 20);

            return [
                listSubs.subscribe('question', Session.get('questionSelection'), {}, Session.get('questionSort'), Session.get('questionLimit')),
                listSubs.subscribe('user', {}, {
                    username: 1
                }, {
                    _id: 1
                }, 0),
                listSubs.subscribe('subject', {}, {
                    name: 1
                }, {
                    name: 1
                }, 0),
                listSubs.subscribe('answer', {}, {
                    displayExcerpt: 0,
                    ogExcerpt: 0
                }, {
                    createdAt: 1,
                    updatedAt: 1,
                    votes: 1
                }, 0)
            ].concat(collectionCounts);
        }
    },
    data: function() {
        return {
            questions: Questions.findFaster({}),
            subjectValues: Subjects.findFaster({}),
            questionCount: Counts.get('questionCount'),
            disciplineCount: Counts.get('disciplineCount'),
            cookbookCount: Counts.get('cookbookCount'),
            lectureCount: Counts.get('lectureCount'),
            jobCount: Counts.get('jobCount'),
            userCount: Counts.get('userCount')
        }
    }
});

DisciplineAdminListController = GlobalController.extend({
    waitOn: function() {
        return [
            listSubs.subscribe('discipline', {}, {}, {}, 0),
            listSubs.subscribe('subject', {}, {
                schools: 0
            }, {}, 0),
            listSubs.subscribe('question', {}, {
                subject: 1,
                answerStatus: 1,
                questionStatus: 1
            }, {}, 0)
        ].concat(collectionCounts);
    },
    data: function() {
        return {
            disciplines: Disciplines.findFaster({}),
            questionCount: Counts.get('questionCount'),
            disciplineCount: Counts.get('disciplineCount'),
            cookbookCount: Counts.get('cookbookCount'),
            lectureCount: Counts.get('lectureCount'),
            jobCount: Counts.get('jobCount'),
            userCount: Counts.get('userCount')
        }
    }
});