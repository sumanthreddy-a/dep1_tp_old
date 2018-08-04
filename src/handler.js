const {
    TransactionHandler
} = require('sawtooth-sdk/processor/handler')
const {
    InternalError,
    InvalidTransaction
} = require('sawtooth-sdk/processor/exceptions')
const cbor = require('cbor')
const {
    decodeData,
    hash
} = require('./lib/helper')

const FAMILY_NAME = 'ibc-hack',
    VERSION = '1.0',
    NAME_SPACE = hash(FAMILY_NAME).substr(0, 6)

console.log(NAME_SPACE)
class Handler extends TransactionHandler {
    constructor() {
        super(FAMILY_NAME, [VERSION], [NAME_SPACE])
    }
    async apply(transactionRequest, context) {
    
        let data = JSON.parse(transactionRequest.payload)
        if (!data.action) {
            throw new InvalidTransaction(`action required`)
        }
        if (!data.depId) {
            throw new InvalidTransaction(`department Id required`)
        }
        if (!data.aadhar) {
            throw new InvalidTransaction('aadhar required')
        }
        if (!data.schemeName) {
            throw new InvalidTransaction('scheme name required')
        }
        if (!data.amount) {
            throw new InvalidTransaction('amount required')
        }
        let action = data.action
        let address = NAME_SPACE + hash(data.aadhar).slice(-64)

        /* check condition */
        if (action == 'create') {
            let entries = {
                [address]:  Buffer.from(JSON.stringify(data),'utf-8')
            }
            context.setState(entries)
        } else if (action == 'update') {
            context.getState([address]).then((possibleValues) => {
                // console.log(possibleValues)
                let key = Object.keys(possibleValues)
                let stateValue = possibleValues[address]
                // console.log(JSON.parse(stateValue))
                if (stateValue) {
                    let value = JSON.parse(stateValue)
                    var x = parseInt(data.aadhar)
                    // value[x] = ''
                    // console.log(value)
                    value[k]['schemeName'] = null
                    console.log(value,"hiee")
                    value[k]['schemeName'] = data.schemeName
                    value[k].amount = data.amount
                    value[k].depId = data.depId
                    let entries = {
                        [address]:  Buffer.from(JSON.stringify(data),'utf-8')
                    }
                    context.setState(entries)
                } else {
                    throw new InvalidTransaction(`There no state with tho aadhar ${data.aadhar}`)
                }
            })
        }
        // switch (action) {
        //     case 'create':
        //         
        //     case 'update':
        //         context.getState([address]).then((possibleValues) => {
        //             let stateValue = possibleValues[address]
        //             if (stateValue & stateValue.length > 0) {
        //                 let value = cbor.decodeFirst(stateValue)
        //                 value[aadhar].schemeName = data.schemeName
        //                 value[aadhar].amount = data.amount
        //                 value[aadhar].amount = data.depId

        //                 let entries = {
        //                     [address]: cbor.encode(value[aadhar])
        //                 }
        //                 context.setState(entries)
        //             } else {
        //                 throw new InvalidTransaction(`There no state with tho aadhar ${data.aadhar}`)
        //             }
        //         })
        //     default:
        //         throw new InvalidTransaction(`Action must be create update`)
        // }
        // })
    }
}

module.exports = Handler