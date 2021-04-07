const pool = require("../utils/pool");

module.exports = class Vacations {
    id;
    destination;
    startDate;
    endDate;
    details;

    constructor(row) {
        this.id = row.id;
        this.destination = row.destination;
        this.startDate = row.start_date;
        this.endDate = row.end_date;
        this.details = row.details
    }

    static async insert({ destination, startDate, endDate, details }) {
        const { rows } = await pool.query(
            'INSERT INTO vacations (destination, start_date, end_date, details) VALUES ($1, $2, $3, $4) RETURNING *', [destination, startDate, endDate, details]
        );
        return new Vacations(rows[0]);
    }

    static async getById(id) {
        const { rows } = await pool.query(
            'SELECT * from vacations WHERE id=$1', [id]);
        return new Vacations(rows[0]);
    }


    static async getAll() {
        const { rows } = await pool.query(
            'SELECT * FROM vacations');
        return rows.map(row => new Vacations(row));
    }

}
