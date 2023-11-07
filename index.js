const { ApolloServer, gql } = require('apollo-server')

produtos = [{
    nome: "Notebook",
    preco: 1000.00,
    desconto: 50.00,
},
{
    nome: "PC",
    preco: 1400.00,
    desconto: 100.00,
},
{
    nome: "Google Home",
    preco: 200.00,
    desconto: 20.00,
}]

const typeDefs = gql`
    # Pontos de entrada da API
    type Query {
        usuarioLogado: Usuario
        current_datetime: String!
        produtoEmDestaque: Produto
        produtos: [Produto]
        produto(nome: String): Produto
        error: String
    }

    type Usuario {
        id: ID
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
    }

    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float
    }
`

const resolvers = {
    Usuario: {
        salario(usuario) {
            return usuario.salario_real
        }
    },
    Produto: {
        precoComDesconto(produto) {
            return produto.preco - produto.desconto
        }
    },
    Query: {
        usuarioLogado() {
            return {
                id: 1,
                nome: "Victor",
                email: "victor@email.com",
                idade: "28",
                salario_real: 1.9,
                vip: false,
            }
        },
        current_datetime() {
            return `${new Date}`
        },
        error() {
            return "primeiro erro gql"
        },
        produtoEmDestaque() {
            return {
                nome: "Notebook",
                preco: 1000.00,
                desconto: 50.00,
            }
        },
        produtos() {
            return produtos
        },
        produto(_, args) {
            const produtoSelecionado = produtos.filter(u => u.nome == args.nome)
            print(produtoSelecionado)
            print("hello")

            return produtoSelecionado
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log('Ola mundo')
})