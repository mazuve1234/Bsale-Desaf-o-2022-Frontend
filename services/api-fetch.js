import { BASE_URI} from "../config.js";

export default async function apiFetch(endPoint, {method, headers, body} = {}) {


  const config = {
    method: method || (body ? "POST": "GET"),
  }

  const response = await fetch(BASE_URI+endPoint, config);
  let data;
  if (!response.ok) {
    try {
      data = await response.json();
    } catch (error) {
      throw new Error(response.statusText);
    }
    
    throw new Error(JSON.stringify(data));
  }

  try {
    data = await response.json();
  } catch (error) {
    data = response.statusText;
  }
  return data;
}
