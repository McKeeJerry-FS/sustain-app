const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const journalSchema = new Schema({
    date: {
        type: Date,
        default: new Date()
    },
    gardenType: {
        type: String,
        enum: ['Hydroponics', 'Aeroponics', 'Aquaponics', 'Soil', 'Other'],
        required: true
    },
    journalEntry: String,
    ph: Number,
    temperature: Number,
    ec: Number,
    humidity: Number,
    vpd: Number,
    lightCycle: {
        type: String,
        enum: ['12/12', '16/8', '18/6', '24/0'],
        required: true
    },
    airTemp: Number,
    waterTemp: Number,
    waterLevel: Number,
    lightActive: Number,
    lightInactive: Number,
    notes: String,
    image: String,
    datePosted: {
        type: Date,
        default: new Date()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    
});

const JournalEntry = mongoose.model('JournalEntry', journalSchema);
module.exports = JournalEntry;