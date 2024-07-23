import { Flavors } from "@/classes/Flavors";
import { pricesOfIceCream } from "@/enum/pricesOfIcecream";
import { IFlavorsIceCream } from "@/interface/IFlavorsIceCream";
import flavorsIceCream from "@/types/flavorsIceCream";

interface itemsSold {
    name: flavorsIceCream | "Cone",
    qtdSold: number
}

export function endOfDayBalance(flavorsIceCream: IFlavorsIceCream[], cones: number) {
    const flavors = new Flavors(flavorsIceCream)

    const [itemsSold, newQtdCones] = calcQtdSold(flavors, cones)

    const revenue = calcRevenue(itemsSold)

    return [flavors.flavors, itemsSold, newQtdCones, revenue] as [IFlavorsIceCream[], itemsSold[], number, Record<flavorsIceCream | "Cone", number>]
}

function calcQtdSold(flavors: Flavors, cones: number) {
    const itemsSold = [] as itemsSold[]

    //resolve os potes
    flavors.flavors.forEach((flavor, index) => {
        const updateFlavor = {
            ...flavor,
            quantity: flavor.quantity
        } as IFlavorsIceCream

        let qtdSoldFlavor = 0

        if (flavor.quantity < 6) {
            // se menor que 6, vende tudo
            qtdSoldFlavor = flavor.quantity
            updateFlavor.quantity = 0

        } else {

            // sorteia um número de 6 a 18
            if (flavor.quantity > 18) {
                qtdSoldFlavor = pickANumber(6, 18)
            } else {
                // sorteia um número de 6 a maior quantidade disponível
                qtdSoldFlavor = pickANumber(6, flavor.quantity)
            }
            updateFlavor.quantity -= qtdSoldFlavor

        }
        flavors.put(index, updateFlavor)
        itemsSold.push({ name: flavor.name, qtdSold: qtdSoldFlavor })

    })

    //resolve os cones
    let qtdSoldCone = 0
    if (cones < 15) {
        //vende tudo
        qtdSoldCone = cones
        cones = 0
    } else {
        if (cones > 25) {
            qtdSoldCone = pickANumber(15, 25)
        } else {
            qtdSoldCone = pickANumber(15, cones)
        }
        cones -= qtdSoldCone
    }
    itemsSold.push({ name: "Cone", qtdSold: qtdSoldCone })

    return [itemsSold, cones] as [itemsSold[], number]
}

function calcRevenue(itemsSold: itemsSold[]) {
    const itemRevenue: Record<flavorsIceCream | "Cone", number> = {
        Morango: 0,
        Chocolate: 0,
        Baunilha: 0,
        Cone: 0
    }

    itemsSold.forEach(item => {
        //O valor da receita = resultado vendido * preço do produto
        itemRevenue[item.name] = item.qtdSold * pricesOfIceCream[item.name]
    })

    return itemRevenue
}


/**
 * Retorna um número de 6 a maior quantidade disponível
 */
function pickANumber(minValue: number, numberInStock: number) {
    const intervalSize = numberInStock + 1 - minValue;

    //numero sorteado
    const drawnNumber = Math.floor(Math.random() * intervalSize) + minValue;
    return drawnNumber;
}