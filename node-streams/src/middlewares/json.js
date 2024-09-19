export async function json(req, res) {
    const buffers = [];

    // permite percorrer toda a stream e armazenar cada pedaco dela
    // com o await o codigo so ira continuar depois que toda a stream for lida
    for await (const chunk of req) {
        buffers.push(chunk)
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString());
    } catch {
        req.body = null
    }

    res.setHeader('Content-type', 'application/json');
}