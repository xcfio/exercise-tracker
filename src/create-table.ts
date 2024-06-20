import sql from "./sql"

export async function create_table() {
    await sql`
        create table users (
            id uuid default gen_random_uuid() primary key,
            username varchar(255) not null
        );
    `

    await sql`
        create table exercises (
            id uuid default gen_random_uuid() primary key,
            user_id uuid references users(id),
            description text not null,
            duration integer not null,
            date date not null
        );
    `
}
