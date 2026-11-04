import { db } from "@/db";
import { subjects } from "@/db/schema";

export interface SubjectDto {
    id: string;
    name: string;
}

export async function GET(req: Request) {
    const subjectsDto = await db
        .select({
            id: subjects.id,
            name: subjects.name,
        })
        .from(subjects)
        .orderBy(subjects.name);
    return Response.json(subjectsDto);
};

