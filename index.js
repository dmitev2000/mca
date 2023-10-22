import axios from "axios";

const URL = "https://interview-task-api.mca.dev/qr-scanner-codes/alpha-qr-gFpwhsQ8fkY1";

const format = "    ";

const FetchData = async () => {
  try {
    const res = await axios.get(URL, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch data.");
  }
};

const PrintData = (data, category) => {
  console.log(".", category);
  data
    .sort((item1, item2) => {
      return item1.name.localeCompare(item2.name);
    })
    .forEach((element) => {
      console.log(`... ${element.name}`);
      console.log(`${format}Price: $${element.price.toFixed(1)}`);
      console.log(
        `${
          element.description.length > 10
            ? `${format}${element.description.substring(0, 10)}...`
            : `${format}${element.description}`
        }`
      );
      console.log(
        `${format}Weight: ${
          element.weight && !isNaN(element.weight)
            ? `${element.weight}g`
            : "N/A"
        }`
      );
    });
};

const PrintStats = (data) => {
  console.log(
    `Domestic cost: $${data
      .filter((element) => element.domestic)
      .reduce((acc, element) => {
        return acc + element.price;
      }, 0)
      .toFixed(1)}`
  );
  console.log(
    `Imported cost: $${data
      .filter((element) => !element.domestic)
      .reduce((acc, element) => {
        return acc + element.price;
      }, 0)
      .toFixed(1)}`
  );
  console.log(
    `Domestic count: ${data.filter((element) => element.domestic).length}`
  );
  console.log(
    `Imported count: ${data.filter((element) => !element.domestic).length}`
  );
};

const Main = async () => {
  let exit = 0;
  try {
    const data = await FetchData();
    PrintData(
      data.filter((item) => item.domestic),
      "Domestic"
    );
    PrintData(
      data.filter((item) => !item.domestic),
      "Imported"
    );
    PrintStats(data);
  } catch (error) {
    console.log(error);
    exit = -1;
  } finally {
    console.log(`\nFinished with exit code ${exit}`);
  }
};

Main();
