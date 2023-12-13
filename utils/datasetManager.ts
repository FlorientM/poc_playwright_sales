async function getDatalib(path: string, name: string) {
    const filepath = '../dataset/' + path + '/' + name + '.json';
    // const filepath = '../dataset/' + process.env.BU + '-' + process.env.ENV + '/' + path + '/' + name + '.json';
    return JSON.parse(JSON.stringify(require(filepath)));
}

export { getDatalib };