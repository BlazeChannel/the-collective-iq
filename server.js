// require('dotenv').config();
// const server = require('server');
// const { get, post } = server.router;
// const { json, status } = server.reply;

// const response = {
//   success: (data) => json({ success: true, data }),
//   error: (message) => json({ success: false, message }),
//   unauthorized: () => status(401).json({ message: "Unauthorized access" }),
// };

// const options = {
//   port: process.env.PORT || 3000,
//   public: 'public',
//   secret: process.env.SECRET,
//   env: process.env.NODE_ENV,
// };

// // Routes
// const routes = [
//   get('/', () => response.success("Welcome to the API")),
//   post('/login', (ctx) => {
//     const { email, password } = ctx.data;
//     if (email === "user@example.com" && password === "password") {
//       return response.success({ role: 'user', token: 'dummyToken' });
//     }
//     return response.error("Invalid credentials");
//   }),
// ];

// server(options, routes).then((ctx) => {
//   console.log(`Server running on port ${ctx.options.port}`);
// });
