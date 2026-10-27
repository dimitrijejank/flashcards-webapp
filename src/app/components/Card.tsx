interface CradProps {
    title: string;
    color: string;
}

export default function Card({title, color}: CradProps) {
    return <div className={color}>{title}</div>;
}