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

    //Check for any errors returned by the userService
    if (results.error) {
      return res.status(400).send({
        status: 'error',
        data: null,
        message: 'Error: ' + results.error
      });
    }

    const auth0Id = results.user_id;
    const user_name = results.name;

    const response = await adminModel.createAdmin(email,user_name,auth0Id);

    //Check for any errors returned by the model function
    if (response.error) {
      return res.status(400).send({
        status: 'error',
        data: null,
        message: 'Error: ' + response.error
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

//Get an admin by ID

async function getAdminById(req, res) {
  const adminId = parseInt(req.params.id);

  if (!adminId) {
    return res.status(400).json({
      status: 'error',
      data: null,
      message: 'Invalid admin ID.'
    });
  }

  try {
    //Call the model function to retrieve the admin
    const results = await adminModel.getAdminById(adminId);

    //Check for any errors returned by the model function
    if (results.error) {
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
      message: 'Admin retrieved successfully.'
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

//Update an admin
async function updateAdmin(req, res) {
  const adminId = parseInt(req.params.id);
  const { email,name, auth0Id } = req.body;

  if (!adminId) {
    return res.status(400).json({
      status: 'error',
      data: null,
      message: 'Invalid admin ID.'
    });
  }

  if (!email && !auth0Id && !name) {
    return res.status(400).json({
      status: 'error',
      data: null,
      message: 'Missing a field to update: email, name, auth0Id'
    });
  }

  try {
    //Call the model function to update the admin
    const results = await adminModel.updateAdmin(adminId,email, name, auth0Id);

    //Check for any errors returned by the model function
    if (results.error) {
      return res.status(400).send({
        status: 'error',
        data: null,
        message: 'Error: ' + results.error
      });
    }

    //Send a successful response with the updated admin data
    res.status(200).send({
      status: 'success',
      data: results,
      message: 'Admin updated successfully.'
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

//Delete an admin
async function deleteAdmin(req, res) {
  const adminId = parseInt(req.params.id);

  if (!adminId) {
    return res.status(400).json({
      status: 'error',
      data: null,
      message: 'Invalid admin ID.'
    });
  }

  try {
    //Call the model function to delete the admin
    const results = await adminModel.deleteAdmin(adminId);

    //Check for any errors returned by the model function
    if (results.error) {
      return res.status(400).send({
        status: 'error',
        data: null,
        message: 'Error: ' + results.error
      });
    }

    //Send a successful response with the deleted admin data
    res.status(200).send({
      status: 'success',
      data: results,
      message: 'Admin deleted successfully.'
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
  createAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin

};
