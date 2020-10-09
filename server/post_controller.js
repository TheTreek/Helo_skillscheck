const session = require("express-session");

module.exports = {
    getAll: async (req,res)=>{
        const db = req.app.get('db');
        let {username, search} = req.query;
        console.log(req.query);
        if(!username)
            username = '';
         if(!search)
             search = '';
        console.log(req.session.user)
            const posts = await db.get_all_posts({username,search});
        return res.status(200).send(posts);

    },
    getOne: async (req,res)=>{
        const db = req.app.get('db');
        let {id} = req.params;
        const post = await db.get_single({id});
        console.log(post);
        return res.status(200).send(post[0]);
    },
    newPost: async (req,res)=>{
        const db = req.app.get('db');
        const id = req.session.user.id;
        const {title,content,img} = req.body;
        await db.new_post({id,title,content,img});
        return res.sendStatus(200);
    }
}