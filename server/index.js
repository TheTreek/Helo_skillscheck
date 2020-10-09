require('dotenv').config();
const express = require('express'),
    massive = require('massive'),
    session = require('express-session'),
    controller = require('./controller'),
    post_controller = require('./post_controller'),
    {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
    app = express();

app.use(express.json());

//Set up sessions -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 14}  //2 weeks
}));


//Endpoints -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

//Auth
app.post('/api/register', controller.register);
app.post('/api/login',controller.login);
app.get('/api/logout',controller.logout);

//Posts
app.get('/api/posts',post_controller.getAll);
app.get('/api/post/:id',post_controller.getOne);
app.post('/api/post',post_controller.newPost)


//Connect to server-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db=>{
    app.set('db',db);
    console.log('DB connected');
    app.listen(SERVER_PORT, console.log(`Server listening on port ${SERVER_PORT}`));
})