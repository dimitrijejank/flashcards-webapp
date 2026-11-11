import DeckCreateForm from "../components/DeckCreateForm";
import { FullSubjectDto } from "@/shared/types";

export default async function CreateDeckPage() {
    const res = await fetch(`${process.env.API_URL}/api/subjects`, {
        cache: "no-store"
    });
    const subjects = (await res.json()) as FullSubjectDto[];

    return (
        <main className="mx-auto max-w-4xl px-4 py-10">
            <h1 className="mb-8 text-3xl font-bold">Napravi novi spil</h1>
            <DeckCreateForm subjects={subjects}/>
        </main>
    );
}
