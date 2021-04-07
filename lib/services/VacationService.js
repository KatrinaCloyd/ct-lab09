const Vacations = require("../models/Vacations");
const { getImage } = require("../utils/imageAPI");

module.exports = class VacationService {

    static async new({ destination, startDate, endDate, details }) {
        const vacaImage = await getImage(destination);

        const newVacationInfo = {
            photo: vacaImage,
            destination,
            startDate,
            endDate,
            details
        };

        const newVaca = await Vacations.insert(newVacationInfo);
        return newVaca;
    }

    static async update(id, { destination, startDate, endDate, details, photo }) {
        const oldVacaInfo = await Vacations.getById(id);

        function mungeDestination(destination) {
            if (destination === null) {
                return oldVacaInfo.destination;
            } else return destination;
        };

        function mungeStartDate(startDate) {
            if (startDate === null) {
                return oldVacaInfo.startDate;
            } else return startDate;
        };

        function mungeEndDate(endDate) {
            if (endDate === null) {
                return oldVacaInfo.endDate;
            } else return endDate;
        };

        function mungeDetails(details) {
            if (details === null) {
                return oldVacaInfo.details;
            } else return details;
        };

        function mungePhoto(photo) {
            if (photo === null) {
                return oldVacaInfo.photo;
            } else return photo;
        };

        const newVacationInfo = {
            destination: mungeDestination(destination),
            startDate: mungeStartDate(startDate),
            endDate: mungeEndDate(endDate),
            details: mungeDetails(details),
            photo: mungePhoto(photo)
        };

        const newVaca = await Vacations.update(id, newVacationInfo);
        return newVaca;

    }
}
