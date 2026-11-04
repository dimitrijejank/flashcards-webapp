export interface FullSubjectDto {
    id: string;
    name: string;
    createdAt: Date;
}

export interface FullDeckDto {
    id: string;
    name: string;
    createdAt: Date;
    subject: {
        id: string;
        name: string;
        createdAt: Date;
    }
    cardsCount: number;
}