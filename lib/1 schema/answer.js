Schema.Answer = new SimpleSchema({
    author: {
        type: String,
        label: "Answer author",
        regEx: SimpleSchema.RegEx.Id
    },
    createdAt: {
        type: Date,
        label: "Answer creation date",
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
        label: "Job entry update date",
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
    mdContent: {
        type: String,
        label: "Answer body (Markdown)",
        min: 1
    },
    htmlContent: {
        type: String,
        label: "Answer body (HTML)",
        min: 1,
        optional: true,
        autoValue: function() {
            var mdContent = this.field('mdContent');
            if (mdContent.isSet && Meteor.isServer) {
                return marked(mdContent.value);
            }
        }
    },
    displayExcerpt: {
        type: String,
        label: "Displayed answer excerpt",
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
        label: "OpenGraph answer excerpt",
        optional: true,
        autoValue: function() {
            var mdContent = this.field('mdContent');
            if (mdContent.isSet && Meteor.isServer) {
                return summarize(truncate(mdContent.value, 200));
            }
        }
    },
    approved: {
        type: Boolean,
        label: "Answer approval status",
        optional: true,
        defaultValue: false
    },
    parentQuestionId: {
        type: String,
        label: "Parent question ID",
        regEx: SimpleSchema.RegEx.Id
    },
    flagStatus: {
        type: Boolean,
        label: "Question flag status",
        defaultValue: false
    },
    votes: {
        type: Number,
        label: "Answer votes",
        defaultValue: 0
    }
});