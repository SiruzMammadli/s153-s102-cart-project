async function getProducts() {
  const getData = await fetch("./products.json");
  return await getData.json();
}

export {
    getProducts,
}