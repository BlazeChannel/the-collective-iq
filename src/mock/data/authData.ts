// mirage/data/authData.ts
import { Server } from 'miragejs';

export const signInUserData = (server: Server) => {
  // Create users with roles
  const superAdmin = server.create('user', {
    firstName: 'Samuel',
    lastName: 'Adedigba',
    email: 'superAdmin@collectiveiq.com',
    password: '123456',
    role: 'superAdmin'
  });

  const teamLeader = server.create('user', {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'teamLeader@collectiveiq.com',
    password: '123456',
    role: 'teamLeader'
  });

  const teamCaptain = server.create('user', {
    firstName: 'John',
    lastName: 'Smith',
    email: 'teamCaptain@collectiveiq.com',
    password: '123456',
    role: 'teamCaptain'
  });
  server.create('user', {
    firstName: 'Alice',
    lastName: 'Brown',
    email: 'user1@collectiveiq.com',
    password: '123456',
    role: 'user'
  });

  server.create('user', {
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
