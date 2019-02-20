function query(sql, single) {
  return new Promise((resolve, reject) => {
    var callback = (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    };

    if (single) db.get(sql, callback);
    else db.all(sql, callback);
  });
}

const root = {
  players: args => {
    return query(
      `SELECT * FROM players LIMIT ${args.offset}, ${args.limit}`,
      false
    );
  },
  player: args => {
    return query(`SELECT * FROM players WHERE id='${args.id}'`, true);
  },
  rankings: args => {
    return query(
      `SELECT r.date, r.rank, r.points,
              p.id, p.first_name, p.last_name, p.hand, p.birthday, p.country
      FROM players AS p
      LEFT JOIN rankings AS r
      ON p.id=r.player
      WHERE r.rank=${args.rank}`,
      false
    ).then(rows =>
      rows.map(result => {
        return {
          date: result.date,
          points: result.points,
          rank: result.rank,
          player: {
            id: result.id,
            first_name: result.first_name,
            last_name: result.last_name,
            hand: result.hand,
            birthday: result.birthday,
            country: result.country
          }
        };
      })
    );
  }
};

module.exports = root;