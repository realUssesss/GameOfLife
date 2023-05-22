import { FC, memo } from "react";

import style from "./Cell.module.css";

type Props = {
  data: ICell;
  rowIndex: number;
  colIndex: number;
  onClickCell: (chords: CellChords) => void;
  onMouseMove: (chords: CellChords) => void;
  onMouseDown: () => void;
  onMouseOut: () => void;
};

export const Cell: FC<Props> = memo(
  ({
    data,
    rowIndex,
    colIndex,
    onClickCell,
    onMouseDown,
    onMouseOut,
    onMouseMove,
  }) => {
    return (
      <div
        onClick={() => onClickCell({ x: rowIndex, y: colIndex })}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseOut}
        onMouseEnter={() => onMouseMove({ x: rowIndex, y: colIndex })}
        className={style.wrap}
        data-value={data}
      ></div>
    );
  }
);
