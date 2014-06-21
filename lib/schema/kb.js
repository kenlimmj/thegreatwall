Schema.KnowledgeBase = new SimpleSchema({
    category: {
        type: [String],
        label: "KB entry category",
        regEx: SimpleSchema.RegEx.Id,
        minCount: 1
    },
    classification: {
        type: String,
        label: "KB entry security classification",
        regEx: SimpleSchema.RegEx.Id
    },
    author: {
        type: String,
        label: "KB entry author",
        regEx: SimpleSchema.RegEx.Id,
        denyUpdate: true,
        autoValue: function() {
            return Meteor.userId();
        }
    },
    createdAt: {
        type: Date,
        label: "KB entry creation date",
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
        label: "KB entry update date",
        denyInsert: true,
        optional: true,
        autoValue: function() {
            if (this.isUpdate) {
                return {
                    $push: new Date;
                }
            }
        }
    },
    title: {
        type: String,
        label: "KB entry title",
        min: 1,
        max: 30,
        defaultValue: "New Knowledge Base Entry"
    },
    displayExcerpt: {
        type: String,
        label: "Displayed KB entry excerpt",
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
        label: "OpenGraph KB entry excerpt",
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
        label: "KB entry body (Markdown)",
        min: 1
    },
    htmlContent: {
        type: String,
        label: "KB entry body (HTML)",
        min: 1,
        optional: true,
        autoValue: function() {
            var mdContent = this.field('mdContent');
            if (mdContent.isSet && Meteor.isServer) {
                return marked(mdContent.value);
            }
        }
    }
});