
const assigned = require('./../data/assignedStore.json')
const brands = require('./../data/brandDateData.json')

const getSum =  values => Object.values(values).reduce((total, num) => total + num, 0)
const getPercent = (a, b) => (a/b * 100).toFixed(2)

const getTotal = (objA, objB) => Object.keys(objB).map(key => objA[key] = (parseFloat(objA[key] || 0)  + parseFloat(objB[key])).toFixed(2).replace(/[.,]00$/, ''))

const getBooleans = obj => {
    let objResults = {}
    Object.keys(obj).map(key => objResults[key] = parseFloat(obj[key]) === 0 ? false : true)
    return objResults
}

const Resources = {
    fetchData: () => {
        let data = brands.map(brand => ({...brand, ...assigned.data.filter(item => item.identifier === brand.identifier)[0]}))
        let total = {}
        const newData = data.map(item => {
            const visitors = getSum(item.visitors),
                peasants = getSum(item.peasants),
                tickets = getSum(item.tickets),
                revenue = getSum(item.revenue).toFixed(2),
                items = getSum(item.items),
                permanence = getSum(item.permanence),
                permanenceCount = getSum(item.permanenceCount),
                daysOff = Object.values(item.uptime).reduce((total, num) => parseInt(num) === 0 ? (total + 1) :  total, 0)
                

            const nData = {
                ...item,
                visitors,
                peasants,
                attractions: getPercent(visitors, peasants),
                cabinet: getSum(item.cabinet),
                tickets,
                persuasion: getPercent(tickets, visitors),
                revenue,
                averageTicket: getPercent(revenue, tickets),
                items,
                itemPerTicket: getPercent(items, tickets),
                averagePermanence: (((permanence * 100) / permanenceCount) / 6000000).toFixed(2),
                daysOff
            }
            getTotal(total, nData)

            return nData
        })

        total.name = 'Total'
        total.identifier = '1234567890'

        return {items: [...newData, total], total: getBooleans(total)}
    }
}



export default Resources