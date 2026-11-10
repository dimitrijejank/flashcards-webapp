"use client";

import { FlashCardDto } from "../api/decks/[id]/cards/route";
import Link from "next/link";
import { useEffect,useMemo,useRef,useState } from "react";

type Props= {
    deckId: string;
    cards: FlashCardDto[];
    limit: number;
    duration: number;
};

export default function PracticeClient({
    deckId,
    cards,
    limit,
    duration,
}: Props) {
    const deck = useMemo(() => {
        const s= [...cards];
        for (let i = s.length - 1; i>0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [s[i], s[j]] = [s[j], s[i]];
        }
        return limit > 0 ? s.slice(0,limit) : s;
    }, [cards, limit]);

    const [step, setStep] = useState<"front" | "back" | "summary">("front");
    const [idx, setIdx] = useState(0);
    const [grades, setGrades] = useState<{ cardId: string; grade: number}[]>([]);
    const [secs, setSecs] = useState(duration);
    const card = deck[idx];
    const [motivation, setMotivation] = useState(0);

    const motivationMessage = useMemo(() => {
        if (motivation == 1) return "Nema odustajanja!";
        if (motivation == 2) return "Opet pokusavas?";
        return "Odustani";
    }, [motivation]);

    const sent = useRef(false);
    useEffect(() => {
        if (step === "summary" && !sent.current) {
            sent.current = true;
            saveAttempt();
        }
    }, [step]);

    useEffect(() => {
        if (step === "summary") return;
        if ( secs <= 0) {
            setStep("summary");
            return;
        }
        const id = setInterval(() => setSecs((s) => s - 1), 1000);
        return () => clearInterval(id);
    }, [secs, step]);

    const next = () => {
        if(idx + 1 < deck.length) {
            setIdx(idx + 1);
            setStep("front");
        } else {
            setStep("summary");
        }
    };
    const chooseGrade = (g: number) => {
        setGrades([...grades, { cardId: card.id, grade: g}]);
        next();
    };

    const saveAttempt = async () => {
        await fetch("/api/attempt", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({deckId, grades}),
        });
    };

    if(deck.length === 0) return <p className="p-8">Spil nema kartica.</p>;

    return (
        <main className="flex flex-col items-center justify-center min-h-[60vh] gap-6  p-4">
            {step !== "summary" && (
                <p className="text-sm text-gray-500">
                    Preostalo: {Math.floor(secs / 60)}:
                    {String(secs % 60).padStart(2, "0")}
                </p>
            )}

            {step !== "summary" && (
                <>
                    <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow">
                        <p className="text-center text-lg">
                            {step === "front" ? card.front : card.back}
                        </p>
                    </div>

                    {step === "front" ? (
                        <button 
                            onClick={() => setStep("back")}
                            className="rounded bg-indigo-600 px-6 py-2 font-medium text-white hover: bg-indigo-700"
                            >
                                Prikazi odgovor
                        </button>
                    ) : (
                        <div className="flex gap-3">
                            <GradeBtn color="red" onClick={() => chooseGrade(0)}>
                                Nisam znao
                            </GradeBtn>
                            <GradeBtn color="red" onClick={() => chooseGrade(0)}>
                                Delimicno
                            </GradeBtn>
                            <GradeBtn color="red" onClick={() => chooseGrade(0)}>
                                Znao sam
                            </GradeBtn>
                        </div>
                    )}
                    <div className={"items-venter flex flex-col"}>
                        <button className="rounded cursor-pointer text-gray-600 px-6 py-2 font-medium hover:text-gray-700"
                        >
                            Odustani
                        </button>

                        {motivation > 0 && (
                            <p className={"text-red-500"}>{motivationMessage}</p>
                        )}
                    </div>
                    <p className="text-sm text-gray-500">
                        Kartica {idx + 1} / {deck.length}
                    </p>
                </>
            )}

            {step === "summary" && (
                <Summary grades={grades} onSave={saveAttempt} deckId={deckId} />
            )}

        </main>
    );
}


//GradeBtn komponenta - tj funkcija 
function GradeBtn ({
    color,
    onClick,
    children,
}: {
    color: "red" | "yellow" | "green";
    onClick: () => void;
    children: React.ReactNode;
}) {
    const clr = 
        color === "red"
            ? "bg-red-500"
            : color === "yellow"
                ? "bg-yellow-500"
                : "bg-green-600";
    return (
        <button onClick={onClick} 
            className={`rounded ${clr} px-4 py-2 text-white`}
        >
            {children}
        </button>
    );
}

function Summary({
    grades,
    onSave,
    deckId,
} : {
    grades: { cardId: string; grade: number }[];
    onSave: () => Promise<void>;
    deckId: string;
}) {
    const correct = grades.filter((g) => g.grade === 2).length;
    const partial = grades.filter((g) => g.grade === 1).length;
    const wrong = grades.filter((g) => g.grade === 0).length;

    return (
        <div className="w-full max-w-md space-y-4 text-center">
            <h2 className="text-2xl font-bold">Rezultat</h2>

            <p className="text-xl">
                Tacno: <span className="text-green-600">{correct}</span> / {" "}
                {grades.length}
            </p>
            <p className="text-yellow-600">Delimicno: {partial}</p>
            <p className="text-red-500">Netacno: {wrong}</p>
            <div className="flex flex-col justify-center gap-3 pt-2">
                <Link
                    href={`/decks/${deckId}`}
                    className="rounded bg-indigo-600 px-6 py-2 font-medium text-white hover:bg-indigo-700"
                >
                    Nazad na spil
                </Link>
            </div>
        </div>
    );
}
