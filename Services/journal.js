const { get } = require('jquery');
const db = require('../Config/db');

module.exports = {
  getJournalEnteries: async (req, res) => {
    try {
      const journalEntries = await db.query('SELECT * FROM journalentries');
      console.log('Journal Entries:', journalEntries); // Log the retrieved journal entries
      res.status(200).json(journalEntries);
    } catch (error) {
      console.error('Error retrieving journal entries:', error);
      res.status(500).json({ error: 'Error retrieving journal entries' });
    }
  }
}
