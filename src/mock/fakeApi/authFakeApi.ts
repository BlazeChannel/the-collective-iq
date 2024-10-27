import { Server, Response } from "miragejs";

export default function authFakeApi(server: Server) {
  server.post("/login", (schema, request) => {
    const { email, password } = JSON.parse(request.requestBody);
    const user = schema.users.findBy({ email, password });
    console.log("user", user);
    if (user) {
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        token: "fake-jwt-token",
      };
    }
    return new Response(
      401,
      { some: "header" },
      { message: "Invalid email or password!" }
    );
  });
  //get all users
  server.get("/users", (schema) => {
    return schema.users.all();
  });
  //get a users
  server.get("/users/:id", (schema, request) => {
    const userId = request.params.id;
    return schema.users.findBy(userId);
  });
}
