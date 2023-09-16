import { APIInteraction } from 'discord-api-types/v10';
import { verify } from 'discord-verify';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function verifyRequest(
    req: FastifyRequest<{
        Body: APIInteraction;
        Headers: {
            'x-signature-ed25519': string;
            'x-signature-timestamp': string;
        };
    }>,
    res: FastifyReply,
    publicKey: string
) {
    const signature = req.headers['x-signature-ed25519'];
    const timestamp = req.headers['x-signature-timestamp'];
    const rawBody = JSON.stringify(req.body);

    if (!signature || !timestamp) return;

    const isValid = await verify(rawBody, signature, timestamp, publicKey, crypto.subtle);
    if (!isValid) {
        res.code(401).send({ error: 'Invalid request signature' });
    }
    return isValid;
}
