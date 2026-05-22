const { default: mongoose } = require("mongoose");
const Chat = require("./models/chat");
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/chatbot");
  console.log("connection successful");
}
main().catch((err) => console.log(err.message));
let allChats = [
  {
    from: "Haroon",
    to: "Moosa",
    message: "Bro did you finish your project?",
    created_at: new Date(),
  },
  {
    from: "Moosa",
    to: "Haroon",
    message: "Almost done bro, just fixing some bugs.",
    created_at: new Date(),
  },
  {
    from: "Haroon",
    to: "Moosa",
    message: "Nice! Want to grab a chai later?",
    created_at: new Date(),
  },
  {
    from: "Moosa",
    to: "Haroon",
    message: "Sure bro, I’m free after 5 PM.",
    created_at: new Date(),
  },
  {
    from: "Haroon",
    to: "Ali",
    message: "Are you joining our new coding group?",
    created_at: new Date(),
  },
  {
    from: "Ali",
    to: "Haroon",
    message: "Yeah bro, I’ll join tonight after dinner.",
    created_at: new Date(),
  },
  {
    from: "Moosa",
    to: "Haroon",
    message: "Yo bro, your DSA practice going well?",
    created_at: new Date(),
  },
  {
    from: "Haroon",
    to: "Moosa",
    message: "Yeah bro, just solved binary search finally 😎",
    created_at: new Date(),
  },
  {
    from: "Ali",
    to: "Moosa",
    message: "Did you guys check that new MERN tutorial?",
    created_at: new Date(),
  },
  {
    from: "Moosa",
    to: "Ali",
    message: "Not yet bro, Haroon said it's good.",
    created_at: new Date(),
  },
];
Chat.insertMany(allChats);
