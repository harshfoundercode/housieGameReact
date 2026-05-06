import React from 'react';
import TrayBall from './TrayBall';

const TraySlots = ({ vertical = false, tray, trayKey, traySlotSize, trayBallSize, slot0Ref, slot1Ref }) => {
  return (
    <div style={{ display: "flex", flexDirection: vertical ? "column" : "row", gap: 14, alignItems: "center" }}>
      {[0, 1].map(i => (
        <div key={i}
          ref={i === 0 ? slot0Ref : slot1Ref}
          style={{
            width: traySlotSize, height: traySlotSize, borderRadius: "50%",
            background: "rgba(0,10,30,0.55)",
            border: "1px solid rgba(251,239,164,0.10)",
            boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5), 0 0 0 1px rgba(251,239,164,0.03)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, position: "relative",
          }}
        >
          <div style={{
            position: "absolute", bottom: "-19px", left: "50%", transform: "translateX(-50%)",
            fontSize: 7, color: "rgba(251,239,164,0.22)", letterSpacing: 1, whiteSpace: "nowrap",
            fontFamily: "'Cinzel', serif",
          }}>
            {i === 0 ? "LATEST" : "PREV"}
          </div>
          {tray[i] !== null
            ? <div key={`${i}-${trayKey[i]}`}><TrayBall number={tray[i]} size={trayBallSize} isNew={i === 0} /></div>
            : <div style={{
              width: trayBallSize * 0.4, height: trayBallSize * 0.4,
              borderRadius: "50%",
              background: "rgba(251,239,164,0.03)",
              border: "1px dashed rgba(251,239,164,0.09)",
            }} />
          }
        </div>
      ))}
    </div>
  );
};

export default TraySlots;