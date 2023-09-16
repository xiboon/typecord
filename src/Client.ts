import { FastifyInstance, FastifyRequest, fastify } from 'fastify';
import EventEmitter from 'node:events';
import { ClientOptions } from './types/ClientOptions';
import { APIInteraction, InteractionType } from 'discord-api-types/v10';
import { verifyRequest } from './util/verifyRequest.js';
import { commandType } from './util/commandType.js';
export class Client extends EventEmitter {
    http: FastifyInstance;
    port: number;
    publicKey: string;
    endpoint: string;
    constructor(options: ClientOptions) {
        super();
        this.port = options.port;
        this.publicKey = options.publicKey;
        this.endpoint = options.endpoint || '/interactions';
        this.http = fastify();
    }
    async start() {
        this.http.post(
            this.endpoint,
            async (
                req: FastifyRequest<{
                    Body: APIInteraction;
                    Headers: {
                        'x-signature-ed25519': string;
                        'x-signature-timestamp': string;
                    };
                }>,
                reply
            ) => {
                const isValid = await verifyRequest(req, reply, this.publicKey);
                if (!isValid) return;
                switch (req.body.type) {
                    case InteractionType.Ping:
                        reply.send({ type: 1 });
                        this.emit('ping', req.body);
                        break;
                    case InteractionType.ApplicationCommand:
                        this.emit('command', commandType(req.body), reply);
                }
            }
        );
        await this.http.listen({ port: this.port });
    }
}
