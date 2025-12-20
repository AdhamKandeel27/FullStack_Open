import "dotenv/config";

const PORT = process.env.PORT;
const DATABASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.DATABASE_URL
    : process.env.TEST_DATABASE_URI;

export { PORT, DATABASE_URL };
