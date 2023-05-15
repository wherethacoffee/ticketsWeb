const controller = {}

controller.inicio = (req, res) => {
    res.render('formAgendar')
}

controller.agregar = (req, res) => {
    const data = req.body;
    
    // Validar la CURP antes de insertarla en la base de datos
    if (!validarCURP(data.curp)) {
        res.render('formAgendar', {
            alert: true,
            alertTitle: 'ERROR',
            alertMessage: 'CURP NO VALIDA',
            alertIcon: 'error',
            timer: 1500,
            ruta: 'alumno/inicio'

        })
    return;
    }

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO alumno set ?', [data], (err, alumno) => {
            if (err) {
                res.json(err);
            } else {
                res.render('formAgendar', {
                    alert: true,
                    alertTitle: 'EXITO',
                    alertMessage: 'REGISTRO COMPLETADO',
                    alertIcon: 'success',
                    showconfirmationbutton: false,
                    timer: 1500,
                    ruta: 'alumno/inicio'
                }
        )}
        });
    })
}


function validarCURP(curp) {
    // Expresión regular para validar una CURP
    const curpRegex = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9]{2}$/;
    return curpRegex.test(curp);
}




module.exports = controller;