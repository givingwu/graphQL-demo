const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    players(offset:Int = 0, limit:Int = 10): [Player]
    player(id:ID!): Player
    rankings(rank:Int!): [Ranking]
  }

  type Player {
    id: ID
    first_name: String
    last_name: String
    hand: String
    birthday: Int
    country: String
  }

  type Ranking {
    date: Int
    rank: Int
    player: Player
    points: Int
  }
`);