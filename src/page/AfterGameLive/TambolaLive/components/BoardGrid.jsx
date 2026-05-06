import React, { useRef } from 'react';
import GridBall from './GridBall';

const BoardGrid = ({ mobile = false, isNarrow, calledSet, arrivingCell, gridBallSize, cellRefs }) => {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(10, 1fr)",
      gap: mobile ? 3 : isNarrow ? 5 : 7,
      width: "100%",
      padding: mobile ? "6px" : isNarrow ? "8px" : "12px",
    }}>
      {Array.from({ length: 90 }, (_, i) => {
        const n = i + 1;
        return (
          <div key={n}
            ref={el => { if (cellRefs?.current) cellRefs.current[n] = el; }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", aspectRatio: "1" }}
          >
            <GridBall 
              number={n} 
              called={calledSet.has(n)} 
              arriving={arrivingCell === n} 
              size={gridBallSize} 
            />
          </div>
        );
      })}
    </div>
  );
};

export default BoardGrid;