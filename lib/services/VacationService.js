const Vacations = require("../models/Vacations");

module.exports = class VacationService {
    static async update(id, { destination, startDate, endDate, details }) {

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

        const newVacationInfo = {
            destination: mungeDestination(destination),
            startDate: mungeStartDate(startDate),
            endDate: mungeEndDate(endDate),
            details: mungeDetails(details)
        };

        const newVaca = await Vacations.update(id, newVacationInfo);

        return newVaca;

    }
}
