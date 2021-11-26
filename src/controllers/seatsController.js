import * as seatService from "../services/seatsService.js"
import * as seatRepository from "../repositories/seatsRepository.js"

const getSeats = async (req, res) => {
    try {
        const session = await seatService.handleSessionsSeats(req);
        if(!session){
            return res.sendStatus(404);
        }
        return res.send(session);
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

    const ids = buyers.map(buyer => buyer.id)

    try {
        const result = await seatRepository.selectAllSeats()

        const verifySeat = seatService.validateSeat(ids, result, buyers)

        const verifyBuyer = seatService.validateBuyer(buyers)

        if(verifySeat.error === "conflict") {
            return res.sendStatus(409)
        }

        if(verifySeat.error) {
            return res.sendStatus(404)
        }

        if(verifyBuyer.error){
            return res.sendStatus(400)
        }

        await seatRepository.insertBuyerIndo(verifyBuyer.query);
        await seatRepository.updateSeatsSelection(verifySeat.query);
        return res.sendStatus(201);
    } catch (error) {
        return res.sendStatus(500);
    }
}

export {
    getSeats,
    bookSeats,
}