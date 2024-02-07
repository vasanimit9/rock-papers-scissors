export const points: { [key: string]: { [key: string]: number } } = {
  rock: {
    paper: 0,
    scissors: 1,
    rock: 0.5,
  },
  scissors: {
    paper: 1,
    scissors: 0.5,
    rock: 0,
  },
  paper: {
    paper: 0.5,
    scissors: 0,
    rock: 1,
  },
};
