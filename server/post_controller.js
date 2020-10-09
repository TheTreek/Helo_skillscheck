module.exports = {
    getAll: async (req,res)=>{
        const db = req.app.get('db');
        let {username, search} = req.query;
        console.log(req.query);
        if(!username)
            username = '';
         if(!search)
             search = '';
        const posts = await db.get_all_posts({username,search});
        return res.status(200).send(posts);
    },
    getOne: async (req,res)=>{
        const db = req.app.get('db');
        let {id} = req.params;
        const post = await db.get_single({id});
        console.log(post);
        return res.status(200).send(post[0]);
    }
}