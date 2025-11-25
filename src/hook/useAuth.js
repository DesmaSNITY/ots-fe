import { useState } from "react";
import { loginApi } from "../api/apiLogin";

export default function useAuth() {
    const [isLoading, setLoading] = useState(false);

    const login = async ({nim, pin}) => {
        setLoading(true);
        try{
            const data = await loginApi({nim, pin});
            console.log(data);
        }catch(e){
            console.log(e);
        }finally {
            setLoading(false);
        }
    }

    return(login, isLoading)
}