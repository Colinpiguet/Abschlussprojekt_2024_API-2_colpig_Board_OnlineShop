const getDB = require('./db/mongodb');

const userSchema = new getDB.Schema({
    username:{type: String, required: true, unique: true},
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true, unique: true },
    isAdmin:{
        type: Boolean,
        default: false,
    },
  },
  { timestamps: true } 
);

module.exports = getDB.model("User", UserSchema);