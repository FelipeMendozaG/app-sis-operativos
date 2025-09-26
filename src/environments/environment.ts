/* import {config} from 'dotenv';
config(); */
/* console.log("Environment Variables:",process.env); */
/* if (process.env['NODE_ENV'] == 'development'){
    config({path: '.env.development'});
} */
export const environment = {
    production: false,
    API_URL: /* process.env['API_URL'] || */ 'http://localhost:9090/api'
}