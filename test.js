const axios = require("axios");


for(let i = 0 ; i < 1000 ; i ++){
    axios.get("http://localhost:1234/" , {
        params : {
            name : i.toString() + "_"
        }
    }).then((e)=>{
        console.log(e.data)
    })
}