import { useState} from "react";
import httpClient from "../store/httpClient";


const useRData = () => {

  const [data, setData] = useState({});
  // const [showModal, setShowModal] = useState(false)

//   const valueIsValid = validateValue(inputState.value);
//   const hasError = !valueIsValid && inputState.isTouched;


  const fetchData = async (url)=>{
    try {
        const response = await httpClient.get(url);  
        // const response = await httpClient.get("//localhost:5000/profile");  
        // console.log(response)

        setData(response)
      } catch (error) {
        console.log(error.response.data.error)        
      }
  }

  return {
    fetchData,
    data
    // showModal
  }
}

export default useRData;