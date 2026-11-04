import { db } from "@/db";
import {decks,subjects,flashCards} from "@/db/schema";
import {eq, sql} from "drizzle-orm";
import { NextRequest } from "next/server";

export interface DeckDetailsDto {
    id: string;
    name: string;
    createdAt: Date| null;
    subject: {
        id: string | null;
        name: string | null;
        createdAt: Date | null;
    };
    cardsCount: number;
}

export const GET = async(
    _req: NextRequest,
    { params }: { params: Promise<{id: string}> },
) => {
    const deckId = (await params).id;

    const [row] = await db
        .select({
            id: decks.id,
            name: decks.name,
            createdAt: decks.createdAt,
            subjectId: subjects.id,
            subjectName: subjects.name,
            subjectCreatedAt: subjects.createdAt,
            cardsCount: sql<number>`count(${flashCards.id})`.as("cards_count"),
        })
        .from(decks)
        .leftJoin(subjects, eq(decks.subjectId, subjects.id))
        .leftJoin(flashCards, eq(flashCards.deckId, decks.id))
        .where(eq(decks.id, deckId))
        .groupBy(decks.id, subjects.id)
        .limit(1);

    if(!row) return new Response("Deck not found.", {status: 404});

    const dto: DeckDetailsDto = {
        id: row.id,
        name: row.name,
        createdAt: row.createdAt,
        subject: {
            id: row.subjectId,
            name: row.subjectName,
            createdAt: row.subjectCreatedAt,
        },
        cardsCount: Number(row.cardsCount),
    };

    return Response.json(dto);
};