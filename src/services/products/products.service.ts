import { baseUrlAxios } from "../index.service";


export const productsRequest = () => {
    return new Promise<any>(async (resolve, reject) => {
        
        await baseUrlAxios.get('products',
        ).then((data: any) => {
            resolve(data)
        }).catch((err: any) => {
            reject(err)
        });

    })
}

