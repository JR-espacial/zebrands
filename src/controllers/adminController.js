const adminModel = require("../models/adminModel");
const userService = require("../services/userService");


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

//Create a new admin in auth0

async function createAdmin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    //Call the model function to create the admin
    const results = await userService.createUser(email, password);

    //Check for any errors returned by the model function
    if (results.error) {
      return res.status(400).send({
        status: 'error',
        data: null,
        message: 'Error: ' + results.error
      });
    }

    //Send a successful response with the created admin data
    res.status(200).send({
      status: 'success',
      data: results,
      message: 'Admin created successfully.'
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
  createAdmin
};
