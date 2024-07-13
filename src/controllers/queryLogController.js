const queryLogModel = require('../models/queryLogModel');

// Fetch all query logs
async function getAllLogs(req, res) {
  try {
    // Call the model function to retrieve all query logs
    const results = await queryLogModel.getAllQueryLogs();

    // Check for any errors returned by the model function
    if (results.error) {
      return res.status(400).send({
        status: 'error',
        data: null,
        message: 'Error: ' + results.error
      });
    }

    // Send a successful response with the query log data
    res.status(200).send({
      status: 'success',
      data: results,
      message: 'Query logs retrieved successfully.'
    });
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).send({
      status: 'error',
      data: null,
      message: 'Error: ' + error.message
    });
  }
}

module.exports = {
  getAllLogs,
};
