import DeckBrowser from "./components/DeckBrowser";
import { FullSubjectDto } from "@/shared/types";

export default async function Home() {
  const res = await fetch(`${process.env.API_URL}/api/subjects`, {
    cache:"no-store",
  });
  const subjects = (await res.json()) as FullSubjectDto[];
  
  return <DeckBrowser subjects={subjects}/>
}
