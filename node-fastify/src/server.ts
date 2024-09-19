import fastify from 'fastify';
import { env } from './env';
import cookie from '@fastify/cookie';
import { transactionsRoutes } from './routes/transactions';

const app = fastify();

app.register(cookie);
app.register(transactionsRoutes, {
    prefix: 'transactions', // define que esse plugin vai comeca com a rota transacion/...
});


app.listen({
    port: env.PORT
}).then(() => {
    console.log('server running!')
});
