import { jsonCopy } from "~/utils";

const RULES = {
  0: {
    "03": 1,
    "13": 1,
    "23": 1,
    "33": 1,
    "43": 1,
    "53": 1,
    otherwise: 0,
  },
  1: {
    "03": 1,
    "13": 1,
    "23": 1,
    "33": 1,
    "43": 1,
    "53": 1,
    "02": 1,
    "12": 1,
    "22": 1,
    "32": 1,
    "42": 1,
    "52": 1,
    "62": 1,
    otherwise: 0,
  },
};

function mod(a: number, b: number): number {
  return ((a % b) + b) % b;
}

export function generateNext(currentBord: IGrid): IGrid {
  const nextGrid: IGrid = jsonCopy(currentBord);

  for (let i = 0; i < currentBord.length; i++) {
    const row = currentBord[i];

    for (let j = 0; j < row.length; j++) {
      const cell = row[j];
      const countMap = {
        0: 0,
        1: 0,
      };

      for (let dy = -1; dy <= 1; ++dy) {
        for (let dx = -1; dx <= 1; ++dx) {
          if (dy != 0 || dx != 0) {
            const y = mod(j + dy, currentBord.length);
            const x = mod(i + dx, row.length);

            const neighbour = currentBord[x][y];
            countMap[neighbour] += 1;
          }
        }
      }

      const cellRules = RULES[cell];

      const neigRule = Object.values(countMap).join("");

      const nextValue: ICell =
        // @ts-ignore
        neigRule in cellRules ? cellRules[neigRule] : cellRules.otherwise;

      nextGrid[i][j] = nextValue;
    }
  }

  return nextGrid;
}
