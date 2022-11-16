
import "dotenv/config";
import expres from "express";
import cors from "cors";
import { router } from "./routes/user.routes";

const PORT = process.env.PORT || 3001;
const app = expres();

app.use(cors());


app.listen(PORT, () => {
    console.log(`RUN ON PORT ${PORT}`);

})

app.use(router)


