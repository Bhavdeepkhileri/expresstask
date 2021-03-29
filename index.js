const express = require("express");
const envVariable = require("dotenv");
const path = require("path");
const {
  aInLanguage,
  concatLanguage,
  countryCode,
  phoneNumber,
  numberModification,
} = require("./utility");

envVariable.config();
const app = express();
app.use(express.json());
//app.set('etag', false);;

const port = process.env.PORT;

var arrayOfKey = [
  "name",
  "number1",
  "number2",
  "languages",
  "dialects",
  "phoneNumber",
];

app.get("/", (req, res) => {
  try {
    res.send("Hello World!");
  } catch (err) {
    console.log("someone made a booo booo", err);
  }
});

app.get("/api/v1/welcome", (req, res) => {
  try {
    res.send("insert some welcome message");
  } catch (err) {
    console.log("someone made a booo booo", err);
  }
});

app.get("/api/v1/menu", (req, res) => {
  try {
    res.sendFile(path.join(__dirname + "/menu.html"));
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/v1/getData", (req, res) => {
  try {
    let Obj = req.body;
    let missingData = [];
    for (let i = 0; i < arrayOfKey.length; i++) {
      if (Obj.hasOwnProperty(arrayOfKey[i])) continue;
      else {
        missingData.push(arrayOfKey[i]);
      }
    }
    if (missingData.length > 0) {
      let temp = {
        message: "Required Fields Missing",
        data: missingData,
        status: "Required Param Missing",
      };
      let tempString = JSON.stringify(temp);
      res.status(422);
      res.json(temp);
      return;
    } else {
      let temp = {
        message: "Hi " + Obj["name"],
        status: "Success",
        data: {},
      };
      temp["data"]["languageWithA"] = aInLanguage(Obj);
      temp["data"]["allLanguage"] = concatLanguage(Obj);
      temp["data"]["countryCode"] = countryCode(Obj);
      temp["data"]["phone"] = phoneNumber(Obj);
      let n1 = "" + Obj["number1"];
      let n2 = "" + Obj["number2"];
      if (n1.length == n2.length) {
        temp["data"]["number"] = numberModification(Obj);
      } else {
        console.log("length of number is not same");
        res.send("length of number is not same");
        return;
      }
      res.json(temp);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (username !== "bhavdeep0") {
      throw Error("username not found");
    }
    if (password !== "12345") {
      throw Error("password is wrong");
    }
    res.status(200).send({ Message: "Login Successful" });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/*", (req, res) => {
  try {
    res.sendStatus(404).end();
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log("port sever running");
});
