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

export const productSearchRequest = (keyword: string) => {
    return new Promise<any>(async (resolve, reject) => {
        
        await baseUrlAxios.get(`products/search`,{ params: { keyword: keyword } }
        ).then((data: any) => {
            // console.log(data)
            resolve(data)
        }).catch((err: any) => {
            reject(err)
        });

    })
}
