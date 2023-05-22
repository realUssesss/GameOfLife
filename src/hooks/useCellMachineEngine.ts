import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { jsonCopy } from "~/utils";

const INTERVAL = 200;

export function useCellMachineEngine(
  initialGrid: IGrid,
  generator: (cur: IGrid) => IGrid
) {
  const [currentGrid, setCurrentGrid] = useState<IGrid>(initialGrid);
  const [playing, setPlaying] = useState<boolean>(false);
  const currentGridRef = useRef<IGrid>(currentGrid);
  const countBordRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout>();
  const isMouseDownRef = useRef<boolean>(false);
  const [intervalCount, setIntervalCount] = useState(INTERVAL);

  currentGridRef.current = currentGrid;

  const onGenerateNext = useCallback(() => {
    const next = generator(currentGridRef.current);
    setCurrentGrid(next);
    countBordRef.current++;
  }, []);

  const onClickCell = useCallback(
    (chords: CellChords) => {
      const nextGrid = jsonCopy(currentGridRef.current);
      const prevValue = nextGrid[chords.x][chords.y];
      nextGrid[chords.x][chords.y] = prevValue == 1 ? 0 : 1;
      setCurrentGrid(nextGrid);
    },
    [currentGridRef]
  );

  const onPlay = () => {
    setPlaying((prev) => !prev);
  };

  const onMouseDown = useCallback(() => {
    isMouseDownRef.current = true;
  }, []);

  const onMouseOut = useCallback(() => {
    isMouseDownRef.current = false;
  }, []);

  const onMouseMove = useCallback(
    (chords: CellChords) => {
      if (!isMouseDownRef.current) return;
      onClickCell(chords);
    },
    [onClickCell]
  );

  function onResetGrid() {
    const newGrid: IGrid = currentGrid.map((row) => row.map(() => 0));
    setCurrentGrid(newGrid);
    countBordRef.current = 0;
  }

  const onChangeTickInterval: ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setIntervalCount(e.target.valueAsNumber);
    }, []);

  function increaseGeneration(num: number) {
    let cur = currentGridRef.current;
    for (let i = 0; i < num; i++) {
      cur = generator(cur);
      countBordRef.current++;
    }
    setCurrentGrid(cur);
  }

  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => {
        onGenerateNext();
      }, intervalCount);
    } else {
      timerRef.current && clearInterval(timerRef.current);
    }
    return () => {
      timerRef.current && clearInterval(timerRef.current);
    };
  }, [playing, intervalCount]);

  return {
    currentGrid,
    playing,
    increaseGeneration,
    onGenerateNext,
    onPlay,
    onClickCell,
    onMouseDown,
    onMouseOut,
    onMouseMove,
    onResetGrid,
    onChangeTickInterval,
    countBordRef,
    intervalCount,
  };
}
