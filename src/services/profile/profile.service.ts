import { baseUrlAxios } from "../index.service";

export const currentProfileRequest = (aToken: any) => {
    return new Promise<any>(async (resolve, reject) => {
        await baseUrlAxios.get('user-profile',
        {headers: { Authorization: `Bearer ${aToken}` } }
        ).then((data: any) => {
            resolve(data)
        }).catch((err: any) => {
            reject(err)
        });

    })
}

export const changePasswordRequest = (aToken: any, data: any) => {
    return new Promise<any>(async (resolve, reject) => {
        await baseUrlAxios.patch('user', data,
        {headers: { Authorization: `Bearer ${aToken}` } }
        ).then((data: any) => {
            resolve(data)
        }).catch((err: any) => {
            reject(err)
        });
    })
}

export const updateProfileRequest = (aToken: any, data: any) => {
    return new Promise<any>(async (resolve, reject) => {
        await baseUrlAxios.patch('user-profile', data,
        {headers: { Authorization: `Bearer ${aToken}` } }
        ).then((data: any) => {
            resolve(data)
        }).catch((err: any) => {
            reject(err)
        });
    })
}

export const addToFavoriteRequest = (aToken: any, productId: any) => {
    return new Promise<any>(async (resolve, reject) => {
        await baseUrlAxios.patch(`user-profile/favorite/${productId}`, {},
        {headers: { Authorization: `Bearer ${aToken}` } }
        ).then((data: any) => {
            resolve(data)
        }).catch((err: any) => {
            reject(err)
        });
    })
}

export const removeFromFavoriteRequest = (aToken: any, productId: any) => {
    return new Promise<any>(async (resolve, reject) => {
        await baseUrlAxios.delete(`user-profile/favorite/${productId}`,
        {headers: { Authorization: `Bearer ${aToken}` } }
        ).then((data: any) => {
            resolve(data)
        }).catch((err: any) => {
            reject(err)
        });
    })
}
