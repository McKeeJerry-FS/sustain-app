const equipment = require('../models/equipmentModel');

exports.addEquipment = async (req, res) => {
  try {
    const { name, manufacturer, serialNumber, quantity, description, cost } = req.body;
    console.log('Request Body:', req.body); // Log form data
    console.log('Uploaded File:', req.file); // Log uploaded file details

    // Create a new equipment entry and associate it with the logged-in user
    const newEquipment = new equipment({
      name,
      manufacturer,
      serialNumber,
      quantity,
      description,
      cost,
      user: req.user._id, // Associate the entry with the logged-in user
    });

    console.log('Logged-in User:', req.user);
    await newEquipment.save();
    res.status(201).json({ success: true, message: 'Equipment added successfully', equipment: newEquipment });
  } catch (err) {
    console.error('Error adding equipment:', err);
    res.status(500).json({ success: false, message: 'Error adding equipment' });
  }
}

exports.getEquipment = async (req, res) => {
  try {
    const equipmentList = await equipment.find({ user: req.user._id }).sort({ dateAdded: -1 });
    res.status(200).json({ success: true, equipment: equipmentList });
  } catch (err) {
    console.error('Error fetching equipment:', err);
    res.status(500).json({ success: false, message: 'Error fetching equipment' });
  }
}

exports.getEquipmentById = async (req, res) => {
  try {
    const equipmentItem = await equipment.findById(req.params.id);
    if (!equipmentItem) {
      return res.status(404).json({ success: false, message: 'Equipment not found' });
    }
    res.status(200).json({ success: true, equipment: equipmentItem });
  } catch (err) {
    console.error('Error fetching equipment:', err);
    res.status(500).json({ success: false, message: 'Error fetching equipment' });
  }
}

exports.updateEquipment = async (req, res) => {
  try {
    const { name, type, brand, model, serialNumber, purchaseDate, warrantyExpiryDate, notes } = req.body;
    const equipmentItem = await equipment.findById(req.params.id);
    if (!equipmentItem) {
      return res.status(404).json({ success: false, message: 'Equipment not found' });
    }

    // Update the equipment item with new data
    equipmentItem.name = name || equipmentItem.name;
    equipmentItem.type = type || equipmentItem.type;
    equipmentItem.brand = brand || equipmentItem.brand;
    equipmentItem.model = model || equipmentItem.model;
    equipmentItem.serialNumber = serialNumber || equipmentItem.serialNumber;
    equipmentItem.purchaseDate = purchaseDate || equipmentItem.purchaseDate;
    equipmentItem.warrantyExpiryDate = warrantyExpiryDate || equipmentItem.warrantyExpiryDate;
    equipmentItem.notes = notes || equipmentItem.notes;
    if (req.file) {
      equipmentItem.image = req.file.path; // Update the image path if a new file is uploaded
    }

    await equipmentItem.save();
    res.status(200).json({ success: true, message: 'Equipment updated successfully', equipment: equipmentItem });
  } catch (err) {
    console.error('Error updating equipment:', err);
    res.status(500).json({ success: false, message: 'Error updating equipment' });
  }
}

exports.deleteEquipment = async (req, res) => {
  try {
    const equipmentItem = await equipment.findById(req.params.id);
    if (!equipmentItem) {
      return res.status(404).json({ success: false, message: 'Equipment not found' });
    }

    await equipmentItem.remove();
    res.status(200).json({ success: true, message: 'Equipment deleted successfully' });
  } catch (err) {
    console.error('Error deleting equipment:', err);
    res.status(500).json({ success: false, message: 'Error deleting equipment' });
  }
}