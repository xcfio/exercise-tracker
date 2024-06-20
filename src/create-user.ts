import { Request, Response } from "express"
import { UUID } from "node:crypto"
import sql from "./sql"

export async function create_user(req: Request, res: Response) {
    try {
        const { username } = req.body

        const [user] = await sql<Array<{ username: string; id: UUID }>>`
            insert into users (username) 
            values (${username}) 
            returning *
        `

        res.json({ username: user.username, _id: user.id })
    } catch (err) {
        res.sendStatus(500)
    }
}
