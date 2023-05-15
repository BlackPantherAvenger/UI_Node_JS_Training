const fs = require("fs");

function rqListener(req, res) {
  // rqListener - Request Listener, req - request, res - response
  console.log("req", req.url, req.method, req.headers);
  //   process.exit()
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>My First Node.js Page</title></head>");
    res.write("<body>");
    res.write(
      "<form action='/message' method='POST'><input type='text' name='message'/> <button type='submit'>Send</button></form>"
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunks) => {
      body.push(chunks);
    });
    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      console.log( "message", message)
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-type", "text-html");
  res.write("<html>");
  res.write("<head><title>My First Node.js Page</title></head>");
  res.write("<body>");
  res.write("<h1 class='test'>This is a first Node.js Page</h1>");
  res.write("</body>");
  res.write("</html>");
  res.end();
}

// module.exports = rqListener;
// module.exports = {
//     handler: rqListener,
//     someText: "here is a some text"
// };
exports.handler = rqListener;
exports.someText = "here is a some text";
