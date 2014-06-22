Schema.School = new SimpleSchema({
    name: {
        type: String,
        label: "School name",
        min: 1,
        defaultValue: "Xavier's School for Gifted Youngsters"
    },
    level: {
        type: [String],
        label: "School level",
        allowedValues: ["Primary/Elementary", "Secondary/Middle", "Tertiary/High", "University/College", "Other"],
        minCount: 1,
        defaultValue: ["Other"]
    },
    location: {
        type: Schema.Location,
        label: "School location"
    },
    users: {
        type: [String],
        label: "Users from school",
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    }
});