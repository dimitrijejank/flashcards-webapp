"use client";
import Image from "next/image";
import { useEffect,useState } from "react";
import { mockDecks,mockSubjects } from "@/mock/data";
import { FullDeckDto, FullSubjectDto } from "@/shared/types";
import Link from "next/link";
import Card from "./Card";
import Sidebar from "./Sidebar";

type Props = { subjects: FullSubjectDto[] };

export default function DeckBrowser({ subjects }: Props) {
    const [decks, setDecks] = useState<FullDeckDto[]>(mockDecks);
    const [search, setSearch] = useState("");
    const [subjectId, setSubjectId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        //console.log(search)
        setLoading(true);
        let data = mockDecks;
        if (subjectId !== null) data = data.filter(d => d.subject.id === subjectId);
        if (search.trim())
            data = data.filter(d => d.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
        setDecks(data);
        setLoading(false);
    }, [subjectId,search]);

    return (
        <div className="mx-auto max-w-7x1 px-4 py-8">
            <div className="flex flex-col gap-8 md:flex-row">
                {/* Sidebar */}
                <Sidebar search={search} setSearch={setSearch} subjectId={subjectId} setSubjectId={setSubjectId} subjects={subjects}/>
                {/* Cards */}
                <section className="flex-1">
                    {decks.length === 0 ? (
                        <p className="text-center text-gray-500">
                            Nema spilova za dati filter.
                        </p>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gird-cols-4">
                        {decks.map((deck, idx) => (
                            <Card deck={deck} subjects={subjects} key={deck.id} />
                        ))}
                    </div>
                    )} 
                </section>
            </div>
        </div>
    );
}