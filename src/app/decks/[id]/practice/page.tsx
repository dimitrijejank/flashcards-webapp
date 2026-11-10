import { FlashCardDto } from "@/app/api/decks/[id]/cards/route";
import PracticeClient from "@/app/components/PracticeClient";

export default async function PracticePage({
    params,
    searchParams
}: {
    params: Promise<{id: string}>;
    searchParams: Promise<{cardCount?: string; minutes?:string}>;
}) {
    const { cardCount, minutes} = await searchParams;
    const res = await fetch(
        `${process.env.API_URL}/api/decks/${(await params).id}/cards`,
        {
            cache: "no-store"
        },
    );

    const cards = (await res.json()) as FlashCardDto[];

    const limit = Number(cardCount ?? 0);
    const durationMin = Number(minutes ?? 5);
    return (
        <PracticeClient 
            deckId={(await params).id}
            cards={cards}
            limit={limit}
            duration={durationMin * 60}
        />
    );
}