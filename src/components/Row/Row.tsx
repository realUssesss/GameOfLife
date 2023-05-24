import { FC, memo, useCallback, useMemo } from "react";
import isEqual from "react-fast-compare";
import { Cell } from "../Cell/Cell";
import style from "./Row.module.css";

type Props = {
  data: IRow;
  rowIndex: number;
  onClickCell: (chords: CellChords) => void;
  onMouseMove: (chords: CellChords) => void;
  onMouseDown: () => void;
  onMouseOut: () => void;
};

export const Row: FC<Props> = ({
  data,
  rowIndex,
  onClickCell,
  onMouseDown,
  onMouseOut,
  onMouseMove,
}) => {
  return (
    <div className={style.container}>
      {data.map((cell, index) => (
        <Cell
          data={cell}
          key={index}
          rowIndex={rowIndex}
          colIndex={index}
          onClickCell={onClickCell}
          onMouseDown={onMouseDown}
          onMouseOut={onMouseOut}
          onMouseMove={onMouseMove}
        />
      ))}
    </div>
  );
};
