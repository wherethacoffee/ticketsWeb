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
    
    const values = [
        data.curp,
        data.nombre,
        data.paterno,
        data.materno,
        data.telefono,
        data.correo,
        data.nivel,
        data.asunto,
        data.idmunicipio,
        data.idmunicipio
        ]

    // Validar la CURP antes de insertarla en la base de datos
    if (!validarCURP(data.curp)) {
        res.status(400).send('La CURP no es válida');
        return;
    }

    req.getConnection((err, conn) => {
        const sql = `
    INSERT INTO alumno (curp, nombre, paterno, materno, telefono, correo, nivel, asunto, turno, idmunicipio)
    SELECT 
    ? as curp, 
    ? as nombre, 
    ? as paterno, 
    ? as materno, 
    ? as telefono, 
    ? as correo,
    ? as nivel, 
    ? as asunto, 
    (SELECT IFNULL(MAX(turno), 0) + 1 FROM alumno WHERE idmunicipio = ?) as turno,
    ? as idmunicipio;
`;

    conn.query(sql, values, (err, result) => {
    if (err) {
        res.json(err);
    } else {
        res.redirect('/alumno/inicio')
    }
});
    })
}


function validarCURP(curp) {
    // Expresión regular para validar una CURP
    const curpRegex = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9]{2}$/;
    return curpRegex.test(curp);
}

module.exports = controller;