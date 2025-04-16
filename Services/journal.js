const { get } = require('jquery');
const db = require('../Config/db');

module.exports = {
  getJournalEntry: async () => {
    const data = await db('journalentries')
      .select('*')
      .where({
        'user_id': req.user.id
      })
      .orderBy('date', 'desc');
    return data;
  },
  
  getJournalEntryById: async (id) => {
    const data = await db('journalentries')
      .select('*')
      .where({
        'id': id, 
        'user_id': req.user.id,
      })
      .first();
    return data;
  },
}
