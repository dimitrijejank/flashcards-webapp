"use client";
import Image from "next/image";
import { useEffect,useState, useMemo } from "react";
//import { mockDecks,mockSubjects } from "@/mock/data";
import { FullDeckDto, FullSubjectDto } from "@/shared/types";
import Link from "next/link";
import Card from "./Card";
import Sidebar from "./Sidebar";

const bookImgs = Array.from({ length: 18 }, (_,i) => `/books/${i + 1}.jpg`);

type Props = { subjects: FullSubjectDto[] };

export default function DeckBrowser({ subjects: subjectsProps}: Props) {
    const [decks, setDecks] = useState<FullDeckDto[]>([]);
    const [search, setSearch] = useState("");
    const [subjectId, setSubjectId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [subjects, setSubjects] = useState<FullSubjectDto[]>(subjectsProps ?? []);
    const [err,setErr] = useState<string | null>(null);

    useEffect(() => {

        const fetchDecks = async () => {
            setLoading(true);
            setErr(null);

            const qs = new URLSearchParams();
            if (subjectId) qs.set("subjectId", subjectId);
            if(search.trim()) qs.set("q", search.trim());
            
            try {
                const url = `api/decks${qs.toString() ? `?${qs.toString()}`: ""}`;
                const res = await fetch(url, { credentials: "include" });
                if(!res.ok) {
                    const msg = await res.text().catch(() => "");
                    throw new Error(msg || "Greska pri ucitavanju spilova.");
                }
                const data = await res.json();
                const list: FullDeckDto[] = Array.isArray(data)
                    ? data
                    : (data.items ?? data.data ?? []);
                setDecks(list);
            } catch(e: any) {
                setErr(e?.message ?? "Neuspelo ucitavanje.");
            } finally {
                setLoading(false);
            }
        };

        fetchDecks();
    }, [subjectId,search]);

    const subjectNameById = useMemo(() => {
        const map = new Map<string, string>();
        for(const s of subjects) map.set(s.id, s.name);
        return map;
    }, [subjects]);

    return (
        <div className="mx-auto max-w-7x1 px-4 py-8">
            <div className="flex flex-col gap-8 md:flex-row">
                {/* Sidebar */}
                <Sidebar search={search} setSearch={setSearch} subjectId={subjectId} setSubjectId={setSubjectId} subjects={subjects}/>
                {/* Cards */}
                <section className="flex-1">
                    {loading ? (
                        <p className="text-center text-gray-500">Ucitavam...</p>
                    ) : decks.length === 0 ? (
                        <p className="text-center text-gray-500">
                            Nema spilova za dati filter.
                        </p>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gird-cols-4">
                        {decks.map((deck, idx) => (
                            <Card deck={deck} subjects={subjects} booksImgs={bookImgs} key={deck.id} idx={idx} subjectNameById={subjectNameById}/>
                        ))}
                    </div>
                    )} 
                </section>
            </div>
        </div>
    );
}