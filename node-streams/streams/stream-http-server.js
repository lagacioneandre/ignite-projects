import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1;
        console.log(transformed)
        callback(null, Buffer.from(String(transformed)));
    }
}

// req => ReadableStream
// res => WritableStream
// tudo no nodeJS sao streams

const server = http.createServer(async (req, res) => {
    const buffers = [];

    // permite percorrer toda a stream e armazenar cada pedaco dela
    // com o await o codigo so ira continuar depois que toda a stream for lida
    for await (const chunk of req) {
        buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers).toString();
    return res.end(fullStreamContent);
});

server.listen(3334);
