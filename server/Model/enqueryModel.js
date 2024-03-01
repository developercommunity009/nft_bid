const mongoose = require("mongoose");

const enquerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
    },
    email: {
        type: String,
        required: [true, "Please must be provivded email"],
        unique: true,
    },

    discreption: {
        type: String,
        required: [true, "Please must be provivded discreption"],
    },
    createdAt:{
        type:Date,
        default: Date.now(),
        select: false
    },

});

const Enquery = mongoose.model("Enquery", enquerySchema);
module.exports = Enquery;