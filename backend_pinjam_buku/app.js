const express = require("express");
const app = express();
const bodyParser = require("body-parser")

const memberRoutes = require("./routes/members")
const bookRoutes = require("./routes/books")
const borrowRoutes = require("./routes/borrows")
const returnRoutes = require("./routes/returns")

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const swagger = require("swagger-ui-express")
const apiDocs = require("./apiDocs.json")
app.use("/api-docs",swagger.serve,swagger.setup(apiDocs));

app.use("/member",memberRoutes)
app.use("/book",bookRoutes)
app.use("/borrow",borrowRoutes)
app.use("/return",returnRoutes)


app.use((req,res,next) => {
    const error = new Error("Not found");
    error .status = 404;
    next(error);
})

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        statusCode:error.status,
        message:error.message
    });
})



module.exports = app;
