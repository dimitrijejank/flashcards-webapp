import "dotenv/config";
import {users} from "./schema";
import { db } from "./index";
import bcrypt from "bcrypt";

const hash = await bcrypt.hash("1233", 10);

await db.transaction(async (tx) => {
    await tx.insert(users).values([
        {
            id: "72021e00-9651-4071-86b8-ed32dba35bf2",
            name: "Nikola Tesla",
            email: "tesla@gmail.com",
            passHash: hash,
        },
        {
            id: "72021e00-9651-4071-86b8-ed32dba35bf3",
            name: "Petar Petrovic",
            email: "petarpetrovic@gmail.com",
            passHash: hash,
        },
        {
            id: "72021e00-9651-4071-86b8-ed32dba35bf4",
            name: "Novak Djokovic",
            email: "djokovic@gmail.com",
            passHash: hash,
        },
    ]);
});

process.exit(0);