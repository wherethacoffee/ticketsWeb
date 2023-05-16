const controller = {}

controller.agregar = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO admin set ?', [data], (err, admin) => {
            if (err) {
                res.json(err);
            } else {
                res.redirect('/CRUD_admin/listar')
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
        if (err) {
            res.json(err);
        } else{
            conn.query('UPDATE admin SET ? WHERE idusuario = ?', [newAdmin, id], (err, rows) => {
                if (err) {
                    res.json(err);
                } else {
                    res.redirect('/CRUD_admin/listar')
                }
                });
        }
    });
}

controller.eliminar = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM admin WHERE idusuario = ?', [id], (err, rows) => {
            if (err) {
                res.json(err);
            } else {
                res.redirect('/CRUD_admin/listar');
            }
        });
    })
}

controller.eliminarAlumno = (req, res) => {
    const { curp } = req.params;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM alumno WHERE curp = ?', [curp], (err, rows) => {
            if (err) {
                res.json(err);
            } else {
                res.redirect('/CRUD_admin/listarAgendados');
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

//metodos para los agendados desde la vista de admin
controller.listarAgendados = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query("SELECT alumno.*, municipio.nombremunicipio FROM alumno "+
        "INNER JOIN municipio ON alumno.idmunicipio = municipio.idmunicipio", (err, agendados) => {
            if (err) {
                res.json(err);
            } else {
                res.render('Agendar', {
                    data: agendados
                })
            }
        })
    });
}

controller.listaEdicion = (req, res) => {
    const { curp } = req.params;
    data = req.body

    req.getConnection((err, conn) => {
        query = `
        SELECT alumno.*, municipio.nombremunicipio 
        FROM alumno
        INNER JOIN municipio ON alumno.idmunicipio = municipio.idmunicipio 
        WHERE alumno.curp = ?
        `;
        conn.query(query, [curp], (err, agendados) => {
            if (err) {
                res.json(err);
            } else {
                console.log(agendados);
                const resultado = agendados[0];
                res.render("citasEditar", {resultado})
            }
        })
    });
}


controller.actualizarStatus = (req, res) => {
    const { curp } = req.params;

    req.getConnection((err, conn) => {
        if (err) {
            res.json(err);
        } else {
            conn.query('UPDATE alumno SET Status = ? WHERE curp = ?', ['Realizado', curp], (err, rows) => {
                if (err) {
                    res.json(err);
                } else {
                    res.redirect('/CRUD_admin/listarAgendados')
                }
            });
        }
    });
}


controller.actualizarCompleto = (req, res) => {
    const { curp } = req.params;
    const data = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            res.json(err);
        } else {
            conn.query('UPDATE alumno SET ? WHERE curp = ?', [ data , data.curp], (err, rows) => {
                if (err) {
                    res.json(err);
                } else {
                    res.redirect('/')
                }
            });
        }
    });
}


controller.eliminarAgendado = (req, res) => {
    const { curp } = req.params;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM admin WHERE idusuario = ?', [curp], (err, rows) => {
            if (err) {
                res.json(err);
            } else {
                res.redirect('/CRUD_admin/listarAgendados')
            }
        });
    })
}


//Rellenado de graficas con datos

controller.listarStatusTotales = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM status_total", (err, status) => {
            if (err) {
                res.json(err);
            } else {
                const labels = [];
                const data = [];

                status.forEach((status) => {
                    labels.push(status.status);
                    data.push(status.total);
                });

                res.render('graficaTotal', {
                    labels: labels,
                    data: data
                })
            }
        })
    });
}

controller.listarMunicipios = (req, res) =>{
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM municipio', (err, municipios) => {
        if(err){
            res.json(err);
        }
        console.log(municipios)
        res.render('selectMunicipio', {
            data: municipios
        })
        })
    })
}

controller.graficarStatusMunicipio = (req, res) => {
    const { nombremunicipio } = req.query
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM status_municipio WHERE nombremunicipio= ?", [nombremunicipio],(err, status) => {
            if (err) {
                res.json(err);
            } else {
                const labels = [];
                const datos = [];

                status.forEach((status) => {
                    labels.push(status.status);
                    datos.push(status.total);
                });

                res.render('graficaMunicipio', {
                    labels: labels,
                    data: datos
                })
            }
        })
    });
}


module.exports = controller;