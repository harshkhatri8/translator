import axios from "axios";
function FetchApi(){
    

    const encodedParams = new URLSearchParams();
    encodedParams.set('q', 'English is hard, but detectably so');
    
    const options = {
      method: 'POST',
      url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/detect',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': '1c52cf6312msh7e1d5ab1d1906ebp1aab38jsn792e3a89f476',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
      },
      data: encodedParams,
    };
    const data = async()=>{
        try {
            const response = await axios.request(options);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }

    }
    data();
}

export default FetchApi;