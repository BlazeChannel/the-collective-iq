import { Server } from "miragejs";


export function teamFakeApi(server: Server) {
    // Fetch all teams
    server.get('/teams', (schema) => {        
        return schema.teams.all()
    });
     // creates a new team
    server.post('/teams', (schema, request) => {    
        const attrs =JSON.parse(request.requestBody);    
        return schema.teams.create(attrs)
    });
    // Get team data
    server.get('/teams/:id', (schema, request) => {  
        const teamId = request.params.id;
        return schema.teams.find(teamId);        
    });
    // Add a user to a team (TeamLeader or SuperAdmin)
    server.post('/teams/:id/add-user', (schema, request) => {  
        const teamId = request.params.id;
        const { userId } = JSON.parse(request.requestBody)
        const team= schema.teams.find(teamId);
        const user= schema.teams.find(userId);
        
        team.users.add(user);
        return team;
    });    
    // TeamCaptain approves user to join
    server.post('/teams/:id/approve-user', (schema, request) => {
        const teamId = request.params.id;
        const { userId } = JSON.parse(request.requestBody);
        const team = schema.teams.find(teamId);
        const user = schema.users.find(userId);

        user.update({ team });
        return user;
      });
}