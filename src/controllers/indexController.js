const controller = {}

controller.iniciar = (req, res) => {
    res.render('Agenda');
}

controller.toLogin = (req, res) => {
    res.render('login');
}

controller.toAgendar = (req, res) => {
    res.render('Agendar');
}

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

module.exports = controller;