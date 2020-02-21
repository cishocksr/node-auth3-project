const db = require('../data/dbConfig');

function find() {
  return db('users').select();
}

function findById() {
  return db('users')
    .where({ id })
    .first();
}

async function add(user) {
  const [id] = await db('users').insert(user);
  return db('users')
    .where({ id })
    .first();
}

async function update(id, body) {
  await db('users')
    .where({ id })
    .update(body);
}

async function remove(id) {
  await db('users')
    .where({ id })
    .del();
}

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};
