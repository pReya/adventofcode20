const { decoded: boardingPasses } = require("./part1.js");

const allPossibleSeats = [...Array(128)]
  .map((_, row) =>
    [...Array(8)].map((_, seat) => {
      const id = row * 8 + seat;
      return { row, seat, id };
    })
  )
  .flat();

let difference = allPossibleSeats.filter(
  ({ id: id1 }) => !boardingPasses.some(({ id: id2 }) => id2 === id1)
);

console.dir(difference, { maxArrayLength: null });

difference.forEach((seat, index) => {
  const nextId = seat.id + 1;
  const prevId = seat.id - 1;
  if (
    !(
      difference[index - 1]?.id === prevId && difference[index + 1]?.id === nextId
    )
  ) {
    console.log("Candidate", seat);
  }
});
