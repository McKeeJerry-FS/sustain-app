const Garden = require('../Services/gardens');

exports.index = async (req, res) => {
  try {
    const gardens = await Garden.getGardens();
    res.render('index', { title: 'Dashboard', gardens: gardens });
    res.status(200).json(gardens);   
  } catch (error) {
    res.status(500).json({ error: error.toString() });
    res.render('Error retrieving gardens: ', { error });
  }
}