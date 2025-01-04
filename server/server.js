import { app } from "./app.js";
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Hey Mate, your server is running on ${port}`);
});
