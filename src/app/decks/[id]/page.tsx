import { DeckDetailsDto } from "@/app/api/decks/[id]/route";
import { StartForm } from "@/app/components/StartForm";
import { Suspense } from "react";

export default async function DeckPage({
    params,
} : {
    params: Promise<{id:string}>;
}) {
    const res = await fetch(
        `${process.env.API_URL}/api/decks/${(await params).id}`,
        {
            cache: "no-store",
        },
    );
    if (!res.ok) return <p className="p-8">Spil nije pronadjen.</p>;

    const deck = (await res.json()) as DeckDetailsDto;

    return (
        <main className="max-w-xl mx-auto px-4 py-10 space-y-6">
            <h1 className="texy-3xl font-bold">{deck.name}</h1>
            <p className="text-gray-600">
                Predmet:{" "}
                <span className="font-medium">
                    {deck.subject?.name ?? "Bez predmeta"}
                </span>
            </p>
            <p className="text-gray-500">
                Ukupno kartica: <strong>{deck.cardsCount}</strong>
            </p>

            <Suspense>
                <StartForm deckId={deck.id} cardsCount={deck.cardsCount}/>
            </Suspense>
        </main>
    )
}