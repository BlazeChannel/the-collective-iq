import { Server, Response } from "miragejs";

export default function authFakeApi(server: Server) {
  server.post("/login", (schema, request) => {
    const { email, password } = JSON.parse(request.requestBody);
    const user = schema.users.findBy({ email, password });
    console.log("user", user);
    if (user) {
      return new Response(
        200, {},
        {
          message: "User logged in successfully",
          data:
          {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            token: "fake-jwt-token",
          }
        }
      );
    }
    return new Response(
      401,
      { message: "Invalid email or password!" }
    );
  });
  //get all users
  server.get('/users', (schema) => {
    return schema.users.all();
  });


  //get a user detail by id
  server.get("/users/:id", (schema, request) => {
    let user = schema.users.find(request.params.id);
    if (!user) {
      return new Response(404, {}, { message: 'User not found' });
    }
    user.update(JSON.parse(request.requestBody));
    return user;
  });
  // POST create new user
  server.post("/users", (schema, request) => {
    const attrs = JSON.parse(request.requestBody);
    return schema.users.create(attrs);
  });

  // PUT update user
  server.put("/users/:id", (schema, request) => {
    let user = schema.users.find(request.params.id);
    if (!user) {
      return new Response(404, {}, { message: 'User not found' });
    }
    user.update(JSON.parse(request.requestBody));
    return user;
  });

  // DELETE remove user
  server.delete("/users/:id", (schema, request) => {
    const id = request.params.id;
    return schema.users.find(id).destroy();
  });
}
