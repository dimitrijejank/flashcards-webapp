import DeckBrowser from "./components/DeckBrowser";
import { mockSubjects } from "@/mock/data";

export default function Home() {
  const subjects = mockSubjects;
  return <DeckBrowser subjects={subjects}/>
}
