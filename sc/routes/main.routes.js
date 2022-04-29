module.exports = app => {
    /* 404 Page Handler */
    app.use((err, req, res, next) => {
        res.set({
            "Content-Type": "application/json",
            "X-Powered-By": "-"
        });
        res.status(err.statusCode).send(err)
    });
    /* end 404 Page Handler*/
}