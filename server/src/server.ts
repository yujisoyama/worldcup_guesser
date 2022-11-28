import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client'
import cors from '@fastify/cors';

const prisma = new PrismaClient({
    log: ['query'],
})

async function bootstrap() {
    const fastify = Fastify({ logger: true, });

    await fastify.register(cors, {
        origin: true
    });

    fastify.get('/polls/count', async () => {
        const count = await prisma.poll.count();
        return { count }
    });

    await fastify.listen({ port: 3333 });
}

bootstrap();
