const controller = {}

/* controller.inicio = (req, res) => {
    res.render('GestorMunicipio')
} */

controller.listar = (req, res) =>{
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM municipio', (err, municipios) => {
        if(err){
            res.json(err);
        }
        /* console.log(municipios) */
        res.render('GestorMunicipio', {
            data: municipios
        })
        })
    })
}

controller.agregar = (req, res) =>{
    const data = req.body;  

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO municipio set ?', [data] ,(err, municipio) =>{
            if(err){
                res.json(err);
            }
            res.redirect('/municipio/listar')
        })
    })
}   

controller.eliminar = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM municipio WHERE idmunicipio = ?', [id], (err, rows) => {
            if (err) {
                res.json(err);
            } else {
                res.redirect('/municipio/listar');
            }
        });
    })
}

controller.editar = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM municipio WHERE idmunicipio = ?', [id], (err, municipio) => {
            res.render('municipioEditar', {
                data: municipio[0]
            })
        });
    })
}

controller.modificar = (req, res) => {
    const { id } = req.params;
    const newMunicipio = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            res.json(err);
        } else{
            conn.query('UPDATE municipio SET ? WHERE idmunicipio = ?', [newMunicipio, id], (err, rows) => {
                if (err) {
                    res.json(err);
                } else {
                    res.redirect('/municipio/listar')
                }
                });
        }
    });
}



module.exports = controller;