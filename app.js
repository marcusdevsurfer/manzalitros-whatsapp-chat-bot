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
        name: 'Familiar',
        price: 95,
    },
    {
        id: 2,
        name: 'Mega',
        price: 125,
    },
    {
        id: 3,
        name: 'Doble Canala',
        price: 160,
    },
]

const manzalitros = [
    {
        id: 1,
        name: 'Pitufo',
        price: 115,
    },
    {
        id: 2,
        name: 'Morita',
        price: 115,
    },
    {
        id: 3,
        name: 'Paloma',
        price: 115,
    },
    {
        id: 4,
        name: 'Tequila Sunrise',
        price: 115,
    },
    {
        id: 5,
        name: 'Piña Colada',
        price: 125,
    },
    {
        id: 6,
        name: 'Gin De Frutos Rojos',
        price: 125,
    },
    {
        id: 7,
        name: 'Hulk',
        price: 135,
    },
    {
        id: 8,
        name: 'Fresita',
        price: 135,
    },
    {
        id: 9,
        name: 'Mojito Rey o Reyna',
        price: 135,
    },

]

const micheladas = [
    {
        id: 1,
        name: 'Tradicional',
        price: 75
    },
    {
        id: 2,
        name: 'Salseada',
        price: 75
    },
    {
        id: 3,
        name: 'Cielo Rojo',
        price: 75
    },
    {
        id: 4,
        name: 'Chelada',
        price: 75
    },
    {
        id: 5,
        name: 'Michelada de Sabor',
        price: 90
    }
]


const especialidades = [
    {
        id: 1,
        name: 'Baileys',
        price: 145
    },
    {
        id: 2,
        name: 'Tejuino Loco',
        price: 145
    },
    {
        id: 3,
        name: 'Mojito de Coco',
        price: 145
    },
    {
        id: 4,
        name: 'Tejuichela',
        price: 145
    }
]

const sinAlcohol = [
    {
        id: 1,
        name : 'Naranjada',
        price : 80
    },
    {
        id: 2,
        name : 'Limonada',
        price : 80
    },
    {
        id: 3,
        name : 'Piñada',
        price : 90
    },
    {
        id: 4,
        name : 'Frappe',
        price : 90
    },
    {
        id: 5,
        name : 'Limonada de Fresa',
        price : 90
    },
    {
        id: 6,
        name : 'Limonada de Frutos Rojos',
        price : 90
    },
    {
        id: 7,
        name : 'Frappuccino',
        price : 100
    }
]

const getDrinkTypes = drinkTypes.map((drinkType) => {
    return drinkType.name
})

const getCaguamasPreparadas = caguamasPreparadas.map((caguamaPreparada) => {
    return `${caguamaPreparada.name} $${caguamaPreparada.price}`
})

const getManzalitros = manzalitros.map((manzalitro) => {
        return `${manzalitro.name} $${manzalitro.price}`
})

const getMicheladas = micheladas.map((michelada) => {
    return `${michelada.name} $${michelada.price}`
})  

const getEspecialidades = especialidades.map((especialidad) => {
    return `${especialidad.name} $${especialidad.price}`
})

const getSinAlcohol = sinAlcohol.map((sinAlcohol) => {
    return `${sinAlcohol.name} $${sinAlcohol.price}`
})

const menuFlow = addKeyword(['menu','menú','mas informacion','mas información','bebida','bebidas'])
    .addAnswer(
        (
            [
                'MENU\n',
                `*${getDrinkTypes[0]}* 🍻`,
                getCaguamasPreparadas[0],
                getCaguamasPreparadas[1],
                `${getCaguamasPreparadas[2]}\n`,
                `*${getDrinkTypes[1]}* 🥃`,
                getManzalitros[0], 
                getManzalitros[1],
                getManzalitros[2],
                getManzalitros[3],
                getManzalitros[4],
                getManzalitros[5],
                getManzalitros[6],
                getManzalitros[7],
                `${getManzalitros[8]}\n`,
                `*${getDrinkTypes[2]}* 🍻🌶️`,
                getMicheladas[0],
                getMicheladas[1],
                getMicheladas[2],
                getMicheladas[3],
                `${getMicheladas[4]}\n`,
                `*${getDrinkTypes[3]}* 💫`,
                getEspecialidades[0],
                getEspecialidades[1],
                getEspecialidades[2],
                `${getEspecialidades[3]}\n`,
                `*${getDrinkTypes[4]}* 😋`,
                getSinAlcohol[0],
                getSinAlcohol[1],
                getSinAlcohol[2],
                getSinAlcohol[3],
                getSinAlcohol[4],
                getSinAlcohol[5],
                getSinAlcohol[6]
            ]
        )
    )











const flowPrincipal = addKeyword(['manzalitros'])
    .addAnswer('Hola, muchas gracias por contactarnos. Bienvenid@ a nuestro Manzalitros ChatBot.')
    .addAnswer('¿Como podemos ayudarte hoy?')
    .addAnswer([
        'Por favor escribe un comando para continuar. \n',
        '*' + '/menu' + '*' + ' ' + '👉🏼' + ' ' + 'Ver Menú',
        '*' + '/ubi' + '*' + ' ' + '👉🏼' + ' ' + 'Ver Ubicación',
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
