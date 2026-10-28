import Link from "next/link";

export default function FilterBtn({
    active,
    children,
    handleClick,
}: {
    active: boolean;
    children: React.ReactNode;
    handleClick: () => void;
}) {
    
    return (
        <button className={`rounded border px-3 py-1 text-sm transition ${active
            ? "bg-indigo-700 text-amber-50"
            : "border-gray-200 hover:bg-gray-100"}`} 
            onClick={handleClick}>
            {children}
        </button>

        // <Link href={"/deck-create"} 
        //     className="inline-flex items-center justify-center rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
        //     + Napravi spil
        // </Link>
    );
}