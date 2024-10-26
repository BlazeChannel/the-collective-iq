import { belongsTo, createServer,hasMany,Model, JSONAPISerializer } from 'miragejs'
import { signInUserData } from './data/authData'
import authFakeApi from './fakeApi/authFakeApi'
import { teamFakeApi } from './fakeApi/teamFakeApi'


export function makeServer() {
    return createServer({

        models: {
            user: Model.extend({
                team: belongsTo()
            }),
            team: Model.extend({
                users: hasMany(),
                teamLeader: belongsTo('user'),
                teamCaptain: hasMany('user')
            })
        },

        serializers: {
            application: JSONAPISerializer,
          },

        seeds(server) {
            // server.db.loadData({
            //     signInUserData,
            // })
            signInUserData(server);
        },

        routes() {
            this.urlPrefix= ''
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