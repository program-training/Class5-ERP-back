import cors, { CorsOptions } from "cors";

const whiteList = ["http://localhost:5173"];

const corsOptions: CorsOptions = {
  origin: whiteList,
};

const corsHandler = cors(corsOptions);

export default corsHandler;
