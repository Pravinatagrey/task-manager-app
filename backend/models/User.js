const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/* This file defines the Mongoose schema and model for users in the task management application. */
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

/* The pre-save hook is used to hash the user's password before saving it to the database.*/
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/* The matchPassword method is defined on the User schema to compare a given password with the hashed password stored in the database. */
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);