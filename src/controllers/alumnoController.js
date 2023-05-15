const controller = {}

controller.inicio = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM municipio', (err, admins) => {
            if (err) {
                res.json(err);
            }
            res.render('formAgendar', {
                data: admins
            });
        });
    })
}

controller.agregar = (req, res) => {
    const data = req.body;
    
    // Validar la CURP antes de insertarla en la base de datos
    if (!validarCURP(data.curp)) {
        res.redirect('alumno/inicio')
    }

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO alumno set ?', [data], (err, alumno) => {
            if (err) {
                res.json(err);
            } else {
                res.redirect('alumno/inicio')}
        });
    })
}


function validarCURP(curp) {
    // Expresión regular para validar una CURP
    const curpRegex = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9]{2}$/;
    return curpRegex.test(curp);
}

module.exports = controller;