import { Request, Response } from "express"
import { user } from "../type"
import sql from "../sql"

export async function get_user(req: Request, res: Response) {
    try {
        const users = await sql<Array<user>>`select * from users`
        res.json(users.map((user) => ({ _id: user.id, username: user.username })))
    } catch (error) {
        console.trace(error)
        res.sendStatus(500)
    }
}
