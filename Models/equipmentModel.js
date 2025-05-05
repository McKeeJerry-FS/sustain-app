const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const equipmentSchema = new Schema({
    name: String,
    manufacturer: String,
    description: String,
    serialnumber: String,
    quantity: Number,
    cost: String,
    username: String,
    email: String,
    image: String,
    dateAdded: {
        type: Date,
        default: new Date()
    },
    
});

const Equipment = mongoose.model('Equipment', equipmentSchema);
module.exports = Equipment;