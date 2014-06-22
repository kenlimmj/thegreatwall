Schema.Location = new SimpleSchema({
    latitude: {
        type: Number,
        label: "Latitude",
        min: 1,
        decimal: true
    },
    longitude: {
        type: Number,
        label: "Longitude",
        min: 1,
        decimal: true
    },
    country: {
        type: String,
        label: "Country",
        min: 1
    }
});