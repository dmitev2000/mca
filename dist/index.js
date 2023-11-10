"use strict";
const LINK = "https://interview-task-api.mca.dev/qr-scanner-codes/alpha-qr-gFpwhsQ8fkY1";
const format = "    ";
function PrintData(data, category) {
    console.log(".", category);
    data
        .sort((product1, product2) => product1.name.localeCompare(product2.name))
        .forEach((product) => {
        console.log(`... ${product.name}`);
        console.log(`${format}Price: $${product.price.toFixed(1)}`);
        console.log(`${product.description.length > 10
            ? `${format}${product.description.substring(0, 10)}...`
            : `${format}${product.description}`}`);
        console.log(`${format}Weight: ${product.weight && !isNaN(product.weight)
            ? `${product.weight}g`
            : "N/A"}`);
    });
}
function PrintStats(data) {
    console.log(`Domestic cost: $${data
        .filter((product) => product.domestic)
        .reduce((acc, product) => {
        return acc + product.price;
    }, 0)
        .toFixed(1)}`);
    console.log(`Imported cost: $${data
        .filter((product) => !product.domestic)
        .reduce((acc, product) => {
        return acc + product.price;
    }, 0)
        .toFixed(1)}`);
    console.log(`Domestic count: ${data.filter((product) => product.domestic).length}`);
    console.log(`Imported count: ${data.filter((product) => !product.domestic).length}`);
}
function Main() {
    fetch(LINK)
        .then((res) => res.json())
        .then((products) => {
        PrintData(products.filter((product) => product.domestic), "Domestic");
        PrintData(products.filter((product) => !product.domestic), "Imported");
        PrintStats(products);
    })
        .catch((error) => {
        console.error(error);
    });
}
Main();
//# sourceMappingURL=index.js.map