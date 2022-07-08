import { proxy } from "../Utils/Constants/Proxy";

const headers = {
    Accept: "application/json",
    "content-type": "application/json",
  };
  
export const getPullRequests = async ()  => {
    
    var request = {
        method: "GET",
        headers: headers,
        redirect: "follow",
      };

    let response = undefined;
    response = await fetch(
      `${proxy.url}/prs`,
      request
    );

    if (!response.ok) throw new Error();

    return response.json();

  }

  export const createPullRequest = async (datos) => {

    var opciones = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(datos),
      redirect: "follow",
    };
    
    var resultado = await fetch(`${proxy.url}/prs/`, opciones);
    if (!resultado.ok) throw new Error("Error al realizar la petición");
    return resultado;
  };
  

  export const changeStatusPrs = async (id,datos) => {

    var opciones = {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(datos),
      redirect: "follow",
    };
    
    var resultado = await fetch(`${proxy.url}/prs/update-partial/`+id+`/`, opciones);
    if (!resultado.ok) throw new Error("Error al realizar la petición");
    return resultado;
  };

  export const mergeChangeStatusPrs = async (id,datos) => {

    var opciones = {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(datos),
      redirect: "follow",
    };
    
    var resultado = await fetch(`${proxy.url}/prs/merge/`+id+`/`, opciones);
    if (!resultado.ok) throw new Error("Error al realizar la petición");
    return resultado;
  };
  