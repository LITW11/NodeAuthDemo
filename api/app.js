const express = require('express');
const userRoutes = require('./routes/users');
const secretRoutes = require('./routes/secret');
const camelCaseDeep = require('camelcase-object-deep');
const { setupAuth, ensureAuthenticated } = require('./auth.js');
const session = require('express-session');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'LITRules@!',
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    const originalJson = res.json;
    res.json = function(data) {
        originalJson.call(this, camelCaseDeep(data));
    };
    next();
});

setupAuth(app);

app.use('/api/account', userRoutes);
app.use('/api/secret', ensureAuthenticated, secretRoutes); //this is like doing it at the controller level
// app.use('/api', routes);


app.listen(4000, () => console.log('server started'));