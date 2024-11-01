import { Server, Request, Response } from "miragejs";

export function teamFakeApi(server: Server) {
    // Fetch all teams
    server.get('/teams', (schema) => schema.teams.all());

    // Create a new team
    server.post('/teams', (schema, request: Request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.teams.create(attrs);
    });

    // Get a specific team by ID
    server.get('/teams/:id', (schema, request: Request) => {
        const teamId = request.params.id;
        return schema.teams.find(teamId);
    });

    // Add a user to a team
    server.post('/teams/:id/add-user', (schema, request: Request) => {
        const teamId = request.params.id;
        const { userId } = JSON.parse(request.requestBody);
        const team = schema.teams.find(teamId);
        const user = schema.users.find(userId);

        if (team && user) {
            team.users.add(user);
            return team;
        }
        return new Response(404, {}, { error: "Team or user not found" });
    });

    // Approve a user to join a team
    server.post('/teams/:id/approve-user', (schema, request: Request) => {
        const teamId = request.params.id;
        const { userId } = JSON.parse(request.requestBody);
        const team = schema.teams.find(teamId);
        const user = schema.users.find(userId);

        if (team && user) {
            user.update({ team });
            return user;
        }
        return new Response(404, {}, { error: "Team or user not found" });
    });
}
