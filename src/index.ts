import { urlencoded } from "express"
import { create_user } from "./create-user"
import { get_user } from "./get-users"
import { form } from "./form"
import express from "express"
import cors from "cors"
import { set_exercise } from "./set-exercise"

const app = express().use(cors())

app.post("/api/users", urlencoded(), create_user)
app.get("/api/users", get_user)

app.post("/api/users/:_id/exercises", urlencoded(), set_exercise)

app.get("/", form)
app.listen(3000, () => console.log("Server is running"))
