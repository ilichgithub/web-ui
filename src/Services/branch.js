import { proxy } from "../Utils/Constants/Proxy";

const headers = {
    Accept: "application/json",
    "content-type": "application/json",
  };
  
export const buscar = async ()  => {
    
    var request = {
        method: "GET",
        headers: headers,
        redirect: "follow",
      };

    let response = undefined;
    response = await fetch(
      `${proxy.url}/branch`,
      request
    );

    if (!response.ok) throw new Error();

    return response.json();
    
  }