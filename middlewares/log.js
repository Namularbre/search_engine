async function log(req, res, next) {
    const requestData = {
        url: req.url,
        method: req.method,
        query: req.query,
        params: req.params,
        body: req.body,
        date: new Date().toLocaleDateString()
    };
    console.log(requestData);
    next();
}

module.exports = log;
