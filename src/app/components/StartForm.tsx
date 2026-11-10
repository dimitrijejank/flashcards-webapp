"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, use, useState } from "react";

type Props = {
    deckId: string;
    cardsCount: number;
};

export const StartForm = ({deckId,cardsCount}: Props) => {
    const defaultNum = Math.min(20,cardsCount);
    const [num, setNum] = useState(defaultNum);
    const [useAll, setUseAll] = useState(false);
    const [secsPerCard, setSecsPerCard] = useState(45);
    const router = useRouter();    

    const start = (e: FormEvent) => {
        e.preventDefault();

        const realN = useAll ? 0 : num;
        const totalSec = (useAll ? cardsCount : num) * secsPerCard;
        const totalMin = Math.max(1, Math.ceil(totalSec/60));
        const params = new URLSearchParams();
        if(realN > 0) params.set("cardCount", String(realN));
        params.set("minutes", String(totalMin));

        router.push(`/decks/${deckId}/practitce?${params.toString()}`);
    };

    return (
        <form onSubmit={start} className="space-y-5">
            <div className="flex flex-col gap-2">
                <label className="font-medium">Broj kartica</label>
                <div className="flex items-center gap-3">
                    <input 
                        type="number"
                        min={1}
                        max={cardsCount}
                        disabled={useAll}
                        value={num}
                        onChange={(e) => setNum(Number(e.target.value))}
                        className="w-24 rounded border px-3 py-2 disabled:opacity-50"    
                    />
                    <button
                        type="button"
                        onClick={() => setUseAll(!useAll)}
                        className="rounded cursor-pointer bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700" 
                    >
                        {useAll ? "Koristi unos": "Zelim sve"}
                    </button>
                </div>
                <p className="text-sm text-gray-500">
                    Maks: {cardsCount} | Podrazumevano: {defaultNum}
                </p>
            </div>

            <div className="flex flex-col gap-1">
                <label className="font-medum">Vreme po kartici (sekunde)</label>
                <input 
                    type="number"
                    min={10}
                    value={secsPerCard}
                    onChange={(e) => setSecsPerCard(Number(e.target.value))}
                    className="w-24 rounded-border px-3 py-2"
                />
            </div>

            <div className={"space-x-2"}>
                <button className="rounded cursor-pointer bg-indigo-600 px-6 py-2 text-white font-medium hover:bg-indigo-700">
                    Zapocni vezbu
                </button>

                <button
                    className="rounded cursor-pointer bg-red-500 px-6 py-2 text-white font-medium hover:bg-red-600">
                    <Link   
                        href={"/"}
                        className="rounded cursor pointer text-white px-6 py-2 font-medium"
                    >
                        Odusatni
                    </Link>
                </button>
                
            </div>
        </form>
    );
};