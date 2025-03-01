#! /usr/bin/env node
const { Client } = require("pg");
require("dotenv").config();

const { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } = process.env;

const client = new Client({
  user: PGUSER,
  password: PGPASSWORD,
  host: PGHOST,
  port: PGPORT,
  database: PGDATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
});

/*CUSTOM DB LOGIC - based on App reqs*/
/* Session / Auth requirements
https://github.com/voxpelli/node-connect-pg-simple/blob/HEAD/table.sql
*/
const query = `
  CREATE TABLE IF NOT EXISTS "session" (
    "sid" VARCHAR NOT NULL COLLATE "default",
    "sess" JSON NOT NULL,
    "expire" TIMESTAMP(6) NOT NULL,
    PRIMARY KEY ("sid")
  );

  CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");

  CREATE TABLE IF NOT EXISTS "users_and_passwords" (
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "fullname" VARCHAR(255) NOT NULL,
  "membership_status" VARCHAR NOT NULL,
  "username" VARCHAR(255) NOT NULL UNIQUE,
  "hash" VARCHAR NOT NULL,
  "salt" VARCHAR
  );

  CREATE INDEX IF NOT EXISTS "idx_username" ON "users_and_passwords" ("username");

  CREATE TABLE IF NOT EXISTS "messages" (
  "message_id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "message_content" VARCHAR NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "user_id" INTEGER,
  CONSTRAINT fk_user
    FOREIGN KEY (user_id)
      REFERENCES users_and_passwords(id)
        ON DELETE CASCADE
  );
`;

/*TODO:
  Learn how to make ENUM types so that fields like membership_status can only be a set value belonging to an array 
*/

async function start() {
  console.log("seeding");
  try {
    await client.connect();
    await client.query(query);
    console.log("done");
  } catch (err) {
    console.log("Seeding failed: " + err);
  } finally {
    await client.end();
  }
}

start();
