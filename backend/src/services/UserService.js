import User from '../models/User.js';

export const findByUsernameOrEmail = async (identifier) => {
  const q = { $or: [ { username: identifier.toLowerCase() }, { email: identifier.toLowerCase() } ] };
  return User.findOne(q).lean();
};

export const isUsernameTaken = async (username) => !!(await User.exists({ username: username.toLowerCase() }));
export const isEmailTaken = async (email) => !!(await User.exists({ email: email.toLowerCase() }));

export const createUser = async ({ username, email, passwordHash }) => {
  const user = await User.create({ username: username.toLowerCase(), email: email.toLowerCase(), passwordHash });
  return { id: user._id.toString(), username: user.username, email: user.email };
};