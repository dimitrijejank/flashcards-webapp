import bcrypt from "bcrypt";
import "dotenv/config";
import { db } from "./index";
import { decks, flashCards, subjects, users } from "./schema";

const SUBJECT_IDS = {
  MAT1: "00000000-0000-0000-0000-000000000101",
  ECO: "00000000-0000-0000-0000-000000000102",
  MNG: "00000000-0000-0000-0000-000000000103",
  OIKT: "00000000-0000-0000-0000-000000000104",
  PSI: "00000000-0000-0000-0000-000000000105",
  SOC: "00000000-0000-0000-0000-000000000106",
  MKT: "00000000-0000-0000-0000-000000000107",
  OOR: "00000000-0000-0000-0000-000000000108",
  UIS: "00000000-0000-0000-0000-000000000109",
} as const;

const DECK_IDS = {
  ECO: "00000000-0000-0000-0000-000000000201",
  MNG: "00000000-0000-0000-0000-000000000202",
} as const;

const CARD_IDS = {
  // Ekonomija
  C1: "00000000-0000-0000-0000-000000001001",
  C2: "00000000-0000-0000-0000-000000001002",
  C3: "00000000-0000-0000-0000-000000001003",
  C4: "00000000-0000-0000-0000-000000001004",
  C5: "00000000-0000-0000-0000-000000001005",
  C6: "00000000-0000-0000-0000-000000001006",
  C7: "00000000-0000-0000-0000-000000001007",
  C8: "00000000-0000-0000-0000-000000001008",
  C9: "00000000-0000-0000-0000-000000001009",
  C10: "00000000-0000-0000-0000-000000001010",

  // Menadžment
  C11: "00000000-0000-0000-0000-000000001011",
  C12: "00000000-0000-0000-0000-000000001012",
  C13: "00000000-0000-0000-0000-000000001013",
  C14: "00000000-0000-0000-0000-000000001014",
  C15: "00000000-0000-0000-0000-000000001015",
  C16: "00000000-0000-0000-0000-000000001016",
  C17: "00000000-0000-0000-0000-000000001017",
  C18: "00000000-0000-0000-0000-000000001018",
  C19: "00000000-0000-0000-0000-000000001019",
  C20: "00000000-0000-0000-0000-000000001020",
} as const;

const hash = await bcrypt.hash("1233", 10);

await db.transaction(async (tx) => {
  await tx
    .insert(users)
    .values([
      {
        id: "7a0a1e00-9651-4071-86b8-ed32dba35bf2",
        name: "Nikola Tesla",
        email: "tesla@gmail.com",
        passHash: hash,
      },
      {
        id: "7a0a1e00-9651-4071-86b8-ed32dba35bf3",
        name: "Petar Petrović",
        email: "petrovic@gmail.com",
        passHash: hash,
      },
      {
        id: "7a0a1e00-9651-4071-86b8-ed32dba35bf4",
        name: "Novak Đoković",
        email: "djokovic@gmail.com",
        passHash: hash,
      },
    ])
    .onConflictDoNothing();

  await tx
    .insert(subjects)
    .values([
      { id: SUBJECT_IDS.MAT1, name: "Matematika 1" },
      { id: SUBJECT_IDS.ECO, name: "Ekonomija" },
      { id: SUBJECT_IDS.MNG, name: "Menadžment" },
      { id: SUBJECT_IDS.OIKT, name: "OIKT" },
      { id: SUBJECT_IDS.PSI, name: "Psihologija" },
      { id: SUBJECT_IDS.SOC, name: "Sociologija" },
      { id: SUBJECT_IDS.MKT, name: "Marketing" },
      { id: SUBJECT_IDS.OOR, name: "Osnovi organizacije" },
      { id: SUBJECT_IDS.UIS, name: "UIS" },
    ])
    .onConflictDoNothing();

  await tx
    .insert(decks)
    .values([
      {
        id: DECK_IDS.ECO,
        name: "Osnovi ekonomije",
        subjectId: SUBJECT_IDS.ECO,
      },
      {
        id: DECK_IDS.MNG,
        name: "Osnove menadžmenta",
        subjectId: SUBJECT_IDS.MNG,
      },
    ])
    .onConflictDoNothing();

  await tx
    .insert(flashCards)
    .values([
      {
        id: CARD_IDS.C1,
        front: "Šta je ponuda?",
        back: "Količina dobara koju proizvođači žele i mogu da prodaju po datoj ceni.",
        deckId: DECK_IDS.ECO,
      },
      {
        id: CARD_IDS.C2,
        front: "Šta prikazuje kriva potražnje?",
        back: "Odnos cene i tražene količine za proizvod.",
        deckId: DECK_IDS.ECO,
      },
      {
        id: CARD_IDS.C3,
        front: "Osnovna funkcija tržišta?",
        back: "Efikasna alokacija resursa kroz ponudu i potražnju.",
        deckId: DECK_IDS.ECO,
      },
      {
        id: CARD_IDS.C4,
        front: "Definicija BDP-a?",
        back: "Bruto domaći proizvod – vrednost svih finalnih dobara i usluga u zemlji tokom godine.",
        deckId: DECK_IDS.ECO,
      },
      {
        id: CARD_IDS.C5,
        front: "Šta je inflacija?",
        back: "Opšti i kontinuirani rast nivoa cena.",
        deckId: DECK_IDS.ECO,
      },
      {
        id: CARD_IDS.C6,
        front: "'Nevidljiva ruka'?",
        back: "Metafora Adama Smitha za samoregulišuće tržište.",
        deckId: DECK_IDS.ECO,
      },
      {
        id: CARD_IDS.C7,
        front: "Oportunitetni trošak?",
        back: "Vrednost najbolje propuštene alternative.",
        deckId: DECK_IDS.ECO,
      },
      {
        id: CARD_IDS.C8,
        front: "Kad nastaje budžetski deficit?",
        back: "Kad državna potrošnja premaši prihode.",
        deckId: DECK_IDS.ECO,
      },
      {
        id: CARD_IDS.C9,
        front: "Elastičnost potražnje meri?",
        back: "Osetljivost tražene količine na promenu cene.",
        deckId: DECK_IDS.ECO,
      },
      {
        id: CARD_IDS.C10,
        front: "Faktori proizvodnje?",
        back: "Rad, kapital, zemlja i preduzetništvo.",
        deckId: DECK_IDS.ECO,
      },
    ])
    .onConflictDoNothing();

  await tx
    .insert(flashCards)
    .values([
      {
        id: CARD_IDS.C11,
        front: "Četiri funkcije menadžmenta?",
        back: "Planiranje, organizovanje, vođenje i kontrola.",
        deckId: DECK_IDS.MNG,
      },
      {
        id: CARD_IDS.C12,
        front: "SWOT analiza?",
        back: "Snage, slabosti, prilike i pretnje.",
        deckId: DECK_IDS.MNG,
      },
      {
        id: CARD_IDS.C13,
        front: "Definicija vizije?",
        back: "Željena budućnost organizacije.",
        deckId: DECK_IDS.MNG,
      },
      {
        id: CARD_IDS.C14,
        front: "SMART cilj znači?",
        back: "Specifičan, merljiv, dostižan, relevantan, vremenski ograničen.",
        deckId: DECK_IDS.MNG,
      },
      {
        id: CARD_IDS.C15,
        front: "Teorije X i Y – autor?",
        back: "Daglas MekGregor.",
        deckId: DECK_IDS.MNG,
      },
      {
        id: CARD_IDS.C16,
        front: "Likertovi stilovi liderstva?",
        back: "Autoritarni, benevolentni, konsultativni i participativni.",
        deckId: DECK_IDS.MNG,
      },
      {
        id: CARD_IDS.C17,
        front: "Šta je delegiranje?",
        back: "Prenošenje odgovornosti i ovlašćenja na podređene.",
        deckId: DECK_IDS.MNG,
      },
      {
        id: CARD_IDS.C18,
        front: "Vrh Maslovljeve piramide?",
        back: "Samoostvarenje.",
        deckId: DECK_IDS.MNG,
      },
      {
        id: CARD_IDS.C19,
        front: "Šta je KPI?",
        back: "Ključni pokazatelj performansi.",
        deckId: DECK_IDS.MNG,
      },
      {
        id: CARD_IDS.C20,
        front: "Lean menadžment?",
        back: "Minimiziranje rasipanja i stalno unapređenje procesa.",
        deckId: DECK_IDS.MNG,
      },
    ])
    .onConflictDoNothing();
});

process.exit(0);
