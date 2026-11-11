"use client";

import { subjects } from "@/db/schema";
import { SubjectDto } from "../api/subjects/route";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type Card = { front: string, back: string};

export default function DeckCreateForm({
    subjects,
} : {
    subjects: SubjectDto[];
}) {
    const router = useRouter();
    const [subjectId, setSubjectId] = useState<string | "">("");
    const [name, setName] = useState("");
    const [cards, setCards] = useState<Card[]>([{front: "", back: ""}]);
    const [err,setErr] = useState("");

    const addCard = () => {
        if (cards.length >= 300) return;
        setCards([...cards, {front: "", back: ""}]);
    };

    const updateCard = (i: number, field: "front" | "back", value: string) => {
        const copy = [...cards];
        copy[i][field] = value;
        setCards(copy);
    };
    
    const removeCard = (i: number) => {
        const copy = [...cards];
        copy.splice(i,1);
        setCards(copy);
    }

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        setErr("");

        if(!name.trim() || subjectId === "") {
            setErr("Popunite naziv spila i predmet.");
            return;
        }

        const trimmed = cards
            .map((c) => ({front: c.front.trim(), back: c.back.trim()}))
            .filter((c) => c.front && c.back);

        if (trimmed.length === 0) {
            setErr("Morate dodati makar jednu karticu");
            return;
        }

        const res = await fetch("api/decks", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: name.trim(),
                subjectId: subjectId,
                cards: trimmed,
            }),
        });

        if (!res.ok) {
            setErr(await res.text());
            return;
        }
        router.push("/");
    };

    return (
        <form onSubmit={submit} className="space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-900">Naziv spila</label>
                    <input 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-2 w-full rounded border border-gray-300 px-3 py-2"
                        maxLength={150}
                        required 
                    />
                </div>
                <div className="sm:w-64">
                    <label className="block text-sm font-medium text-gray-900">Predmet</label>
                    <select
                        value={subjectId}
                        onChange={(e) => setSubjectId(e.target.value === "" ? "" : e.target.value)}
                        className="mt-2 w-full rounded border border-gray-300 px-3 py-2"
                        required
                    >
                        <option value="">-odaberite predmet-</option>
                        {subjects.map((s) => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="space-6-y">
                {cards.map((card, i) => (
                    <div key={i} className="rounded border border-gray-200 p-4">
                        <div className="mb-2 flex items-center justify-between">
                            <h4 className="font-medium">Karitca {i + 1}</h4>
                            <button type="button"
                                onClick={() => removeCard(i)}
                                className="text-sm text-red-500 hover: underline"    
                            >
                                Obrisi
                            </button>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <textarea 
                                placeholder="Pitanje / pojam..."
                                value={card.front}
                                onChange={(e) => updateCard(i, "front", e.target.value)}
                                className="h-24 w-full rounded border border-gray-300 p-2"
                            />
                            <textarea
                                placeholder="Odgovor / definicija..."
                                value={card.back}
                                onChange={(e) => updateCard(i, "back", e.target.value)}
                                className="h-24 w-full rounded border border-gray-300 p-2"
                            />
                        </div>
                    </div>
                ))}
                <div className="text-right">
                    <button 
                        type="button" 
                        onClick={addCard} 
                        disabled={cards.length >= 300}
                        className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
                    >
                        + Dodaj karticu ({cards.length}/300)
                    </button>
                </div>
            </div>
                
            {err && <p className="text-sm text-red-600">{err}</p>}
                <button
                    type="submit"
                    className="rounded bg-indigo-600 px-6 py-2 font-medium text-white hover:bg-indigo-700"
                    >
                        Sacuvaj spil
                </button>
        </form>
    );
}