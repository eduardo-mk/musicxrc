import express from 'express';
import bodyParser from 'body-parser';
import { musicRouter } from './music/musicApp'
import { ErrorHandleFunction } from 'connect';
const app = express()
app.use(bodyParser({ extended: true }))

app.get("/", function (req: express.Request, res: express.Response) {
   res.status(200).send({ msg: "Home page" })
})
app.use("/music", musicRouter)
 
app.listen(process.env.PORT || 3001, function (error: ErrorEvent) {
   if (error) console.log(error)
   else {
      console.log("http-server-running")
   }
})