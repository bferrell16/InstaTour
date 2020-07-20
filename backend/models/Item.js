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
    icon: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    insta: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        required: true
    },
    submittedBy: {
        type: String,
        required: false
    },
    tips: [{
        type: String,
        required: false
    }],
    },
    {timestamps : true}
);

module.exports = Item = mongoose.model("Item", ItemSchema);