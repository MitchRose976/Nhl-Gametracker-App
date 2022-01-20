const axios = require("axios");

// Functions to seed database and collection
const postDataToMongoDB = async (client, database, collection, data) => {
    const results = await client
        .db(database)
        .collection(collection)
        .insertMany(data);

    console.log(`${results.insertedCount} new teams added`);
    console.log("Result IDs: ", results.insertedIds);
};

const getData = async (url) => {
    let data = await axios.get(url).then(response => response.data);
    return data;
};

module.exports = { postDataToMongoDB, getData };
