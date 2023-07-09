const fetchCurrentData = async (url) => {
  console.log("fetchData url: ", url);

  try {
    const data = await fetch(url)
      .then((response) => response.json())
      .then((data) => data);

    console.log(data);
    return data;
  } catch (err) {
    console.log("There was an error while fetching data: ", err);
  }
};

const fetchDailyData = async () => {
  try {
    const data = await fetch(" https://api.covidtracking.com/v1/us/daily.json")
      .then((response) => response.json())
      .then((data) => data);

    console.log(data);
    return data;
  } catch (err) {
    console.log("There was an error while fetching daily data: ", err);
  }
};

const fetchStates = async () => {
  try {
    const data = await fetch(
      "https://api.covidtracking.com/v1/states/info.json"
    )
      .then((response) => response.json())
      .then((data) => data);

    let modifiedData = data.map((item) => {
      return { name: item.name, state: item.state };
    });

    modifiedData.unshift({ name: "United State of America", state: "USA" });

    return modifiedData;
  } catch (error) {
    console.log("There was an error while fetching states data: ", error);
  }
};

const fetchSingleStateData = async (state) => {
  try {
    const data = await fetch(
      `https://api.covidtracking.com/v1/states/${state}/current.json`
    )
      .then((response) => response.json())
      .then((data) => data);
    console.log("fetchSingleStateData: ", data);

    const modifiedData = {
      positive: data.positive,
      death: data.death,
      state: data.state,
    };
    console.log("fetchSingleStateData modifiedData: ", modifiedData);
    return modifiedData;
  } catch (error) {
    console.log("There was an  error while fetching the state data: ", error);
  }
};

export { fetchCurrentData, fetchDailyData, fetchStates, fetchSingleStateData };
