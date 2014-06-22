Schema.Answer = {
    author: {
        type: String,
        label: "Answer author",
        regEx: SimpleSchema.RegEx.Id,
        autoValue: function() {
            return Meteor.userId();
        }
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
    parentQuestionId: {
        type: String,
        label: "Parent question ID",
        regEx: SimpleSchema.RegEx.Id
    },
    status: {
        type: String,
        label: "Answer status",
        allowedValues: ["normal", "flagged", "banned"],
        defaultValue: "normal"
    },
    votes: {
        type: Number,
        label: "Answer votes",
        defaultValue: 0
    }
}