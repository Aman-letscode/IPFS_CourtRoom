
// const bcrypt = require("bcrypt");
const User = require("../models/users");

class Register {
  static register = async (req, res) => {
    // res.send('Register here');

    //Body properties
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const userId = req.body.userId;
    const password = req.body.password;
    const cpassword = req.body.cpassword;
    const role = req.body.role;
    // const dateofbirth = req.body.DOB;

    //Checking if exist or not
    const user = await User.findOne({ userId: userId }).lean();


    if (user) {
      res.json({ status: "failed", message: "User Already Exist!!" });
      console.log(user);
    } else {

      //Checking all properties are fulfilled
      if (firstname && userId && password) {

        //matching the passwords
        if (password == cpassword) {
          try {

            //Generating a hash
            // const salt = await bcrypt.genSalt(10);
            // const hash_password = await bcrypt.hash(password, salt);

            //Building a model document of user
            const doc = new User({
              firstname: firstname,
              lastname: lastname,
              user_id: userId,
              password: password,
              role: role, 
            });

            //saving it
            await doc.save();

            const saved = await User.findOne({ user_id: userId });

            if (saved) {
              res.json({
                status: "success",
                message: "Registration Successful",
              });
            } else {
              res.json({
                status: "failed",
                message: "Registration UnSuccessful and not saved",
              });
            }
          } catch (err) {
            console.log(err);
            res.json({
              status: "failed",
              message: "Registration UnSuccessful",
            });
          }
        } else {
          res.json({
            status: "failed",
            message: "Password and Confirm Password wasn't matching",
          });
        }
      } else {
        res.json({ status: "failed", message: "All feilds are required" });
      }
    }

  };
  static login = async (req, res) => {
    // res.send('Login here');

    const userId = req.body.userId;
    const password = req.body.password;
    // const
    const user = await User.findOne({ user_id: userId }).lean();

    if (user) {
      if (password) {
        // const checkpass = await bcrypt.compareSync(password, user.password);
        
        if (user.user_id === userId && user.password === password) {

          console.log("Login Successfully");
          res.status(201).json({
            status: "success",
            message: "Login Successful",

            user_id: user.user_id,
            role: user.role

          });
        } else {
          console.log("Login Unsuccessful");
          const result = {
            status: "failed",
            message: "Please check the credentials",
          };

          res.json(result);
          

        }
      } else {
        console.log("All feilds are required");
        res.json({ status: "failed", message: "All feilds are required" });
      }
    } else {
      console.log("User not found! Please registe");
      res.json({
        status: "failed",
        message: "User not found! Please register",
      });
    }

  };
}

module.exports = Register;
