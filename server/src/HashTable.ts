import * as grpc from '@grpc/grpc-js'

interface IMessage {
    k: string,
    v?: number|null
}

interface IPutReply {
    success: boolean
}

const table: {[key: string]: number} = {}

function get(call: grpc.ServerUnaryCall<IMessage, IMessage>, callback: grpc.sendUnaryData<IMessage>) {
    let key: string = call.request.k
    let value = table[key] || null
    let response: IMessage = { k: key, v: value }
    
    if (value) {
        response.v = value
    }

    callback(null, response)
}

function put(call: grpc.ServerUnaryCall<IMessage, IPutReply>, callback: grpc.sendUnaryData<IPutReply>) {
    const key = call.request.k
    const value = call.request.v

    if (value) {
        table[key] = value
    }

    return callback(null, {success: true})
}

export {get, put}
