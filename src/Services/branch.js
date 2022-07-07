import { proxy } from "../Utils/Constants/Proxy";

const headers = {
    Accept: "application/json",
    "content-type": "application/json",
  };
  
export const getBranchs = async ()  => {
    
    var request = {
        method: "GET",
        headers: headers,
        redirect: "follow",
      };

    let response = undefined;
    response = await fetch(
      `${proxy.url}/branches/`,
      request
    );

    if (!response.ok) throw new Error();

    return response.json();
    
  }

  export const getCommitsfromBranch = async (branch) =>  {    
    var request = {
        method: "GET",
        headers: headers,
        redirect: "follow",
    };

    let response = undefined;
    response = await fetch(
    `${proxy.url}/branches/`+branch+`/commits`,
    request
    );

    if (!response.ok) throw new Error();

    return response.json();
    
  }