const controller = {}


controller.iniciar = (req, res) => {
    res.render('AdminInicio');
}

controller.toAgenda = (req, res) => {
    res.redirect('/CRUD_admin/listarAgendados')
}

controller.toMunicipio_CRUD = (req, res) => {
    res.redirect('/municipio/listar')
}

controller.toAdmin_CRUD = (req, res) => {
    res.redirect('/CRUD_admin/listar')
}

controller.graficaStatus = (req, res) => {
    res.redirect('/CRUD_admin/listarTotal')
}

controller.graficaMunicipio = (req, res) => {
    res.redirect('/CRUD_admin/listarMunicipio')
}

controller.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    });
}

module.exports = controller;