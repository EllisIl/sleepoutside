const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) { // NOT EXPORTED
  if (res.ok) {
      return res.json();
  } else {
      throw new Error("Bad Response");
  }
}

export async function getData(category) {
  try{
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;}
  catch(error){
    console.log(error)
  }
  
}

export async function findProductById(id) { // Can be used for more than tents
  const response = await fetch(baseURL + `product/${id}`);
  const data = await convertToJson(response);
  return data.Result; // returns products based on item id
}