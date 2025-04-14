const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const journalSchema = new Schema({
    observation: String,
    reflection: String,
    action: String,
    username: String,
    email: String,
    image: String,
    datePosted: {
        type: Date,
        default: new Date()
    },
    
});

const JournalEntry = mongoose.model('JournalEntry', journalSchema);
module.exports = JournalEntry;