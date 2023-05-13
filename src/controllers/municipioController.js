const controller = {}

controller.inicio = (req, res) => {
    res.render('GestorMunicipio')
}

controller.listar = (req, res) =>{
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM municipio', (err, municipio) => {
        if(err){
            res.json(err);
        }
        res.render('GestorMunicipio', {
            data: municipio
        })
        })
    })
}



module.exports = controller;