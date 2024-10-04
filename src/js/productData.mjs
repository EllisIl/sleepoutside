function convertToJson(res) { // NOT EXPORTED
  if (res.ok) {
      return res.json();
  } else {
      throw new Error("Bad Response");
  }
}

export function getData(category = "tents") { // get tent data
return fetch(`../json/${category}.json`)
  .then(convertToJson)
  .then((data) => data);
}

export async function findProductById(id) { // Can be used for more than tents
  const products = await getData(); 
  return products.find((item) => item.Id === id); // returns products based on item id
}