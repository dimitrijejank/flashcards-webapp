import {FullDeckDto, FullSubjectDto} from "@/shared/types";

export const mockSubjects: FullSubjectDto[] = [
    { id: 1, name: "Matematika 1", createdAt: new Date("2024-01-10")},
    { id: 2, name: "Ekonomija",      createdAt: new Date("2024-01-11") },
    { id: 3, name: "Menadžment",     createdAt: new Date("2024-01-12") },
    { id: 4, name: "OIKT",           createdAt: new Date("2024-01-13") },
    { id: 5, name: "Psihologija",    createdAt: new Date("2024-01-14") },
    { id: 6, name: "Marketing",      createdAt: new Date("2024-01-15") },
    { id: 7, name: "Osnovi organizacije", createdAt: new Date("2024-01-16") },
    { id: 8, name: "UIS",            createdAt: new Date("2024-01-17") },    
];

const S = (id: number) => mockSubjects.find((s) => s.id === id)!;

export const mockDecks: FullDeckDto[] = [
    {
        id: 11,
        name: "Funkcije i limiti – zbirka",
        createdAt: new Date("2024-02-01"),
        subject: S(1),
        cardsCount: 40,
    },
    {
        id: 12,
        name: "Derivacije – brzi test",
        createdAt: new Date("2024-02-03"),
        subject: S(1),
        cardsCount: 25,
    },
    {
        id: 21,
        name: "Osnovi mikroekonomije",
        createdAt: new Date("2024-02-05"),
        subject: S(2),
        cardsCount: 30,
    },
    {
        id: 22,
        name: "Makroekonomski indikatori",
        createdAt: new Date("2024-02-06"),
        subject: S(2),
        cardsCount: 22,
    },
    {
        id: 31,
        name: "4 funkcije menadžmenta",
        createdAt: new Date("2024-02-08"),
        subject: S(3),
        cardsCount: 18,
    },
];