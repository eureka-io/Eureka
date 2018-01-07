const User = require("../db").User;
const bcrypt = require('bcrypt');

module.exports = userSignUp = (req, res) => {
    console.log(req.body.params);
    let email = req.body.params.email;
    let password = req.body.params.password;

    /* Check the request body and assign it to an object */
    if(email && password) {
        let userData = {
            email: email,
            password: password
        };

        User.findOne({email: userData.email}, (err, data) => {
            console.log(data);
            if(!data) {


                /* Use the above object to save it to the database */
                bcrypt.hash(userData.password, 10, (err, hash) => {
                    if(err) {
                        throw err;
                    } else {
                        userData.password = hash;
                        console.log("User Data", userData)
                        User.create(userData, (err) => {
                            if(err) {
                                console.error(err);
                            };
                            console.log('Successfuly signed up. Saved in db.');
                        });
                    }
                });
                res.status(200).send('Successfuly signed up. Saved in db.');
            } else {
                console.log('User Already Exists');
                res.send(201);


            }
        });

    }
};