const db = require("../data/dbConfig");

const getAll = () => {
  return db("users");
};
const findBy = (data) => {
  return db("users").where(data).first();
};
const add = async (data) => {
  const id = await db("users").insert(data);
  return findBy({ id });
};
const remove = async (id) => {
  const data = await findBy({ id });
  const dataDel = await db("users").where({ id }).del();
  return data;
};
module.exports = { getAll, findBy, add, remove };
