const pool = require("./pool");

//getting
module.exports.getUserByUname = async function (uname) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users_and_passwords WHERE username = $1",
      [uname],
    );
    return rows[0];
  } catch (err) {
    console.error(err);
  }
};

module.exports.getAllMessages = async function () {
  try {
    const complexQuery = "SELECT * FROM messages;";
    const { rows } = await pool.query(complexQuery);
    return rows;
  } catch (err) {
    console.error(err);
  }
};

module.exports.getUserById = async function (uId) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users_and_passwords WHERE id = $1",
      [uId],
    );
    return rows[0];
  } catch (err) {
    console.error(err);
  }
};

//adding users
module.exports.addNewUser = async function (
  fullname,
  status,
  uname,
  hash,
  salt,
) {
  try {
    const complexQuery =
      "INSERT INTO users_and_passwords (fullname, membership_status, username, hash, salt) VALUES ($1, $2, $3, $4, $5);";
    await pool.query(complexQuery, [fullname, status, uname, hash, salt]);
  } catch (err) {
    console.error(err);
  }
};

//updating
module.exports.changeUserStatus = async function (status, id) {
  try {
    const complexQuery =
      "UPDATE users_and_passwords SET membership_status = $1 WHERE id = $2;";
    await pool.query(complexQuery, [status, id]);
  } catch (err) {
    console.error(err);
  }
};
