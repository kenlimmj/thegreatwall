Schema.Discipline = new SimpleSchema({
    name: {
        type: String,
        label: "Discipline name",
        min: 1
    },
    description: {
        type: String,
        label: "Discipline description",
        optional: true
    },
    moderators: {
        type: [String],
        label: "Discipline moderators",
        regEx: SimpleSchema.RegEx.Id,
        defaultValue: []
    }
});