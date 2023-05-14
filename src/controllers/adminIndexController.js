const controller = {}


controller.iniciar = (req, res) => {
    res.render('AdminInicio');
}

controller.toAgenda = (req, res) => {
    res.render('Agendar')
}

controller.toMunicipio_CRUD = (req, res) => {
    res.render('GestorMunicipio')
}

controller.toAdmin_CRUD = (req, res) => {
    res.render('GestorAdmin')
}

controller.graficaStatus = (req, res) => {
    res.send("Aqui va la grafica del status de todos las citas")
}

controller.graficaMunicipio = (req, res) => {
    res.send("Aqui va la grafica del status de las citas por municipio")
}

controller.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    });
}

module.exports = controller;