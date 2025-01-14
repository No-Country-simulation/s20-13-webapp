import  server from './server'
import {config} from "dotenv"
config()
const port=process.env.PORT || 3000

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
