import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url);

export class Database {
    // faz com que a propriedade seja privada, isso com JS, no TS 'e so marcar como private
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf8')
            .then(data => this.#database = JSON.parse(data))
            .catch(() => this.#persist())
    }

    #persist() {
        // writeFile so aceita strings, por isso tem que converter o objeto em string
        // db.json 'e no nome do arquivo e a extensao
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table) {
        return this.#database[table] ?? []
    }

    insert(table, data) {
        if(Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist();

        return data;
    }
}