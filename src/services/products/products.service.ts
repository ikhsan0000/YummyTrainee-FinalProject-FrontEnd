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
            resolve(data)
        }).catch((err: any) => {
            reject(err)
        });

    })
}

export const filterByCategoryRequest = (category: string) => {
    return new Promise<any>(async (resolve, reject) => {
        await baseUrlAxios.get(`products/filter/category`,{ params: { category: category } }
        ).then((data: any) => {
            resolve(data)
        }).catch((err: any) => {
            reject(err)
        });

    })
}