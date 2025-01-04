import { app } from "./app.js";
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`
    SERVER STATUS: ONLINE 🟢
    ------------------------------------------
    URL:       http://localhost:${process.env.PORT}
    TIME:      ${new Date().toLocaleTimeString()}
  `);
});
