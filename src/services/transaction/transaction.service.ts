import { baseUrlAxios } from "../index.service";

export const createTransactionRequest = (aToken: string, data: any) => {
    return new Promise<void>(async (resolve, reject) => {

        await baseUrlAxios.post('transactions', data,
            { headers: { Authorization: `Bearer ${aToken}` } }
        ).then(() => {
            resolve()
        }).catch((err: any) => {
            reject(err)
        });

    })
}

export const getAllTransactionRequest = (aToken: string) => {
    return new Promise(async (resolve, reject) => {

        await baseUrlAxios.get('transactions',
            { headers: { Authorization: `Bearer ${aToken}` } }
        ).then((res) => {
            resolve(res)
        }).catch((err: any) => {
            reject(err)
        });

    })
}
