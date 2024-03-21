import axios from "axios";
import { useState } from "react";
import generalConfig from "../config/general";


  const sendRequest = async (url, method = 'GET', requestData = null) => {
     try {
      console.log("iniciando peticion http");
      const response = await axios({
        method: method,
        url: generalConfig.url_base + url,
        data: requestData
      });
      console.log(response);
      return response.data
    } catch (error) {
      console.log(error);
      return {}
    }
  };
  
  export default sendRequest;