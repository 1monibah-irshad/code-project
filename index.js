const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const path = require("path");
const Chat = require("./models/chat");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const expressError = require("./Expresserror");

app.get("/", (req, res) => {
  res.render("home.ejs");
});
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/chatbot");
}
main().catch((err) => console.log(err.message));

app.get("/chats", async (req, res) => {
  let chats = await Chat.find();

  res.render("index.ejs", { chats });
});
app.get("/chats/new", (req, res) => {
  res.render("newChat.ejs");
});

app.post("/chats", (req, res) => {
  let { from, to, message } = req.body;

  let newChat = new Chat({
    from: from,
    to: to,
    message: message,
    created_at: new Date(),
  });

  newChat
    .save()
    .then((result) => {
      console.log("Chat saved:", result);
      res.redirect("/chats");
    })
    .catch((err) => {
      console.log("Error saving chat:", err);
      res.status("500").send("Error saving chat");
    });
});
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("editChat.ejs", { chat });
});

app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { message: newMessage } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { message: newMessage },
    { runValidators: true, new: true }
  );
  console.log(newMessage);
  res.redirect("/chats");
});

app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  await Chat.findByIdAndDelete(id);
  console.log("Chat deleted:", id);
  res.redirect("/chats");
});

app.listen("8080", () => {
  console.log("app is listening on http://localhost:8080/");
});
