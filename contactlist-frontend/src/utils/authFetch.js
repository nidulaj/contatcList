import axios from 'axios'
export const authFetch = async (config) => {
    try{
        const token = localStorage.getItem("accessToken");
        config.headers = {
            ...config.headers,
            Authorization : `Bearer ${token}`,
            "Content-Type": "application/json",
        }

        return await axios(config)
    } catch (err){
        if(err.response && err.response.status === 403 && !config._retry){
            config._retry = true;

            const refreshToken = localStorage.getItem("refreshToken");

            try{
                const refreshRes = await axios.post("http://localhost:5000/auth/refresh", {
                    refreshToken,
                })

                const newAccessToken = refreshRes.data.accessToken;
                localStorage.setItem("accessToken", newAccessToken)

                config.headers.Authorization = `Bearer ${newAccessToken}`
                return await axios(config)

            } catch (refershErr){
                console.error("Refresh token failed : ", refershErr)
                localStorage.removeItem("accessToken")
                localStorage.removeItem("refreshToken");
                window.location.href = "/"

                return Promise.reject(refershErr)
            }
        }

        return Promise.reject(err)
    }
}