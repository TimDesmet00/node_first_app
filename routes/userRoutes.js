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

      console.log("added " + email + " to DB");

      // jsonfile writing
      jsonfile.writeFile(file_path, content, function (err) {
        console.log(err);
        res.send({ status: "200", data: req.body });
      });
    });
  });

  app.delete("/users/destroy", (req, res) => {
    let email = req.body.email;

    jsonfile.readFile(file_path, function (err, content) {
      for (let i = 0; i < content.length; i++) {
        if (content[i].email === email) {
          console.log("removing" + content[i].email + " from DB");
          content.splice(i, 1);
          break;
        }
      }
      jsonfile.writeFile(file_path, content, function (err) {
        console.log(err);
        res.send({ status: "200", data: req.body });
      });
    });
  });

  app.put("/users", (req, res) => {
    let user;
    let username = req.body.username;
    let email = req.query.email;

    jsonfile.readFile(file_path, function (err, content) {
      for (let i = 0; i < content.length; i++) {
        if (content[i].email === req.query.email) {
          console.log(
            "updated user " +
              req.query.email +
              " has now username : " +
              username
          );

          user = content[i];
          user.username = username;
          break;
        }
      }
      jsonfile.writeFile(file_path, content, function (err) {
        console.log(err);
        res.send({ status: "200", data: req.body });
      });
    });
  });

  app.get("/user", (req, res) => {
    let user;
    let email = req.query.email;

    jsonfile.readFile(file_path, function (err, content) {
      for (let i = 0; i < content.length; i++) {
        if (content[i].email === email) {
          console.log("found user " + email);
          console.log(content[i]);
          user = content[i];
          break;
        }
      }
      res.send({ status: "200", data: user });
    });
  });
}
