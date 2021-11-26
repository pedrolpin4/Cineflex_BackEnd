import dayjs from "dayjs";
import * as seatsRepository from "../repositories/seatsRepository.js"

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

    const result = await seatsRepository.selectAllSessionSeats(id)

    if(!result.rowCount){
        return null;
    }

    const session = result.rows;

    return handleSeatsObject(session)
}

export {
    handleSessionsSeats,
}