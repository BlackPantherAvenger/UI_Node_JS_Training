const http = require("http");
const rqListener = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<body>");
    res.write("<title>Assignment - 1</title>");
    res.write("</body>");
    res.write(
      '<form action="/create-user" method="POST"><input type="text" name="username"/><button type="submit">Submit</button></form>'
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/users") {
    res.write("<html>");
    res.write("<body>");
    res.write("<title>Assignment - 1</title>");
    res.write("</body>");
    res.write("<ul><li>User 1</li><li>User 2</li><li>User 3</li></ul>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunks) => {
      body.push(chunks);
    });
    return req.on("end", () => {
      const parsedData = Buffer.concat(body).toString();
      const username = parsedData.split("=")[1];
      console.log("username", username);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      res.end();
    });
  }

  res.setHeader("Content-type", "text-html");
  res.write("<html>");
  res.write("<body>");
  res.write("<title>Assignment - 1</title>");
  res.write("</body>");
  res.write("<p>This is first Assignment</p>");
  res.write("</body>");
  res.write("</html>");
};
const server = http.createServer(rqListener);

server.listen(1000);
