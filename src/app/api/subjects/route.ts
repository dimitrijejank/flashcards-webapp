import { db } from "@/db";
import { subjects } from "@/db/schema";

export interface SubjectDto {
    id: string;
    name: string;
}

export const GET = async(request: Request) => {
    const subjectsDto = await db
        .select({
            id: subjects.id,
            name: subjects.name,
        })
        .from(subjects)
        .orderBy(subjects.name);
    return Response.json(subjectsDto);
};