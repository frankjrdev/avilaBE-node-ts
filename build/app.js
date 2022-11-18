"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = require("./routes/user.routes");
const db_1 = __importDefault(require("./db/db"));
const PORT = process.env.PORT || 3001;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(user_routes_1.routerUser);
//DB connection
(0, db_1.default)().then(() => console.log("Conection Ready"));
app.listen(PORT, () => {
    console.log(`RUN ON PORT ${PORT}`);
});
app.get('', (_req, res) => {
    console.log('Apps Working');
    res.send('Act');
});
