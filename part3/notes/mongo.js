const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit();
}

const password = process.argv[2];

const url =
  "mongodb+srv://anantacodes:JHA2k75ReDoishgC@firstcluster.kbjdkfq.mongodb.net/noteApp?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "HTML is easy !",
  important: false,
});

const note2 = new Note({
  content: "Another note !!!",
  important: false,
});
const note3 = new Note({
  content: "Third note !!!",
  important: true,
});
const note4 = new Note({
  content: "is this another note !!!",
  important: false,
});
const note5 = new Note({
  content: "wow, a fifth note !!!",
  important: true,
});

// note5.save().then((result) => {
//   console.log("Note saved!", result);
//   mongoose.connection.close();
// });

Note.find({}).then((result) => {
  result.forEach((note) => console.log(note));
  mongoose.connection.close();
});
