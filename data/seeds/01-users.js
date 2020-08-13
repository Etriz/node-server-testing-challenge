exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { id: 1, first_name: "eric", last_name: "brooks", email: "EricBrooks@gmail.com" },
        { id: 2, first_name: "kade", last_name: "lindgren", email: "KadeLindgren@gmail.com" },
        { id: 3, first_name: "oscar", last_name: "wiza", email: "OscarWiza@gmail.com" },
      ]);
    });
};
