const controller = require('./controller');

require('dotenv').config();
const express = require('express'),
    massive = require('massive'),
    session = require('express-session'),
    constroller = require('./controller'),
    {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
    app = express();

app.use(express.json());

//Set up sessions
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 14}  //2 weeks
}));


//Endpoints
app.post('/api/register', controller.register);
app.post('/api/login',controller.login);
app.get('/api/logout',controller.logout);


//Connect to server
massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db=>{
    app.set('db',db);
    console.log('DB connected');
    app.listen(SERVER_PORT, console.log(`Server listening on port ${SERVER_PORT}`));
})