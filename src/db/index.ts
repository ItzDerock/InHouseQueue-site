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
      pool: createPool({
        uri: env.DATABASE_URL,
        supportBigNumbers: true,
      }),
    }),
    log: ["query"],

    // The following is good for debugging, but should not be used in production since it can potentially leak sensitive information in logs.
    // log: (event) => {
    //   if (event.level === "error") {
    //     console.error("Query failed: ", {
    //       durationMs: event.queryDurationMillis,
    //       error: event.error,
    //       sql: event.query.sql,
    //       params: event.query.parameters,
    //     });
    //   } else { // `'query'`
    //     console.log("Query executed: ", {
    //       durationMs: event.queryDurationMillis,
    //       sql: event.query.sql,
    //       params: event.query.parameters,
    //     });
    //   }
    // }
  });
}

export const db = global.db;
