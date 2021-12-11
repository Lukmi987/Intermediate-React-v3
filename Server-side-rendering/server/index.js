import React from 'react-dom'
import express from "express";
import { renderToNodeStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import fs from "fs";
import App from "../src/App";

const PORT = process.env.PORT || 3000;

const html = fs.readFileSync("dist/index.html").toString();

const parts = html.split("not rendered");

const app = express();

app.use("/dist", express.static("dist"));
app.use((req, res) => {
  //First piece we have alredeay prerendered coz it is coming fro index.html
  //Now the user is going to get immediately their CSS and everything else in the head tag, So we will start donwloading stuff immediaty
  res.write(parts[0]);
  const staticContext = {};
  const reactMarkup = (
    <StaticRouter url={req.url} context={staticContext}>
      <App />
    </StaticRouter>
  );

  // this stream is hooked up to my response to the user parts[0], 
  const stream = renderToNodeStream(reactMarkup);
  stream.pipe(res, { end: false });
  // once the react app fully rendered  we can say
  stream.on("end", () => {
    res.status(staticContext || 200);
    res.write(parts[1]);
    res.end();
  })
});

console.log(`listening on http://localhost:${PORT}`);
app.listen(PORT);

//No to use server-side rendering for other components we can do
// app.use(express.static("dist/index.html"));