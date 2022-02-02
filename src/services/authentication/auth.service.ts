import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { baseUrlAxios } from "../index.service";

export const loginRequest = (data: string) => {
    return new Promise<any>(async (resolve, reject) => {

        await baseUrlAxios.post('auth/local/login', data
        ).then((data: any) => {
            resolve(data)
        }).catch((err: any) => {
            reject(err)
        });

    })
}

export const registerRequest = (data: string) => {
    console.log(data)    

    return new Promise<any>(async (resolve, reject) => {

        await baseUrlAxios.post('auth/local/signup', data
        ).then((data: any) => {
            resolve(data)
        }).catch((err: any) => {
            reject(err)
        });

    })
}

export const logoutRequest = (aToken: any) => {

    return new Promise<any>(async (resolve, reject) => {

        await baseUrlAxios.post('auth/logout', null,
            {headers: { Authorization: `Bearer ${aToken}` } }
        ).then((data: any) => {
            resolve(data)
        }).catch((err: any) => {
            reject(err)
        });

    })
}

export const save = async (key: string, value: string): Promise<any> => {
    await SecureStore.setItemAsync(key, value)
}

export const getValueFor = async (key: string): Promise<any> => {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        // alert("Here's your value\n" + result);
        return result
    } else {
        alert('No values stored under that key.');
    }
}

export const deleteValueFor = async (key: string): Promise<any> => {
    await SecureStore.deleteItemAsync(key)
}