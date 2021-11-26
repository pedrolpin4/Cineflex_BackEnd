import * as seatService from "../services/seatsService.js"
import buyerValidation from "../validations/joiValidations.js";
import connection from "../database.js"

const getSeats = async (req, res) => {
    try {
        const session = await seatService.handleSessionsSeats(req);
        if(!session){
            return res.sendStatus(404)
        }
        return res.send(session)
    } catch(error) {
        return res.sendStatus(500)
    }
}

const bookSeats = async (req, res) => {
    const {
        buyers,
    } = req.body;

    if(!buyers.length){
        return res.sendStatus(400)
    }

    const result = await connection.query('SELECT * FROM session_seats')

    const seats = result.rows.map(seat => seat.id);

    let seatIdError;

    const ids = buyers.map(buyer => buyer.id)

    let seatsQuery = 'UPDATE session_seats SET is_selected = true WHERE ';

    ids.forEach((id, i) => {

        if(!seats.includes(id)){
            seatIdError = "It looks like this seat id is not available"
            return;
        }

        if(i === buyers.length - 1){
            seatsQuery += `id = ${id};`;
            return;
        }

        seatsQuery += `id = ${id} OR`;
    });

    let validationError;

    let buyersQuery = 'INSERT INTO buyers_info (name, cpf, seat_id) VALUES '

    buyers.forEach((buyer, i) => {
        if(buyerValidation.validate(buyer).error) {
            validationError = buyerValidation.validate(buyer).error.details[0].message;
            return;
        }

        if(i === buyers.length - 1){
            buyersQuery += `('${buyer.name}', '${buyer.cpf}', '${buyer.id}');`
            return;
        }

        buyersQuery += `('${buyer.name}', '${buyer.cpf}', ${buyer.id}), `
    })

    if(seatIdError){
        return res.sendStatus(404)
    }

    if(validationError){
        return res.sendStatus(400)
    }

    try {
        await connection.query(buyersQuery)
        await connection.query(seatsQuery);
        return res.sendStatus(201);
    } catch (error) {
        return res.sendStatus(500)
    }
}

export {
    getSeats,
    bookSeats,
}