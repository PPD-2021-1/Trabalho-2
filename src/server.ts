import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader/build/src/index'
import { get, put, watch } from './HashTable'

const packageDef = protoLoader.loadSync(
    __dirname+'/service.proto',
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
)

const protoDescriptor = grpc.loadPackageDefinition(packageDef)

const server = new grpc.Server()

const service  = (<any> protoDescriptor.Table).service

server.addService( service, {
    get: get,
    put: put
})

watch()

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (error) => {
    if (error) {
        console.log(error)
        process.abort()
    }
    server.start()
})
