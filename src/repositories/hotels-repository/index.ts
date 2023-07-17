import { prisma } from "../../config";

async function getHotels() {
    return prisma.hotel.findMany();

}

async function getHotelById(id: number) {
    return prisma.hotel.findFirst({
        where: { id },
        include: { Rooms: true }
    });

}

export function getHotelRooms(hotelId: number){
    return prisma.room.findMany({
        where: {
            hotelId
        }
    })
}

const hotelRepository = {
    getHotels,
    getHotelById,
    getHotelRooms
};

export default hotelRepository;