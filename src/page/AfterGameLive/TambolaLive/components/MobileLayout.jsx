import React, { useRef } from 'react';
import StatsBar from './StatsBar';
import BigBall from './BiggBall';
import Particles from './Particles';
import TraySlots from './TraySlots';
import ProgressBar from './ProgressBar';
import BoardGrid from './BoardGrid';
import { getDecadeColor } from '../utils/colors';

const MobileLayout = ({ gameState, sizes, isNarrow, bigBallRef, slot0Ref, slot1Ref, cellRefs }) => {
  const { bigNum, bigKey, showPulse, showParticles, calledCount, tray, trayKey, calledSet, arrivingCell } = gameState;
  const { BIG_BALL_SIZE, TRAY_BALL_SIZE, TRAY_SLOT_SIZE, GRID_BALL_SIZE } = sizes;

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "14px 10px 20px", gap: 12, position: "relative", zIndex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <h1 className="tl-shimmer" style={{ fontSize: 12, fontWeight: 900, letterSpacing: 3, flexShrink: 0, fontFamily: "'Cinzel',serif" }}>
          TAMBOLA
        </h1>
        <StatsBar compact calledCount={calledCount} />
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {showPulse && bigNum && (<>
            {[0, 1, 2].map(k => (
              <div key={k} style={{
                position: "absolute",
                inset: -(6 * (k + 1) + 2),
                borderRadius: "50%",
                border: `${k < 1 ? "1.5" : "1"}px solid ${k === 0 ? getDecadeColor(bigNum).light + "55" : getDecadeColor(bigNum).base + (k === 1 ? "33" : "18")}`,
                animation: `tl-softPulse 2.2s ease-out ${k * 0.55}s infinite`,
              }} />
            ))}
            <Particles active={showParticles} color={getDecadeColor(bigNum).light} size={BIG_BALL_SIZE} />
          </>)}
          <div ref={bigBallRef} className={bigNum ? "tl-float" : ""}>
            <BigBall number={bigNum} animKey={bigKey} size={BIG_BALL_SIZE} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <TraySlots 
            vertical 
            tray={tray} 
            trayKey={trayKey} 
            traySlotSize={TRAY_SLOT_SIZE} 
            trayBallSize={TRAY_BALL_SIZE}
            slot0Ref={slot0Ref}
            slot1Ref={slot1Ref}
          />
        </div>
      </div>

      <ProgressBar calledCount={calledCount} />
      <div style={{ background: "rgba(0,0,0,0.22)", borderRadius: 12, border: "1px solid rgba(251,239,164,0.05)" }}>
        <BoardGrid 
          mobile 
          isNarrow={isNarrow}
          calledSet={calledSet}
          arrivingCell={arrivingCell}
          gridBallSize={GRID_BALL_SIZE}
          cellRefs={cellRefs}
        />
      </div>
    </div>
  );
};

export default MobileLayout;