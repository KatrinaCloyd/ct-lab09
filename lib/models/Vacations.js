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

    static async update(id, newVaca) {
        const { rows } = await pool.query(
            'UPDATE vacations SET destination=$1, start_date=$2, end_date=$3, details=$4 WHERE id=$5 RETURNING *', [newVaca.destination, newVaca.startDate, newVaca.endDate, newVaca.details, id]);
        return new Vacations(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM vacations WHERE id=$1 RETURNING *', [id]);
        return new Vacations(rows[0]);
    }

}
