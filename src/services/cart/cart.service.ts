import { baseUrlAxios } from "../index.service";


export const addToCartRequest = (aToken: any ,data: string) => {
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

export const cartDetailRequest = (aToken: any) => {
    return new Promise<any>(async (resolve, reject) => {
        
        await baseUrlAxios.get('cart/details',
        {headers: { Authorization: `Bearer ${aToken}` } }
        ).then((data: any) => {
            resolve(data)
        }).catch((err: any) => {
            reject(err)
        });

    })
}

export const oneCartDetailRequest = (aToken: any, id: any) => {
    return new Promise<any>(async (resolve, reject) => {
        
        await baseUrlAxios.get(`cart/details/${id}`,
        {headers: { Authorization: `Bearer ${aToken}` } }
        ).then((data: any) => {
            resolve(data)
        }).catch((err: any) => {
            reject(err)
        });

    })
}

export const editQuantityRequest = (aToken:any, data: any) => {
    return new Promise<any>(async (resolve, reject) => {
        
        await baseUrlAxios.patch('cart', data,
        {headers: { Authorization: `Bearer ${aToken}` } }
        ).then((data: any) => {
            resolve(data)
        }).catch((err: any) => {
            reject(err)
        });

    })
}