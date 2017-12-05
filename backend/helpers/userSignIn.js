const User = require("../db").User;
const bcrypt = require('bcrypt');

module.exports = userSignIn = (req, res) => {
    let email = req.body.params.email;
    let password = req.body.params.password;
    console.log(email + ' ' + password);
    // User.findOne({ email: email}, (err, data) => {
    //     if(err) {
    //         return err;
    //     } else if(!data) {
    //         let err = new Error('User not found!');
    //         err.status = 401;
    //         return err;
    //     }
    //     bcrypt.compare(password. data.password, (err, res) => {
    //         if(res === true) {
    //             res.status(200).send('Authentication Successful');
    //         }
    //     })
    // })
    User.findOne({ email: email}, (err, user) => {
        console.log(user);
        if(err) {
            return err;
        } else if(!user) {
            res.status(401).send('Invalid authentication');
        }
        bcrypt.compare(password, user.password, (err, response) => {
            if(response === true) {
                res.send(200);
                console.log('Authentication successful!');
            }
        })
    })
};


