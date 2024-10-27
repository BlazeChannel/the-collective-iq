// import { Server, Model, JSONAPISerializer, Response } from "miragejs";
// //import bcrypt from 'bcryptjs'

// export function makeServer() {
//     return new Server({
//         models: {
//             user: Model.extend(),
//         },
//         logging: true,
//         serializers: {
//             application: JSONAPISerializer,
//           },
//           seeds(server) { 
//             server.create("user", {
//                 firstName: "Samuel",
//                 lastName: "Adedigba",
//                 email: "samueladedigba83@gmail.com",
//                 password: "111222333",
//                 role: "user",
//             });
//             server.create("user", {
//                 firstName: "Samuel",
//                 lastName: "Adedigba",
//                 email: "bankManager@gmail.com",
//                 password: "112233",
//                 role: "bankManager",
//             });
//             server.create("user", {
//               firstName: "Samuel",
//               lastName: "Adedigba",
//               email: "superAdmin@gmail.com",
//               password: "112233",
//               role: "superAdmin",
//           });
//         },

//         routes(){
//             this.namespace = '';
//              this.urlPrefix = 'http://localhost:517'

//             this.post('/user/login', (schema, request) => {
//               const { email, password } = JSON.parse(request.requestBody);
//               const user = schema.users.findBy({ email, password });
            
//               if (!user || user.password !== password) {
//                 return new Response(401, {}, { error: 'Invalid credentials' });
//               }
            
//               return { ...user.attrs, token: 'fake-jwt-token' };console.log('server role',user.attrs.role )
//             });
            
        
//               this.post('/user/register', (schema, request) => {
//                 const attrs = JSON.parse(request.requestBody);
//                 if (!attrs.role) {
//                   return new Response(400, {}, { error: "Role is required" });
//                 } 
//                 const user = schema.users.create({ ...attrs, id: Math.random() });
//                 return { ...user.attrs, token: 'fake-jwt-token' };
//                 console.log('server role',attrs.role )
//               });
              


//         },
//     });
 
// }

