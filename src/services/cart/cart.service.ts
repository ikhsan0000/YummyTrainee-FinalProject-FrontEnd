import { baseUrlAxios } from "../index.service";


export const cartRequest = (aToken: any ,data: string) => {
    return new Promise<any>(async (resolve, reject) => {
        
        await baseUrlAxios.post('cart', data,
        {headers: { Authorization: `Bearer ${aToken}` } }
        ).then((data: any) => {
            resolve(data)
        }).catch((err: any) => {
            reject(err)
        });

    })
}

