import { db } from "@/db";
import { flashCards } from "@/db/schema";
import { eq } from "drizzle-orm";

export interface FlashCardDto {
    id: string;
    front: string;
    back: string;
}

export const GET = async (
    request: Request,
    { params }: {params: Promise<{id: string}> },
) => {
    const data : FlashCardDto[] = await db
        .select({
            id: flashCards.id,
            front: flashCards.front,
            back: flashCards.back
        })
        .from(flashCards)
        .where(eq(flashCards.deckId, (await params).id));

    return Response.json(data);
};