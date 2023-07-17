import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import hotelsService from "@/services/hotels-service";

async function getHotels(req: AuthenticatedRequest, res: Response) {

    const { userId } = req;

    try {
        const hotels = await hotelsService.getHotels(userId);
        return res.status(httpStatus.OK).send(hotels);

    } catch (error) {
        if (error.name === 'NotFoundError') {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        if (error.name === 'PaymentRequiredError') {
            return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }

}

async function getHotelById(req: AuthenticatedRequest, res: Response) {

    const { userId } = req;
    const hotelId = parseInt(req.params.hotelId);

    try {
        const hotel = await hotelsService.getHotelById(hotelId, userId);
        return res.status(httpStatus.OK).send(hotel);

    } catch (error) {

        if (error.name === 'NotFoundError') {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        if (error.name === 'PaymentRequiredError') {
            return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

const hotelsControllers = {
    getHotels,
    getHotelById
}

export default hotelsControllers