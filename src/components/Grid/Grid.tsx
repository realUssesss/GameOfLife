import { FC } from "react";
import { Row } from "../Row/Row";

type Props = {
  data: IGrid;
  onClickCell: (chords: CellChords) => void;
  onMouseMove: (chords: CellChords) => void;
  onMouseDown: () => void;
  onMouseOut: () => void;
};

export const Grid: FC<Props> = ({
  data,
  onClickCell,
  onMouseDown,
  onMouseOut,
  onMouseMove,
}) => {
  return (
    <div>
      {data.map((row, index) => (
        <Row
          data={row}
          key={index}
          rowIndex={index}
          onClickCell={onClickCell}
          onMouseDown={onMouseDown}
          onMouseOut={onMouseOut}
          onMouseMove={onMouseMove}
        />
      ))}
    </div>
  );
};
