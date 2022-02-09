import { StackActions, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Alert } from "react-native";


export const baseUrlAxios = axios.create({
    baseURL: "http://192.168.0.172:3000/",
    headers: {
        'Content-Type': 'application/json'
    },
})

// export const baseUrlAxiosUpload = axios.create({
//     baseURL: "http://192.168.0.172:3000/",
//     headers: {
//         'Content-Type': 'multipart/form-data'
//     },
// })


// baseUrlAxios.interceptors.response.use((res) => {
//     return res
// },
//     async (err) => {
//         const navigation = useNavigation()
//         if (err.response.status === 401) {
//             Alert.alert("session expired, please log in again");
//             navigation.dispatch(
//                 StackActions.replace("Authentication", { screen: "Login" })
//             );
//         }
//         else { 
//             return err
//         }
//     }
// )
