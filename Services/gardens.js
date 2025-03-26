const { get } = require('jquery');
const db = require('../Config/db');

module.exports = {

// *********************************************************************************************
// GET functions for gardens
// *********************************************************************************************

  getGardens: async () => {
    try{

      const data = db('GARDENS')
      .select('*');
      console.log(data);
      return data;
    } catch (err) {
      console.erro('Error retrieving garden data: ',err);
    }
  },

  getGardenTypes: async () => {
    try {
      const data = db('GARDEN_TYPES')
        .select('*');
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error retrieving garden types: ', error);
    }
  },

  getGardenLocations: async () => {
    try {
      const data = db('GARDEN_LOCATION')
        .select('*');
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error retrieving garden locations: ', error);
    }
  }

}