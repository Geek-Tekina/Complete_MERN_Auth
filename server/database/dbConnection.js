import mongoose from "mongoose";

export const connection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "MERN_COMPLETE_AUTHENTICATION",
    })
    .then(() => {
      console.log(`
    DATABASE CONNECTION: SUCCESS ✅
    ------------------------------------------
    DB NAME:  MERN_COMPLETE_AUTHENTICATION
    STATUS:    Connected
    `);
    })
    .catch((err) => {
      console.log(`
        DATABASE CONNECTION: FAILED ❌
    ------------------------------------------
    ERROR:     ${err}
    SUGGESTION: Check your Mongo URI or network.
    `);
    });
};
