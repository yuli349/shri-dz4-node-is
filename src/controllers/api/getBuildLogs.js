const axios = require('axios');
const { AXIOS_CONFIG } = require('../../config/index');

module.exports = async (req, res) => {
  try {
    const response = await axios.get('/build/log?buildId=' + req.params.buildId, AXIOS_CONFIG);
    res.json(response.data);
  } catch (error) {
    res.send(error);
  }
};
