const rootUser = "root";
const rootPassword = "password";
// const admin = db.getSiblingDB("admin");
db.auth(rootUser, rootPassword);

db.createUser(
  {
    user: "user",
    pwd: "password",
    roles: [
      {
        role: "readWrite",
        db: "prediks"
      }
    ]
  }
)
