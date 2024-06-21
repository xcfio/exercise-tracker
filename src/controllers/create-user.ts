import { Request, Response } from "express"
import { user } from "../type"
import sql from "../sql"

export async function create_user(req: Request, res: Response) {
    try {
        const { username } = req.body

        const [user] = await sql<Array<user>>`
            insert into users (username) 
            values (${username}) 
            returning *
        `

        res.json({ username: user.username, _id: user.id })
    } catch (error) {
        console.trace(error)
        res.sendStatus(500)
    }
}
