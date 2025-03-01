const pool = require("./pool");

module.exports.getUserByUname = async function (uname) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users_and_passwords WHERE username = $1",
      [uname]
    );
    return rows[0];
  } catch (err) {
    console.error(err);
  }
};

module.exports.getUserById = async function (uId) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users_and_passwords WHERE id = $1",
      [uId]
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
  salt
) {
  try {
    const complexQuery =
      "INSERT INTO users_and_passwords (fullname, membership_status, username, hash, salt) VALUES ($1, $2, $3, $4, $5);";
    await pool.query(complexQuery, [fullname, status, uname, hash, salt]);
  } catch (err) {
    console.error(err);
  }
};
