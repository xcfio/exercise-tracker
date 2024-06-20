import { Request, Response } from "express"
import { exercise, user } from "../type"
import sql from "../sql"

export async function get_exercise(req: Request, res: Response) {
    try {
        const { _id } = req.params
        const { from, to, limit } = req.query

        let query = sql`select * from exercises where user_id = ${_id}`
        if (from) query = sql`${query} and date >= ${new Date(from as string).toISOString()}`
        if (to) query = sql`${query} and date <= ${new Date(to as string).toISOString()}`
        if (limit) query = sql`${query} limit ${parseInt(limit as string, 10)}`

        const exercises = (await query) as unknown as Array<exercise>

        const [user] = await sql<Array<user>>`select * from users where id = ${_id}`

        res.json({
            _id: user.id,
            username: user.username,
            from,
            to,
            limit,
            count: exercises.length,
            log: exercises.map((exercise) => ({
                description: exercise.description,
                duration: exercise.duration,
                date: exercise.date.toDateString()
            }))
        })
    } catch (error) {
        res.sendStatus(500)
    }
}
