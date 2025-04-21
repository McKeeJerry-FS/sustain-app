const JournalEntry = require('../Models/journalModel');

exports.addJournalEntry = async (req, res) => {
  try {
    const { date, journalEntry, gardenType, ph, ec, vpd, humidity, airTemp, waterTemp, waterLevel, lightActive, lightInactive, notes, image } = req.body;
    console.log('Request Body:', req.body); // Log form data
    console.log('Uploaded File:', req.file); // Log uploaded file details
    // Create a new journal entry and associate it with the logged-in user
    const newEntry = new JournalEntry({
      date,
      journalEntry,
      gardenType,
      ph,
      ec,
      humidity,
      vpd,
      airTemp,
      waterTemp,
      waterLevel,
      lightActive,
      lightInactive,
      notes,
      image: req.file ? req.file.path : null, // Save the uploaded file path
      user: req.user._id, // Associate the entry with the logged-in user
    });

    console.log('Logged-in User:', req.user);
    await newEntry.save();
    res.status(201).json({ success: true, message: 'Journal entry added successfully', entry: newEntry });
  } catch (err) {
    console.error('Error adding journal entry:', err);
    res.status(500).json({ success: false, message: 'Error adding journal entry' });
  }
};

exports.getJournalEntries = async (req, res) => {
  try {
    const entries = await JournalEntry.find({ user: req.user._id }).sort({ date: -1 });
    res.status(200).json({ success: true, entries });
  } catch (err) {
    console.error('Error fetching journal entries:', err);
    res.status(500).json({ success: false, message: 'Error fetching journal entries' });
  }
};

exports.getJournalEntryById = async (req, res) => {
  try {
    const entry = await JournalEntry.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ success: false, message: 'Journal entry not found' });
    }
    res.status(200).json({ success: true, entry });
  } catch (err) {
    console.error('Error fetching journal entry:', err);
    res.status(500).json({ success: false, message: 'Error fetching journal entry' });
  }
};

