import { Kysely, MysqlDialect } from "kysely";
import { type DB } from "./model";
import { createPool } from "mysql2";
import { env } from "../env.mjs";

declare global {
  // var is required here 
  // eslint-disable-next-line no-var 
  var db: Kysely<DB>;
}

if (!global.db) {
  global.db = new Kysely<DB>({
    dialect: new MysqlDialect({
      pool: createPool(env.DATABASE_URL)
    }),
  });
}

export const db = global.db;