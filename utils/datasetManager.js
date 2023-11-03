async function getDataLib(datasetName){
    let filepath = "../dataset/" + process.env.BU + "-" + process.env.ENV + "/" + datasetName + ".json";
    return JSON.parse(JSON.stringify(require(filepath)));
}

module.exports = {
    getDataLib
};