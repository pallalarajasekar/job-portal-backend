var express = require('express');
var router = express.Router();
var JWT = require('jsonwebtoken');

const { 
    getUser,
    registerUser,
    loginUser,
    forgotPassword,
    expireString,
    verfiyString,
    resetPassword,
    activateAccount,
    jobCreate,
    getJobs,
    searchJob,
    searchPerfectJob
} = require("../controller/login");

//const { authentication } = require("../middleware/auth");

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    const loginData = await getUser();
    res.status(200).json(loginData)
  } catch (error) {
    console.log(error);
    res.statusCode(500);
  }
});

router.post('/createUser',  async(req, res) => {
  try {
    const { firstname,lastname, email, password, role } =  req.body
    const response = await registerUser(firstname,lastname, email, password, role);
    res.status(response.status).json(response.msg);
  } catch (error) {
    console.log(error);
    res.statusCode(500);
  }
})

router.post('/login', async(req, res) => {
    try {
      const { email, password } = req.body;
      const response =  await loginUser(email, password);
      res.status(response.status).json(response);
    } catch (error) {
      console.log(error);
      res.statusCode(500);
    }
})

router.post('/forgot', async(req, res) => {
  try {
    const {email} = req.body;
    const response = await forgotPassword(email);
    res.status(response.status).json(response.msg);
    setTimeout(expireString, 30000, email);
  } catch (error) {
    console.log(error);
    res.statusCode(500);
  }
})

router.post('/verifyString', async(req, res) => {
  try {
    const {email, randomString} = req.body;
    const response = await verfiyString(email, randomString);
    res.status(response.status).json(response.msg);
  } catch (error) {
    console.log(error);
    res.statusCode(500);
  }
})

router.put('/reset', async(req, res) => {
  try {
    const {email, password} = req.body;
    const response = await resetPassword(email, password);
    res.status(response.status).json(response.msg);
  } catch (error) {
    console.log(error);
    res.statusCode(500);
  }
})

router.put('/userActivate', async(req, res) => {
  try {
    const {email} = req.body;
    const response = await activateAccount(email);
    res.status(response.status).json(response.msg);
  } catch (error) {
    console.log(error);
    res.statusCode(500);
  }
})

router.post('/createJob',  async(req, res) => {
  try {
    const response = await jobCreate(req.body);
    res.status(response.status).json(response.msg);
  } catch (error) {
    console.log(error);
    res.statusCode(500);
  }
})

router.get('/jobList', async (req, res) => {
  try {
    const jobListData = await getJobs();
    res.status(200).json(jobListData)
  } catch (error) {
    console.log(error);
    res.statusCode(500);
  }
});

router.post('/jobsearch', async (req, res) => {
  try {
    //const {jobTitle, cmpnyCity} = req.body;
    const response = await searchJob(req.body);
    res.status(200).json(response)
  } catch (error) {
    console.log(error);
    res.statusCode(500);
  }
});

router.post('/perfectJob', async (req, res) => {
  try {
    const {jobTitle, cmpnyCity} = req.body;
    const response = await searchPerfectJob(jobTitle, cmpnyCity);
    res.status(200).json(response)
  } catch (error) {
    console.log(error);
    res.statusCode(500);
  }
});




module.exports = router;
