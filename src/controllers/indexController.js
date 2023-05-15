const controller = {}

controller.iniciar = (req, res) => {
    res.render('Agenda');
}

controller.toLogin = (req, res) => {
    res.render('login');
}

controller.toAgendar = (req, res) => {
    res.redirect('/alumno/inicio');
}

controller.toVerEstado = (req, res) => {
    res.render('inCurp')
}

controller.validarCURP = (req, res) => {
    const { curp } = req.body;

    if (validarCURP(curp)) {
        res.redirect('/alumno/listarCitas/'+curp)
    } else {
        res.send('error');
    }
};

controller.auth = (req, res) => {
    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;

    if (usuario && contrasena) {
        req.getConnection((err, conn) => {
            conn.query("SELECT * FROM admin WHERE usuario = ?", [usuario], (err, result) => {
                if (err) {
                    res.json(err);
                } else {
                    if (result.length == 0 || contrasena != result[0].contrasena) {
                        res.render('login', {
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "Usuario y/o contraseña incorrectas",
                            alertIcon: "error",
                            timer: 1500,
                            ruta: 'toLogin'
                        })
                    } else {
                        //req.session.name = result[0].usuario
                        res.render('login', {
                            alert: true,
                            alertTitle: "Exito",
                            alertMessage: "Usuario y/o contraseña validas",
                            alertIcon: "success",
                            showConfimationButton: false,
                            timer: 1500,
                            ruta: 'admin/inicio'
                        })
                    }
                }
            })
        })
    } else {
        res.send("Digite los campos vacios")
    }
}

function validarCURP(curp) {
    // Expresión regular para validar una CURP
    const curpRegex = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[A-Za-z0-9]{2}$/;
    return curpRegex.test(curp);
}

module.exports = controller;