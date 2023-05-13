const controller = {}

controller.inicio = (req, res) => {
    res.render('GestorMunicipio')
}

controller.listar = (req, res) =>{
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM municipio', (err, municipios) => {
        if(err){
            res.json(err);
        }
        console.log(municipios);
        res.render('GestorMunicipio', {
            data: municipios
        })
        })
    })
}

controller.save = (req, res) =>{
    const data = req.body;  

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO municipio set ?', [data] ,(err, municipio) =>{
            if(err){
                res.json(err);
            }
            console.log(data);
            console.log(municipio);
            res.send('works')
        })
    })
}



module.exports = controller;