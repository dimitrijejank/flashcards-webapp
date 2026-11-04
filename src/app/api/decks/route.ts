import { db } from "@/db";
import { decks, subjects, flashCards } from "@/db/schema";
import { AUTH_COOKIE,verifyAuthToken } from "@/lib/auth";
import { eq, isNull } from "drizzle-orm";
import { cookies } from "next/headers";

export interface DeckDto {
    id: string;
    name: string;
    subjectId: string;
}


export const GET = async(req: Request) => {

    const { searchParams } = new URL(req.url);
    const subjectId = searchParams.get("subjectId");

    const whereClause = subjectId   
        ? eq(decks.subjectId, subjectId)
        : isNull(decks.subjectId);

    const data: DeckDto[] = await db
        .select({
            id: decks.id,
            name: decks.name,
            subjectId: decks.subjectId
        })    
        .from(decks)
        .where(subjectId ? whereClause : undefined)
        .orderBy(decks.name);
    return Response.json(data);

};

export const POST = async(req: Request) => {
    const token = (await cookies()).get(AUTH_COOKIE)?.value;
    if(!token){
        return new Response("Niste prijavljeni.", {status: 401});
    }
    try {
        verifyAuthToken(token);
    } catch {
        return new Response("Sesija je istekla ili je nevazeca.", { status: 401});
    }
    
    const body = await req.json();
    const {
        name,
        subjectId,
        cards,
    } : {
        name: string;
        subjectId: string;
        cards: { front: string; back: string }[];
    } = body;
    
    const [deck] = await db
        .insert(decks)
        .values({name, subjectId})
        .returning({id: decks.id});
    
    if (!deck)
            return new Response("Greska pri pravljenju spila", {status: 500});

    await db.insert(flashCards).values(
        cards.map((card) => ({
            front: card.front,
            back: card.back,
            deckId: deck.id,
        })),
    );
    return new Response("OK");
};