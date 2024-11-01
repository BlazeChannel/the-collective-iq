// mirage/data/authData.ts
import { Server } from 'miragejs';

export const signInUserData = (server: Server) => {
  // Create users with roles
  const superAdmin = server.create('user', {
    id: '1',
    firstName: 'Samuel',
    lastName: 'Adedigba',
    email: 'superAdmin@collectiveiq.com',
    password: '123456',
    role: 'superAdmin'
  });

  const teamLeader = server.create('user', {
    id: '2',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'teamLeader@collectiveiq.com',
    password: '123456',
    role: 'teamLeader'
  });

  const teamCaptain = server.create('user', {
    id: '3',
    firstName: 'John',
    lastName: 'Smith',
    email: 'teamCaptain@collectiveiq.com',
    password: '123456',
    role: 'teamCaptain'
  });
  server.create('user', {
    id: '4',
    firstName: 'Alice',
    lastName: 'Brown',
    email: 'user1@collectiveiq.com',
    password: '123456',
    role: 'user'
  });

  server.create('user', {
    id: '5',
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'user2@collectiveiq.com',
    password: '123456',
    role: 'user'
  });

  // Create a team
  const wellnessGroup = server.create('team', {
    name: 'Wellness Group',
    description: 'A team dedicated to wellness activities',
    users: [superAdmin, teamLeader, teamCaptain]
  });

  // Link team members to the team
  superAdmin.update({ team: wellnessGroup });
  teamLeader.update({ team: wellnessGroup });
  teamCaptain.update({ team: wellnessGroup });
};


// [ { "name": "Harry Potter", "city": "London" }, 
//   { "name": "Don Quixote", "city": "Madrid" }, 
//   { "name": "Joan of Arc", "city": "Paris" }, 
//   { "name": "Rosa Park", "city": "Alabama" } ]

