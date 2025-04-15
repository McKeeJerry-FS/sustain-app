const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const journalSchema = new Schema({
    journalEntry: String,
    ph: Number,
    temperature: Number,
    ec: Number,
    humidity: Number,
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