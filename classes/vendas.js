const db = require('../arquivos/db.js')
const logs = require('../arquivos/errorsLog.js')

class vendas{
    constructor(data, cliente, produtos){
        this.data = data;
        this.cliente = cliente;
        this.produtos = produtos
    }

    /*metodos*/

    //validação
    async validarDados(venda){
        if(venda.data == null || venda.data == ''){
            console.log("A data da venda não pode estar vazia")
            await logs.escreveJson("Cadastramento de venda com data vazio")
            return false
        }
        if(venda.cliente == null || venda.cliente ==''){
            console.log("O nome do cliente não pode estar vazia")
            await logs.escreveJson("Cadastramento de venda com nome do cliente vazio")
            return false
        }
        if(venda.produtos == null || venda.produtos == ''){
            console.log("O campo compra enconse-se vazio")
            await logs.escreveJson("Cadastramento de venda sem produto vazio")
            return false
        }

        return true
    }

    //criar

    async CriarVenda(venda){
        if(await this.validarDados(venda)){
            const result = await db.criarVendas(venda)
            if(result){
                console.log("Venda realizada con sucesso")
                return true
            }else{
                console.log("Erro ao realizar a venda")
                await logs.escreveJson("Erro ao realizar venda")
                return false
            }
        }
        
    }

    //buscar data
    async BuscarVendaData(data){
        if(data == ''){
            console.log("Campo de data esta vazio")
            await logs.escreveJson("Busca em venda com data vazia")
            return false
        }
        const result = await db.buscarVendaData(data)
        if(result.length  === 0){
            console.log("Nenhum venda foi registrada na data inserida")
            return true
        }
        console.log(result)
        return true
    }

    //buscar cliente
    async BuscarVendaCliente(cliente){
        if(cliente == ''){
            await logs.escreveJson("Busca em venda com nome do cliente vazio")
            return false
        }
        const result = await db.buscarVendaCliente(cliente)
        return result
    }

    //excluir
    async ExcluirVenda(id){
        if(id == ''){
            console.log("Campo ID vazio ao tentar excluir")
            await logs.escreveJson("Exclução com o ID vazio")
            return false
        }
        const result = await db.excluirvenda(id)
        if(result.acknowledged && result.deletedCount == 1){
            console.log("Venda excluida com sucesso")
            return true
        }else{
            if(result.deletedCount == 0){
                console.log("Não foi achado nenhuma venda com os valores inseridos")
                return true
            }else{
                console.log("Erro ao excluir venda")
                await logs.escreveJson("Erro ao excluir venda")
                return false
            }
        }
    }
}

module.exports= vendas