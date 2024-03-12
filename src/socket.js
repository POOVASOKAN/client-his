import { io } from "socket.io-client";


// const URL = "http://localhost:3001"
const URL = "https://server-his.onrender.com"

export const socket = io(URL,{
    autoConnect:false
})  