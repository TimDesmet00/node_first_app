import jsonfile from "jsonfile";

export default function (app) {
  const file_path = "./DB/users.json";

  app.get("/users", (req, res) => {
    console.log("fetching all users");

    // jsonfile reading
    jsonfile.readFile(file_path, function (err, content) {
      // send file contents back to sender
      res.send(content);
    });
  });

  app.post("/users/new", (req, res) => {
    let { email, username } = req.body;
    // jsonfile reading
    jsonfile.readFile(file_path, function (err, content) {
      // add new user
      content.push({ email, username });

      console.log("added " + email + "to DB");

      // jsonfile writing
      jsonfile.writeFile(file_path, content, function (err) {
        console.log(err);
        res.send({ status: "200", data: req.body });
      });
    });
  });
}
