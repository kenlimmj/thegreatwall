Schema.Discipline = new SimpleSchema({
    name: {
        type: String,
        label: "Human-readable name of the discipline.",
        min: 1,
        defaultValue: "Creationism"
    }
});