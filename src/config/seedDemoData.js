const bcrypt = require("bcrypt");
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRqst");

const demoPassword = "Demo@12345";
const legacyProfileImages = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85",
];

const demoUsers = [
  {
    firstName: "Alex",
    lastName: "Developer",
    emailId: "demo.alex@coherent.dev",
    age: 28,
    gender: "other",
    about: "Full-stack developer who enjoys solving Node.js and React problems.",
    skills: ["JavaScript", "React", "Node.js"],
    photoURL: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85",
  },
  {
    firstName: "Jordan",
    lastName: "Backend",
    emailId: "demo.jordan@coherent.dev",
    age: 30,
    gender: "other",
    about: "Backend engineer focused on APIs, databases, and reliable systems.",
    skills: ["Node.js", "MongoDB", "AWS"],
    photoURL: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
  },
  {
    firstName: "Samara",
    lastName: "Frontend",
    emailId: "demo.samara@coherent.dev",
    age: 26,
    gender: "female",
    about: "Frontend developer interested in accessible and useful interfaces.",
    skills: ["React", "CSS", "Testing"],
    photoURL: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=85",
  },
  {
    firstName: "Taylor",
    lastName: "Cloud",
    emailId: "demo.taylor@coherent.dev",
    age: 32,
    gender: "other",
    about: "Cloud engineer who helps teams ship and operate production services.",
    skills: ["AWS", "Docker", "DevOps"],
    photoURL: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=85",
  },
];

const seedDemoData = async () => {
  if (process.env.SEED_DEMO_DATA !== "true") return;

  const password = await bcrypt.hash(demoPassword, 10);
  const users = {};

  for (const demoUser of demoUsers) {
    const { photoURL, ...userData } = demoUser;
    users[demoUser.emailId] = await User.findOneAndUpdate(
      { emailId: demoUser.emailId },
      { $set: { photoURL }, $setOnInsert: { ...userData, password } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );
  }

  const legacyUsers = await User.find({ photoURL: "http://defaultprofileimage.jpg" }).select("_id");
  await Promise.all(legacyUsers.map((user, index) =>
    User.updateOne(
      { _id: user._id },
      { $set: { photoURL: legacyProfileImages[index % legacyProfileImages.length] } },
    )
  ));

  const duplicateLegacyUsers = await User.find({ photoURL: legacyProfileImages[0] }).select("_id");
  await Promise.all(duplicateLegacyUsers.map((user, index) =>
    User.updateOne(
      { _id: user._id },
      { $set: { photoURL: legacyProfileImages[(index + 1) % legacyProfileImages.length] } },
    )
  ));

  const alex = users["demo.alex@coherent.dev"];
  const jordan = users["demo.jordan@coherent.dev"];
  const samara = users["demo.samara@coherent.dev"];

  await ConnectionRequest.deleteMany({
    $or: [{ fromUserId: alex._id }, { toUserId: alex._id }],
  });

  await ConnectionRequest.updateOne(
    { fromUserId: alex._id, toUserId: jordan._id },
    { $set: { status: "accepted" } },
    { upsert: true },
  );

  await ConnectionRequest.updateOne(
    { fromUserId: samara._id, toUserId: alex._id },
    { $set: { status: "interested" } },
    { upsert: true },
  );

  console.log("Demo data ready: demo.alex@coherent.dev / Demo@12345");
};

module.exports = seedDemoData;
