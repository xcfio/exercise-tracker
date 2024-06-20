import express from "express"
import cors from "cors"
import form from "./form"

const app = express().use(cors())

app.get("/", form)
app.listen(3000, () => console.log("Server is running"))
