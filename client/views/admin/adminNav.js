var subscribeToCounts = function() {
    listSubs.subscribe('questionCount', {}),
    listSubs.subscribe('disciplineCount', {}),
    listSubs.subscribe('cookbookCount', {}),
    listSubs.subscribe('lectureCount', {}),
    listSubs.subscribe('jobCount', {}),
    listSubs.subscribe('userCount', {})
}

Template.adminNav.rendered = function() {
    subscribeToCounts();
}

Template.adminNav.helpers({
    questionCount: function() {
        return Counts.get('questionCount');
    },
    disciplineCount: function() {
        return Counts.get('disciplineCount');
    },
    cookbookCount: function() {
        return Counts.get('cookbookCount');
    },
    lectureCount: function() {
        return Counts.get('lectureCount');
    },
    jobCount: function() {
        return Counts.get('jobCount');
    },
    kbCount: function() {
        return Counts.get('kbCount');
    },
    userCount: function() {
        return Counts.get('userCount');
    }
});