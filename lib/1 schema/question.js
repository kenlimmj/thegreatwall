Schema.Question = new SimpleSchema({
    subject: {
        type: [String],
        label: "Question subject(s)",
        regEx: SimpleSchema.RegEx.Id,
        minCount: 1
    },
    author: {
        type: String,
        label: "Question author",
        regEx: SimpleSchema.RegEx.Id,
        denyUpdate: true,
        autoValue: function() {
            return Meteor.userId();
        }
    },
    subscribers: {
        type: [String],
        label: "Question subscriber(s)",
        regEx: SimpleSchema.RegEx.Id
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
        max: 30,
        defaultValue: "Why Do Fish Sleep With Their Eyes Open?"
    },
    displayExcerpt: {
        type: String,
        label: "Displayed question excerpt",
        optional: true,
        autoValue: function() {
            var mdContent = this.field('mdContent');
            if (mdContent.isSet && Meteor.isServer) {
                return summarize(truncate(mdContent.value, 280));
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
    status: {
        type: String,
        label: "Question status",
        allowedValues: ["open", "answered", "expired", "banned"],
        defaultValue: "open"
    }
});