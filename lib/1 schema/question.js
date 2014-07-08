Schema.Question = new SimpleSchema({
    subject: {
        type: String,
        label: "Question subject",
        regEx: SimpleSchema.RegEx.Id
    },
    author: {
        type: String,
        label: "Question author",
        regEx: SimpleSchema.RegEx.Id,
        denyUpdate: true
    },
    subscribers: {
        type: [String],
        label: "Question subscriber(s)",
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    createdAt: {
        type: Date,
        label: "Question creation date",
        denyUpdate: true,
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            } else if (this.isUpsert) {
                return {
                    $setOnInsert: new Date
                };
            } else {
                this.unset();
            }
        }
    },
    updatedAt: {
        type: [Date],
        label: "Question update date",
        denyInsert: true,
        optional: true,
        autoValue: function() {
            if (this.isUpdate) {
                return {
                    $push: new Date
                }
            }
        }
    },
    title: {
        type: String,
        label: "Question title",
        min: 1,
        max: 100
    },
    displayExcerpt: {
        type: String,
        label: "Displayed question excerpt",
        optional: true,
        autoValue: function() {
            var mdContent = this.field('mdContent');
            if (mdContent.isSet && Meteor.isServer) {
                return summarize(truncate(mdContent.value, 100));
            }
        }
    },
    ogExcerpt: {
        type: String,
        label: "OpenGraph question excerpt",
        optional: true,
        autoValue: function() {
            var mdContent = this.field('mdContent');
            if (mdContent.isSet && Meteor.isServer) {
                return summarize(truncate(mdContent.value, 200));
            }
        }
    },
    mdContent: {
        type: String,
        label: "Question body (Markdown)",
        min: 1
    },
    htmlContent: {
        type: String,
        label: "Question body (HTML)",
        min: 1,
        optional: true,
        autoValue: function() {
            var mdContent = this.field('mdContent');
            if (mdContent.isSet && Meteor.isServer) {
                return marked(mdContent.value);
            }
        }
    },
    answerStatus: {
        type: Boolean,
        label: "Question answer status",
        defaultValue: false
    },
    openStatus: {
        type: Boolean,
        label: "Question open status",
        defaultValue: true
    }
    privateStatus: {
        type: Boolean,
        label: "Question privacy status",
        defaultValue: false
    }
});