Schema.Subject = new SimpleSchema({
    name: {
        type: String,
        label: "Subject name",
        min: 1,
        defaultValue: "Orthogenetic Phylogeny"
    },
    discipline: {
        type: [String],
        label: "Subject discipline",
        minCount: 1,
        regEx: SimpleSchema.RegEx.Id
    },
    schools: {
        type: [String],
        label: "Schools offering subject",
        regEx: SimpleSchema.RegEx.Id,
        minCount: 0,
        defaultValue: []
    }
});