export const GET:(request: Request) => Promise<Response> =
    async (request: Request) => {
        return Response.json({message:"Hello"})
    }