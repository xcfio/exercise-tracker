import { UUID } from "node:crypto"

export type exercise = {
    id: UUID
    user_id: Pick<user, "id">
    description: string
    duration: number
    date: Date
}

export type user = {
    username: string
    id: UUID
}
