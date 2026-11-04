import { db } from "@/db";
import { attempts,attemptCards,decks } from "@/db/schema";
import { AUTH_COOKIE, verifyAuthToken } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";
import { cookies } from "next/headers";

export interface AttemptDto {
    id: string;
    attemptedAt: Date | null;
    deck: {
        id: string;
        name: string | null;
    }
}

export const GET = async() => {
    const token = (await cookies()).get(AUTH_COOKIE)?.value;
    if (!token) {
        return new Response("Niste prijavljeni.", { status: 401 });
    }

    let userId: string;
    try {
        userId = verifyAuthToken(token).sub;
    } catch {
        return new Response("Sesija je istekla ili je nevazeca.", { status: 401 });
    }

    const rows = await db
        .select({
            id: attempts.id,
            attemptedAt: attempts.attemptedAt,
            deckId: attempts.deckId,
            deckName: decks.name,
        })
        .from(attempts)
        .leftJoin(decks, eq(attempts.deckId, decks.id))
        .where(eq(attempts.userId, userId))
        .orderBy(desc(attempts.attemptedAt));

    const dto: AttemptDto[] = rows.map((row) => ({
        id: row.id,
        attemptedAt: row.attemptedAt,
        deck: {
            id: row.deckId,
            name: row.deckName,
        },
    }));

    return Response.json(dto);
}

export const POST = async(req:Request) => {
    const token = (await cookies()).get(AUTH_COOKIE)?.value;
    if (!token) {
        return new Response("Niste prijavljeni.", { status: 401 });
    }

    let userId: string;
    try {
        userId = verifyAuthToken(token).sub;
    } catch {
        return new Response("Sesija je istekla ili je nevazeca.", { status: 401 });
    }

    const body = await req.json();

    const {
        deckId,
        grades,
    } : { deckId: string, grades: { cardId: string, grade: number }[] } = body;

    const [attempt] = await db
        .insert(attempts)
        .values({deckId, userId, attemptedAt: new Date() })
        .returning({id: attempts.id});

    await db.insert(attemptCards).values(
        grades.map((g) => ({
            attemptId: attempt.id,
            cardId: g.cardId,
            grade: g.grade,
        })),
    );

    return Response.json({message: "OK"});
};