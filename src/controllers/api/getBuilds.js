const axios = require('axios');
const { AXIOS_CONFIG } = require('../../config/index');

module.exports = async (req, res) => {
  const offset = req.query.offset || 0;
  const limit = req.query.limit || 25;
  try {
    const response = await axios.get(`/build/list?offset=${offset}&limit=${limit}`, AXIOS_CONFIG);
    res.json(response.data);
  } catch (error) {
    res.send(error);
  }
};
