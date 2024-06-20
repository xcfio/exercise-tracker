import { Request, Response } from "express"
import { exercise, user } from "../type"
import sql from "../sql"

export async function set_exercise(req: Request, res: Response) {
    try {
        const { _id } = req.params
        const { description, duration, date } = req.body

        const [exercise] = await sql<Array<exercise>>`
            insert into exercises (user_id, description, duration, date) 
            values (${_id}, ${description}, ${duration}, ${date}) 
            returning *
        `

        const [user] = await sql<Array<user>>`select * from users where id = ${_id}`
        res.json({
            _id: user.id,
            username: user.username,
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date.toDateString()
        })
    } catch (err) {
        res.sendStatus(500)
    }
}
