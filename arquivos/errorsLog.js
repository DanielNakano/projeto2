const fs = require('fs').promises

const lerJson = async () => {
    const data = await fs.readFile('../arquivos/logs.json')
    const dados = JSON.parse(data)
    return dados
}

module.exports = {

    async escreveJson(logs) {
        const dados = await lerJson()
        dados.push(logs)

        let result = await fs.writeFile('../arquivos/logs.json', JSON.stringify(dados))
        return result
    }


}
