import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import hotelsRepository from "@/repositories/hotels-repository";
import { paymentRequiredError } from "@/errors/payment-required-error";

async function getHotels(userId: number) {

    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
    const hotel = await hotelsRepository.getHotels();

    if (!enrollment) {
        throw notFoundError();
    }

    if (!ticket) {
        throw notFoundError();
    }

    if (ticket.status === 'RESERVED' ||
        ticket.TicketType.isRemote ||
        !ticket.TicketType.includesHotel) {
        throw paymentRequiredError();
    }

    if (hotel.length === 0 || !hotel) {
        throw notFoundError()
    }

    return hotel;

}

async function getHotelById(hotelId: number, userId: number) {

    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
    const hotel = await hotelsRepository.getHotelById(hotelId);
    const rooms = await hotelsRepository.getHotelRooms(hotelId);

    if (!enrollment) {
        throw notFoundError();
    }

    if (!ticket) {
        throw notFoundError();
    }

    if (ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
        throw paymentRequiredError();
    };

    if (!hotel) {
        throw notFoundError();
    }

    const result = {
        ...hotel,
        Rooms: rooms
    };

    return result;

}

const hotelsService = {
    getHotels,
    getHotelById
};

export default hotelsService;