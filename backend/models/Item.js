const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    approved: {
        type: Boolean,
        required: true
    }
    },
    {timestamps : true}
);

module.exports = Item = mongoose.model("Item", ItemSchema);