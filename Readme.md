# Build Something

Build an application using a layered architecture.

## Requirements

Create all CRRUD routes for at least one order model. Use the red, green,
refactor process.

You should have some interaction to put in your service. 
OPTIONAL for +2 pts:

* unsplash search photo 

## Rubric

* model class (1 points)
* service class (8 points)
* controller (1 points)

## PLAN
* POST add a new vacation to the list 
* GET all vacations
* GET vacation by id
* PUT update vacation info  
* DELETE to remove vacation 

* BONUS to add unsplash random photo to vacation




static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM vacations WHERE id=$1 RETURNING *', [id]);
        return new Vacations(rows[0]);
    }
    