import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { PORT } from "./utils/model.js";
import adminRoute from "./router/admin.router.js"
import eventRouter from "./router/event.router.js";
import swaggerRouter from "./swagger.js"


const app = express();
app.use( fileUpload() );
app.use( express.json() );
app.use( cors() )

app.use("/api-docs", swaggerRouter)
app.use(adminRoute)
app.use(eventRouter)



app.listen(PORT, () => console.log("server url: http://localhost:5000"))