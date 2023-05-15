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
    res.render('graficaTotal')
}

controller.graficaMunicipio = (req, res) => {
    res.render('graficaMunicipio')
}

controller.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    });
}

module.exports = controller;