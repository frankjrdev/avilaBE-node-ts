import "dotenv/config";
import express from "express";
import cors from "cors";
import { routerUser } from "./routes/user.routes";
import db from "./db/db";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(routerUser);

//DB connection
db().then(() => console.log("Conection Ready"));

app.listen(PORT, () => {
  console.log(`RUN ON PORT ${PORT}`);
});

app.get('', (_req, res) => {
  console.log('Apps Working')
  res.send('Act')
})

