import { create_user, form, get_exercise, get_user, set_exercise } from "./controllers"
import { urlencoded } from "express"
import express from "express"
import cors from "cors"

const app = express().use(cors())

app.post("/api/users", urlencoded(), create_user)
app.get("/api/users", get_user)

app.post("/api/users/:_id/exercises", urlencoded(), set_exercise)
app.get("/users/:_id/logs", get_exercise)

app.get("/", form)
app.listen(3000, () => console.log("Server is running"))
