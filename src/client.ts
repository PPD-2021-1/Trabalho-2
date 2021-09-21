import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader/build/src/index'

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


    const numIterations = Math.floor(Math.random() * 1000000)

    const keysAdds: number[] = []

    const put = (data: any) => new Promise((resolve, reject) => {
        const callback = (error: any, status: any) => {
            if (error) {
                reject(error)
            }
            resolve(status)
        }
        
        client.put(data, callback)
    })

    const get = (data: any) => new Promise((resolve, reject) => {
        const callback = (error: any, result: any) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        }

        client.get(data, callback)
    })

    console.log('Inserindo ' + numIterations + ' valores');
    let time = (new Date()).getTime()
    for (let i = 0; i < numIterations; i++) {
        let key = Math.floor(Math.random() * 1000000)
        if (!keysAdds.includes(key)) {
            keysAdds.push(key)
            const value = Math.floor(Math.random() * 1000000)
            const status = await put({k: key, v: value})
            if (i % 1000 == 0) {
                console.log(i + '/' + numIterations)
            }
            //console.log('Inserindo ' + i + ' de ' + numIterations + '|chave:' + key + "|valor:" + value)
            //console.log(status)
        }
    }

    keysAdds.sort()

    console.log('Recuperando valores')
    for (let k of keysAdds) {
        await get({k: k})
    }

    console.log('Tempo decorrido:' + ((new Date()).getTime() - time) + "ms")
})()