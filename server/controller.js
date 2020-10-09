const bcrypt = require('bcrypt');
const { response } = require('express');
module.exports = {
    register: async (req,res)=>{
        const {username, password} = req.body;
        if(!username || !password)
            return res.status(400).send('username or password is empty');

        const db = req.app.get('db');
        const profile_pic = `https://robohash.org/${username}.png?set=set2`;

        const foundUser = await db.check_user({username});
        if(foundUser[0])
            return (res.status(400).send('Username taken'));
        
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password,salt);

        const user = await db.register({username,password: hash,profile_pic});
        delete user[0].password;
        req.session.user = user[0];
        return res.status(200).send(req.session.user);
    },

    login: async(req,res)=>{
        const {username,password} = req.body;
        if(!username || !password)
            return res.status(400).send('username or password is empty');

        const db = req.app.get('db');

        const user = await db.check_user({username});
        console.log(user[0].password)
        if(!user[0])
            return res.status(401).send('User not found');

        const auth = bcrypt.compareSync(password, user[0].password);
        if(!auth)
            return res.status(401).send('Invalid password');

        delete user[0].password;
        req.session.user = user[0];
        res.status(202).send(req.session.user);
    },

    logout: (req,res)=>{
        req.session.destroy();
        res.sendStatus(200);
    }
}