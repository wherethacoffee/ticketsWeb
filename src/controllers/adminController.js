const controller = {}

controller.inicio = (req, res) => {
    res.render('GestorAdmin')
}

controller.agregar = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO admin set ?', [data], (err, admin) => {
            if (err) {
                res.json(err);
            } else {
                res.redirect('/')
            }
        });
    })
}

controller.editar = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM admin WHERE idusuario = ?', [id], (err, admin) => {
            res.render('adminEditar', {
                data: admin[0]
            })
        });
    })
}

controller.modificar = (req, res) => {
    const { id } = req.params;
    const newAdmin = req.body;

    req.getConnection((err, conn) => {
        conn.query('UPDATE admin SET ? WHERE idusuario = ?', [newAdmin, id], (err, rows) => {
        if (err) {
            res.json(err);
        } else {
            res.redirect('/')
        }
    });
    });
}

controller.eliminar = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM admin WHERE idusuario = ?', [id], (err, rows) => {
            if (err) {
                res.json(err);
            } else {
                res.redirect('/');
            }
        });
    })
}

controller.listar = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM admin', (err, admins) => {
            if (err) {
                res.json(err);
            }
            res.render('GestorAdmin', {
                data: admins
            });
        });
    })
}



module.exports = controller;