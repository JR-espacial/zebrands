const adminModel = require("../models/adminModel");


async function getAllAdmins(req, res) {
  try {
    //Call the model function to retrieve all admins
    const results = await adminModel.getAllAdmins();

    //Check for any errors returned by the model function
    if(results.error){
      return res.status(400).send({
        status: 'error',
        data: null,
        message: 'Error: ' + results.error
      });
    }

    //Send a successful response with the admin data
    res.status(200).send({
      status: 'success',
      data: results,
      message: 'Admins retrieved successfully.'
    });
  } catch (error) {
    //Handle any unexpected errors
    res.status(500).send({
      status: 'error',
      data: null,
      message: 'Error: ' + error.message
    });
  }
}

module.exports = {
  getAllAdmins,
};
