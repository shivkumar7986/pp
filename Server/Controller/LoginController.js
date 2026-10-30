const loginModel = require('../Model/LoginModel')
const handleLogin = async (req, res, next) => {
  try {
    const { uname, pass, lastlogin } = req.body;

    // await loginModel.create({
    //   username: 'admin',
    //   password: 'admin@321'
    // });

    // Find user login info using Mongoose
    const userData = await loginModel.findOne({
      username: uname,
      password: pass,
    });

    if (userData) {
      if (userData.password !== pass) {
        // Invalid password
        res.status(400).json({ error: "Invalid password" });
      } else {
        // Update lastLogin field
        userData.lastlogin = new Date();
        await userData.save();
        console.log(userData);
        res.json({ data: userData, lastlogin: userData.lastlogin });
      }
    } else {
      // Username not found
      res.status(404).json({ error: "Username not found" });
    }
  } catch (error) {
    console.error(error);
    next(error)
  }
}

module.exports = handleLogin;