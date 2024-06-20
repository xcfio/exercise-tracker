import { Request, Response } from "express"
import { UUID } from "node:crypto"
import sql from "./sql"

export async function set_exercise(req: Request, res: Response) {
    try {
        const { _id } = req.params
        const { description, duration, date } = req.body

        const [exercise] = await sql<
            Array<{ id: UUID; user_id: UUID; description: string; duration: number; date: Date }>
        >`
            insert into exercises (user_id, description, duration, date) 
            values (${_id}, ${description}, ${duration}, ${date}) 
            returning *
        `

        const [user] = await sql<Array<{ username: string; id: UUID }>>`select * from users where id = ${_id}`
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
