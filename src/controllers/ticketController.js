const controller = {}

controller.mostrarTicket = (req, res) => {
    const { curp } = req.params;

    req.getConnection((err, conn) => {
        if (err) throw err;
        const query = `
        SELECT *
        FROM alumno
        WHERE curp = ?;
        `;
        conn.query(query, [curp], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            return res.status(404).send('Ticket no encontrado');
        }
        const ticket = result[0];
        res.render('ticket', { ticket });
        });
    });
};

module.exports = controller