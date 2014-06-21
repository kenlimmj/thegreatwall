Schema.KnowledgeBaseCategory = new SimpleSchema({
    name: {
        type: String,
        label: "KB category name",
        min: 1,
        defaultValue: "New KB category"
    }
});