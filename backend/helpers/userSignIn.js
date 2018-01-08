const User = require("../db").User;
const bcrypt = require('bcrypt');

module.exports = userSignIn = (req, res) => {
    let email = req.body.params.email;
    let password = req.body.params.password;

    User.findOne({ email: email}, (err, user) => {
        console.log(user);
        if(err) {
            return err;
        } else if(!user) {
            res.status(403).send('User Does not exist.');
        } else {
            bcrypt.compare(password, user.password, (err, response) => {
                if(response === true) {
                    console.log(Object.keys(user.categoryPreference).length)
                    if(user.categoryPreference['category'].length === 0) {
                        req.session.email = email;
                        res.status(201).send({email:email});
                    } else {
                      req.session.email = email;
                      let userData = {};
                       userData.category = user.categoryPreference.category;
                       userData.subcategory = user.categoryPreference.subcategory;
                       //userData.bookmarks = user.bookmarks;
                       //TEST
                       let testArr = [1,2,3,4];
                       userData.bookmarks = testArr;
                      res.status(200).send(userData).end();
                        console.log('Authentication successful!');
                    }
                } else {
                    console.log('Wrong password, try again');
                    res.send(402);
                }
            })
            }
        })

};


