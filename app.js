const { createBot, createProvider, createFlow, addKeyword, addAnswer } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const drinkTypes = [
    {
        id: 1,
        name: 'Caguamas Preparadas'
    },
    {
        id: 2,
        name: 'Manzalitros'
    },
    {
        id: 3,
        name: 'Micheladas'
    },
    {
        id: 4,
        name: 'Especialidades'
    },
    {
        id: 5,
        name: 'Sin Alcohol'
    },

]

const caguamasPreparadas = [
    {
        id: 1,
        name : 'Familiar',
        price : 95,
    },
    {
        id: 2,
        name : 'Mega',
        price : 125,
    },
    {
        id: 3,
        name : 'Doble Canala',
        price : 160,
    },
]

const manzalitros = [
    {
        id: 1,
        name : 'Pitufo',
        price : 115,
    },
    {
        id: 2,
        name : 'Morita',
        price : 115,
    },
    {
        id: 3,
        name : 'Paloma',
        price : 115,
    },
    {
        id: 4,
        name : 'Tequila Sunrise',
        price : 115,
    },
    {
        id: 5,
        name : 'Piña Colada',
        price : 125,
    },
    {
        id: 6,
        name : 'Gin De Frutos Rojos',
        price : 125,
    },
    {
        id: 7,
        name : 'Hulk',
        price : 135,
    },
    {
        id: 8,
        name : 'Fresita',
        price : 135,
    },
    {
        id: 9,
        name : 'Mojito Rey o Reyna',
        price : 135,
    },
    
]

const micheladas = [
    {
        id : 1,
        name : 'Tradicional',
        price : 75
    },
    {
        id : 2,
        name : 'Salseada',
        price : 75
    },
    {
        id : 3,
        name : 'Cielo Rojo',
        price : 75
    },
    {
        id : 4,
        name : 'Chelada',
        price : 75
    },
    {
        id : 5,
        name : 'Michelada de Sabor',
        price : 90
    }
]


const menuFlow = addKeyword('menu')
    .addAnswer(
        'Te presentamos nuestras categorias 🍹',
        null,
        async (_, { state }) => {
            const names = await drinkTypes.map((drinkType) => drinkType.name)
            await state.update({
                stateDrinkTypeNames: names
            })
        }
    )
    .addAction(
        async (_, { state, flowDynamic }) => {
            const names = state.get('stateDrinkTypeNames')
            const position1 = names[0]
            const position2 = names[1]
            const position3 = names[2]
            const position4 = names[3]
            const position5 = names[4]
            const menuMessage = `1️⃣ ${position1}\n2️⃣ ${position2}\n3️⃣ ${position3}\n4️⃣ ${position4}\n5️⃣ ${position5}`
            await flowDynamic(menuMessage)
        }
    )
    .addAnswer(
        ['Selecciona una categoria, escribe un numero del 1 - 5 para continuar.'],
        {
            capture: true
        },
        async (ctx, { flowDynamic, gotoFlow }) => {
            // TODO : Agregar regex validacion: que pueda contener un numero del 1-5.
            const regex = /[1-5]/
            const input = ctx.body
            const isValid = regex.test(input)

            if (isValid) {
                switch (input) {
                    case '1':
                        const names = await caguamasPreparadas.map((e) => {
                            const name = e.name
                            const price = e.price
                            return `${name} $${price}`
                        })
                        const position1 = names[0]
                        const position2 = names[1]
                        const position3 = names[2]
                        await flowDynamic(`${position1}\n${position2}\n${position3}`)
                        await gotoFlow(menuFlow)
                        break
                    case '2':
                        const manzalitrosByPrice115 = await manzalitros.filter((item) =>item.price === 115)
                        const manzalitrosByPrice125 = await manzalitros.filter((item) => item.price === 125)
                        const manzalitrosByPrice135 = await manzalitros.filter((item) => item.price === 135)
                        
                        const manzalitrosMessage1Position1 = manzalitrosByPrice115[0]
                        const manzalitrosMessage1Position2 = manzalitrosByPrice115[1]
                        const manzalitrosMessage1Position3 = manzalitrosByPrice115[2]
                        const manzalitrosMessage1Position4 = manzalitrosByPrice115[3]

                        const manzalitrosMessage2Position1 = manzalitrosByPrice125[0]
                        const manzalitrosMessage2Position2 = manzalitrosByPrice125[1]

                        const manzalitrosMessage3Position1 = manzalitrosByPrice135[0]
                        const manzalitrosMessage3Position2 = manzalitrosByPrice135[1]
                        const manzalitrosMessage3Position3 = manzalitrosByPrice135[2]

                        await flowDynamic(`${manzalitrosMessage1Position1.name} $${manzalitrosMessage1Position1.price}\n${manzalitrosMessage1Position2.name} $${manzalitrosMessage1Position2.price}\n${manzalitrosMessage1Position3.name} $${manzalitrosMessage1Position3.price}\n${manzalitrosMessage1Position4.name} $${manzalitrosMessage1Position4.price}`)
                        await flowDynamic(`${manzalitrosMessage2Position1.name} $${manzalitrosMessage2Position1.price}\n${manzalitrosMessage2Position2.name} $${manzalitrosMessage2Position2.price}`)
                        await flowDynamic(`${manzalitrosMessage3Position1.name} $${manzalitrosMessage3Position1.price}\n${manzalitrosMessage3Position2.name} $${manzalitrosMessage3Position2.price}\n${manzalitrosMessage3Position3.name} $${manzalitrosMessage3Position3.price}`)
                        await gotoFlow(menuFlow)
                        break
                    case '3':
                        const micheladasData = await micheladas.map((michelada) => {
                            const name = michelada.name
                            const price = michelada.price
                            return `${name} $${price}`
                        }) 

                        const micheladasDataPosition1 = micheladasData[0]
                        const micheladasDataPosition2 = micheladasData[1]
                        const micheladasDataPosition3 = micheladasData[2]
                        const micheladasDataPosition4 = micheladasData[3]
                        const micheladasDataPosition5 = micheladasData[4]

                        await flowDynamic(`${micheladasDataPosition1}\n${micheladasDataPosition2}\n${micheladasDataPosition3}\n${micheladasDataPosition4}\n${micheladasDataPosition5}`)
                        await gotoFlow(menuFlow)
                        break
                    case '4':
                        await flowDynamic('Selecionaste Especialidades')
                        await gotoFlow(menuFlow)
                        break
                    case '5':
                        await flowDynamic('Selecionaste Sin Alcohol')
                        await gotoFlow(menuFlow)
                        break
                    default:
                        await flowDynamic('Opcion no valida')
                        await gotoFlow(menuFlow)
                }
            } else {
                await flowDynamic('Ingresa un numero valido (1-5), vuelve a intentarlo.')
                await gotoFlow(menuFlow)
            }
        }

    )







const flowPrincipal = addKeyword(['manzalitros'])
    .addAnswer('Hola, muchas gracias por contactarnos. Bienvenid@ a nuestro Manzalitros ChatBot.')
    .addAnswer('¿Como podemos ayudarte hoy?')
    .addAnswer([
        'Por favor escribe un comando para continuar. \n',
        '*' + '/menu' + '*' + ' ' + '👉🏼' + ' ' + 'Ver Menu',
    ],
        null,
        null,
        [menuFlow]
    )


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
