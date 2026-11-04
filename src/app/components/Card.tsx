import Image from "next/image"
import Link from "next/link"
import { FullDeckDto, FullSubjectDto } from "@/shared/types"

type Props = {
    deck: FullDeckDto;
    subjects: FullSubjectDto[];
    booksImgs: string[];
    idx: number;
    subjectNameById: Map<string, string>;
}

export default function Card({deck, subjects, booksImgs, idx, subjectNameById}: Props) {
    return (
        <div key={deck.id} className="group relative overflow-hidden rounded-lg border border-gray-200">
                <Image src={booksImgs[idx % booksImgs.length]}
                    alt=""
                    width={400}
                    height={300}
                    className="h-40 w-full object-cover transtion-transform duration-200 group-hover:scale-105"/>
                <div className="p-4">
                    <h3 className="font-semibold">{deck.name}</h3>
                    {deck.subject?.id && (
                        <p className="text-sm text-gray-500">
                            {subjectNameById.get(deck.subject.id)}
                        </p>
                    )}
                    
                </div>
            <Link 
                href={`/decks/${deck.id}`}
                aria-label={`Otvori spil ${deck.name}`}
                className="absolute inset-0" />
        </div>
    )
}