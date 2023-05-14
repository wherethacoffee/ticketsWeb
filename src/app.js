const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const mysql = require('mysql');	
const myConnection = require('express-myconnection');

const app = express();

//importando rutas
const indexRoutes = require('./routes/indexRoutes');
const adminRoutes = require('./routes/adminRoutes');
const adminIndexRoutes = require('./routes/adminIndexRoutes');
const alumnoRoutes = require('./routes/alumnoRoutes');
const municipioRoutes = require('./routes/municipioRoutes');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares
app.use(morgan('dev'));

//IMPORTANTE: CAMBIAR LA CONTRASEÑA EN CASO DE SER NECESARIO PARA SU BDD
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'admin',
    port: 3306,
    database: 'ticketsdb'}, 'single')
);

app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
//rutas
app.use('/', indexRoutes);
app.use('/admin', adminIndexRoutes);
app.use('/municipio', municipioRoutes);
app.use('/alumno', alumnoRoutes);

//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//starting the server
app.listen(app.get('port'), () => {
    console.log('listening on port 3000');
});