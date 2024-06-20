import postgres from "postgres"
import config from "./config"

export default postgres({
    host: config.host,
    database: config.database,
    username: config.username,
    password: config.password,
    ssl: config.ssl as "prefer" | "require"
})
