import { belongsTo, createServer,hasMany,Model, JSONAPISerializer } from 'miragejs'
import { signInUserData } from './data/authData'
import authFakeApi from './fakeApi/authFakeApi'
import { teamFakeApi } from './fakeApi/teamFakeApi'


export function makeServer() {
    return createServer({

        models: {
            user: Model.extend({
                team: belongsTo('team'),
                role: 'user'  // Role can be 'user', 'teamLeader', or 'teamCaptain'
            }),
            team: Model.extend({
                users: hasMany('user'), // Team has many users; users have roles to specify leaders or captains
                // teamLeader: belongsTo('user'),
                // teamCaptain: belongsTo('user')
            })
        },

        serializers: {
            application: JSONAPISerializer,
          },

        seeds(server) {
            signInUserData(server);
        },

        routes() {
            this.urlPrefix=  ''
            this.namespace =''
            this.passthrough((request) => {
                const external =request.url.startsWith('http')
                return external
            })
            this.passthrough()

            authFakeApi(this)
            teamFakeApi(this)
        },
    })
}