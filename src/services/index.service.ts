import axios from "axios";

export const baseUrlAxios = axios.create({
    baseURL: "http://192.168.0.172:3000/",
    headers: {
        'Content-Type': 'application/json'
    },
})

// baseUrlAxios.interceptors.response.use((res) => {
//     return res
//     },
//     async (err) => {
//         const rToken = await getValueFor('rToken')
//         return new Promise<any>(async (resolve, reject) => {

//             await baseUrlAxios.post('auth/refresh',{},
//             {headers: { Authorization: `Bearer ${rToken}` } }
//             ).then((data: any) => {
//                 resolve(data)
//             }).catch((err: any) => {
//                 reject(err)
//             });
    
//         })
//     }
// )
