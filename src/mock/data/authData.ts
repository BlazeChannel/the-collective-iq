import { Server } from "miragejs";

export const signInUserData = (server: Server) => {
    server.create('team', {
        teamName: 'Wellness Group',
        description: 'A team dedicated to wellness activities',
        teamLeader: [],
        teamCaptain: [],
        role: ["teamLeader", 'teamCaptain', 'SuperAdmin' ],
      });

    server.create("user", {
    userId: "1",
    firstName: 'Alice',
    lastName: 'Brown',
    email: "user@gmail.com",
    password: "112233",
    role: ["user"],
  });
  server.create("user", {
    userId: "2",
    firstName: "Jane",
    lastName: "Doe",
    email: "teamleader@gmail.com",
    password: "123456",
    role:[ "TeamLeader"],
    team: [],
  });
  server.create("user", {
    userId: "3",
    firstName: "Samuel",
    lastName: "Adedigba",
    email: "superadmin@gmail.com",
    password: "112233",
    role: ["SuperAdmin"],
    team: [],
  });
  server.create('user', {
    userId: '4',
    firstName: 'John',
    lastName: 'Smith',
    email: 'teamcaptain@gmail.com',
    password: '123456',
    role: ['TeamCaptain'],
    team: [],
  });

};
  
