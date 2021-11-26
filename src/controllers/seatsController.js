import * as seatService from "../services/seatsService.js"

const getSeats = async (req, res) => {
    const session = await seatService.handleSessionsSeats(req);

    if(!session){
        return res.sendStatus(404)
    }

    return res.send(session)
}

const nothing = () => Number('1');

export {
    getSeats,
    nothing,
}