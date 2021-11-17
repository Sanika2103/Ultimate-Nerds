const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");


// register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
      address: req.body.address,
      mob_no: req.body.mob_no,
      name: req.body.name,
      fathername: req.body.fathername,
      pan_no: req.body.pan_no,
      state: req.body.state
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});



// login

router.post("/login",async(req,res)=>{
    try{
        const user = await User.findOne({userename: req.body.username})
        !user && res.status(400).json("Wrong Credentials");

        const validate = await bcrypt.compare(req.body.password, user.password)
        !validate && res.status(400).json("Wrong Credentials");

        const { password, ...others} = user._doc;

        res.status(200).json(others);
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;