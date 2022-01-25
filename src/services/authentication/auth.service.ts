import axios from "axios";
import * as SecureStore from 'expo-secure-store';

export const loginRequest = (data: string) => {
    return new Promise<any>(async (resolve, reject) => {

        await axios({
            method: 'post',
            url: 'http://192.168.0.172:3000/auth/local/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        }).then((data: any) => {
            resolve(data)
        }).catch((err: any) => {
            reject(err)
        });

    })
    
    
}

export const save = async (key:string, value:string):Promise<any> =>  {
    await SecureStore.setItemAsync(key, value)
}

export const getValueFor = async (key:string):Promise<any> => {
    let result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("Here's your value\n" + result);
  } else {
    alert('No values stored under that key.');
  }
}

export const deleteValueFor = async (key:string):Promise<any> => {
    await SecureStore.deleteItemAsync(key)
}