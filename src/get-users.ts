import { Request, Response } from "express"
import { UUID } from "node:crypto"
import sql from "./sql"

export async function get_user(req: Request, res: Response) {
    try {
        const users = await sql<Array<{ username: string; id: UUID }>>`select * from users`
        res.json(users.map((user) => ({ _id: user.id, username: user.username })))
    } catch (err) {
        res.sendStatus(500)
    }
}
