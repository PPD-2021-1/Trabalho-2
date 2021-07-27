import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader/build/src/index'
import { v4 as uuid } from 'uuid'
import util from 'util'

(async () => {
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

    const service  = (<any> protoDescriptor.Table)

    const client = new service('localhost:50051', grpc.credentials.createInsecure())

    const put = (data: any) => new Promise((resolve, reject) => {
        const callback = (error: any, status: any) => {
            if (error) {
                reject(error)
            }
            resolve(status)
        }
        
        client.put(data, callback)
    })

    for (let i = 0; i < 1000000; i++) {

        const status = await put({k: uuid(), v: 1000})

    }
})()