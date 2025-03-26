const Garden = require('../Services/gardens');

exports.index = async (req, res) => {
  try {
    const gardens = await Garden.getGardens();
    console.log(gardens);
    res.render('index', { title: 'Dashboard', garden: gardens });  
  } catch (error) {
    res.status(500).json({ error: error.toString() });
    res.render('Error retrieving gardens: ', { error });
  }
}