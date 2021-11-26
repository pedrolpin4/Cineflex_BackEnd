import dayjs from "dayjs";
import connection from "../database.js"

const getSeats = async (req, res) => {
    const {
        id
    } = req.params;

    const result = await connection.query(`SELECT session_seats.*, movies_info.title, movies_info.image,  
        movie_sessions.hour, movie_sessions.movie_id FROM session_seats 
        JOIN movie_sessions ON session_seats.session_id = movie_sessions.id
        JOIN movies_info ON movies_info.id = movie_sessions.movie_id
        WHERE session_seats.session_id = $1`, [id]);

    if(!result.rowCount){
        return res.sendStatus(404);
    }

    const session = result.rows;

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

    return res.status(200).send(sessionInfo);
}

const nothing = () => Number('1');

export {
    getSeats,
    nothing,
}