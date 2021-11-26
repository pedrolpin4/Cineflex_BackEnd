import dayjs from "dayjs";
import * as seatsRepository from "../repositories/seatsRepository.js";
import buyerValidation from "../validations/joiValidations.js";

const handleSeatsObject = (session) => {
    const sessionInfo = {
        movie: {
            id: session[0].movie_id,
            title: session[0].title,
            image: session[0].image,
        },
        session: {
            id: session[0].session_id,
            hour: dayjs(session[0].hour).format('HH:mm'),
            weekday: dayjs(session[0].hour).$W,
        },
        seats: [...session.map(seat => ({
            id: seat.id,
            name: seat.name,
            isSelected: seat.is_selected,
        }))],
    };

    return sessionInfo;
}

const handleSessionsSeats = async (req) => {
    const {
        id
    } = req.params;

    const result = await seatsRepository.selectAllSessionInfo(id)

    if(!result.rowCount){
        return null;
    }

    const session = result.rows;

    return handleSeatsObject(session)
}

const validateSeat = (ids, result, buyers) => {
    let seatIdError;

    const seats = result.rows.map(seat => seat.id);

    let seatsQuery = 'UPDATE session_seats SET is_selected = true WHERE ';

    ids.forEach((id, i) => {

        if(!seats.includes(id)){
            seatIdError = "It looks like this seat id is not available"
            return;
        }

        if(result.rows.find(seat => seat.id === id).is_selected){
            seatIdError = "conflict"
            return;
        }

        if(i === buyers.length - 1){
            seatsQuery += `id = ${id};`;
            return;
        }

        seatsQuery += `id = ${id} OR`;
    });

    return {
        query: seatsQuery,
        error: seatIdError,
    }
}

const validateBuyer = (buyers) => {
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

    return {
        query: buyersQuery,
        error: validationError,
    }
}

export {
    handleSessionsSeats,
    validateSeat,
    validateBuyer,
}