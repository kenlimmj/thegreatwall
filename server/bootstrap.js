truncate = Meteor.require('truncate');
casual = Meteor.require('casual');
faker = Meteor.require('faker');

var generateUserData = function() {
    return {
        username: faker.Internet.userName(),
        email: faker.Internet.email(),
        password: casual.password,
        profile: {
            name: faker.Name.findName(),
            ip: faker.Internet.ip,
            location: {
                longitude: faker.Address.longitude(),
                latitude: faker.Address.latitude()
            },
            avatar: faker.Image.avatar()
        }
    }
}

Meteor.startup(function() {
    if (!Meteor.users.findOneFaster()) {
        // Initialize dev user
        devId = Accounts.createUser({
            username: "kenlimmj",
            email: "kenlimmj@gmail.com",
            password: "apple1",
            profile: {
                name: "Kenneth Lim",
                avatar: faker.Image.avatar(),
                ip: faker.Internet.ip,
                location: {
                    longitude: faker.Address.longitude(),
                    latitude: faker.Address.latitude()
                }
            }
        });

        AuthManager.addUsersToRoles(devId, ['admin']);

        // Initialize fake users
        for (var j = 1; j < casual.integer(10, 30); j++) {
            Accounts.createUser(generateUserData());
        }
    }

    // Initialize disciplines using the seed data
    if (Disciplines.findFaster().count() !== disciplineData.length) {
        Disciplines.remove({});

        disciplineData.forEach(function(item) {
            Disciplines.insert({
                name: item.name,
                description: item.description
            });
        });
    }

    // Initialize subjects and assign them to disciplines
    if (Subjects.findFaster().count() !== subjectData.length) {
        Subjects.remove({});

        subjectData.forEach(function(item) {
            Subjects.insert({
                name: item.name,
                discipline: item.discipline.map(function(e) {
                    return Disciplines.findOneFaster({
                        name: e
                    })._id;
                })
            });
        })
    }

    // Cache a list of all the users (so we can choose from them later
    // when creating questions and answers)
    var users = Meteor.users.findFaster({}, {
        fields: {
            _id: 1
        },
        sort: {
            _id: 1
        }
    }).fetch();

    if (!Questions.findOneFaster() || !Answers.findOneFaster()) {
        // Purge all existing questions and answers to prevent overlap
        Questions.remove({});
        Answers.remove({});

        // Load in fake questions
        for (var i = 1; i < casual.integer(100, 300); i++) {
            var questionId = Questions.insert({
                author: faker.random.array_element(users)._id,
                mdContent: faker.Lorem.sentences(casual.integer(1, 20)),
                subscribers: [faker.random.array_element(users)._id],
                title: casual.title,
                subject: [faker.random.array_element(subjectData).name].map(function(e) {
                    return Subjects.findOneFaster({
                        name: e
                    }, {
                        fields: {
                            _id: 1
                        }
                    })._id;
                }),
                openStatus: faker.random.array_element([true, false])
            });

            // Load in fake answers
            for (var k = 1; k < casual.integer(1, 10); k++) {
                Answers.insert({
                    author: faker.random.array_element(users)._id,
                    mdContent: faker.Lorem.sentences(casual.integer(1, 20)),
                    parentQuestionId: questionId,
                    votes: casual.integer(0, 500),
                    approved: faker.random.array_element([true, false]),
                    flagStatus: faker.random.array_element([true, false])
                });
            }

            // Change the answer status if an answer was assigned in the
            // previous step
            if (Answers.findOneFaster({
                parentQuestionId: questionId
            }, {
                fields: {
                    _id: 1
                }
            })) {
                Questions.update(questionId, {
                    $set: {
                        answerStatus: true
                    }
                })
            }
        }
    }
});