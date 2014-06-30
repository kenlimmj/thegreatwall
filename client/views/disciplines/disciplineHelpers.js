Template.disciplineAdminList.helpers({
    hasSubjects: function() {
        return Subjects.findFaster({
            discipline: {
                $in: [this._id]
            }
        }, {
            sort: {
                name: 1
            },
            fields: {
                _id: 1
            }
        }).count() !== 0
    },
    subjectList: function() {
        return {
            subjects: Subjects.findFaster({
                discipline: {
                    $in: [this._id]
                }
            }, {
                sort: {
                    name: 1
                },
                fields: {
                    name: 1
                }
            })
        }
    },
    questionAllCount: function() {
        return Questions.findFaster({
            subject: {
                $in: [this._id]
            }
        }, {
            sort: {
                updatedAt: -1
            },
            fields: {
                _id: 1
            }
        }).count()
    },
    questionOpenCount: function() {
        return Questions.findFaster({
            subject: {
                $in: [this._id]
            },
            openStatus: true
        }, {
            sort: {
                updatedAt: -1
            },
            fields: {
                _id: 1
            }
        }).count()
    },
    questionAnswerCount: function() {
        return Questions.findFaster({
            subject: {
                $in: [this._id]
            },
            answerStatus: true
        }, {
            sort: {
                updatedAt: -1
            },
            fields: {
                _id: 1
            }
        }).count()
    }
});