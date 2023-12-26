const User=require('../model/userModel')

exports.postSignUp=async (req,res)=>{
     try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
    
        await User.findOne({ where: { email: email } })
          .then(async (user) => {
            if (user) {
              res.status(409).send(
                  `<script>alert('This email is already taken. Please choose another one.'); window.location.href='/'</script>`
                );
            } else {
                await User.create({
                  name: name,
                  email: email,
                  password: password,
                });
              res.status(200).send(
                  `<script>alert('User Created Successfully!'); window.location.href='/'</script>`
                );
            }
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }

}

exports.postLogin=async (req,res)=>{
    try {
        const email = req.body.loginEmail;
        const password = req.body.loginPassword;
    
       await User.findOne({ where: { email: email } }).then((user) => {
          if (user) {
              if (user.password == password) {
                return res.status(200).json({
                  success: true,
                  message: "Login Successful!"
                });
              } else {
                return res.status(401).json({
                  success: false,
                  message: "Password Incorrect!",
                });
              }
          } else {
            return res.status(404).json({
              success: false,
              message: "User doesn't Exists!",
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
}

