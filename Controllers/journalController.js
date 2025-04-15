const JournalEntry = require('../Models/journalModel');

exports.addJournalEntry = async (req, res) => {
  try {
    const { journalEntry, ph, ec, humidity, airTemp, waterTemp, waterLevel, lightActive, lightInactive, notes, image } = req.body;
    console.log('Request Body:', req.body); // Log form data
    console.log('Uploaded File:', req.file); // Log uploaded file details
    // Create a new journal entry and associate it with the logged-in user
    const newEntry = new JournalEntry({
      journalEntry,
      ph,
      ec,
      humidity,
      airTemp,
      waterTemp,
      waterLevel,
      lightActive,
      lightInactive,
      notes,
      image: req.file ? req.file.path : null, // Save the uploaded file path
      user: req.user._id, // Associate the entry with the logged-in user
    });

    await newEntry.save();
    res.status(201).json({ success: true, message: 'Journal entry added successfully', entry: newEntry });
  } catch (err) {
    console.error('Error adding journal entry:', err);
    res.status(500).json({ success: false, message: 'Error adding journal entry' });
  }
};

exports.getUserJournalEntries = async (req, res) => {
  try {
    const entries = await JournalEntry.find({ user: req.user._id }); // Find entries for the logged-in user
    //const entries = await JournalEntry.find({ user: req.user._id }).populate('user', 'username'); // Populate username and email
    res.status(200).json({ success: true, entries });
  } catch (err) {
    console.error('Error fetching journal entries:', err);
    res.status(500).json({ success: false, message: 'Error fetching journal entries' });
  }
};