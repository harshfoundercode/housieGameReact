import React from 'react';
import StatsBar from './StatsBar';
import BigBall from './BiggBall';
import Particles from './Particles';
import TraySlots from './TraySlots';
import ProgressBar from './ProgressBar';
import BoardGrid from './BoardGrid';
import Legend from './Legend';
import { getDecadeColor } from '../utils/colors';

const DesktopLayout = ({ gameState, sizes, isNarrow, bigBallRef, slot0Ref, slot1Ref, cellRefs }) => {
  const { bigNum, bigKey, showPulse, showParticles, calledCount, tray, trayKey, calledSet, arrivingCell } = gameState;
  const { BIG_BALL_SIZE, TRAY_BALL_SIZE, TRAY_SLOT_SIZE, GRID_BALL_SIZE, LEFT_PANEL_W } = sizes;

  const pct = Math.round((calledCount / 90) * 100);

  return (
    <div style={{ display: "flex", alignItems: "stretch", position: "relative", zIndex: 1, minHeight: 560 }}>
      
      {/* Left Panel */}
      <div style={{
        flexShrink: 0, 
        width: LEFT_PANEL_W,
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center",
        gap: 26, 
        padding: "30px 22px",
        borderRight: "1px solid rgba(251,239,164,0.07)",
        background: "rgba(0,0,0,0.18)",
        backdropFilter: "blur(6px)",
      }}>
        {/* Title Section */}
        <div style={{ textAlign: "center" }}>
          <div style={{ 
            fontSize: 7, 
            color: "rgba(251,239,164,0.40)", 
            letterSpacing: 5, 
            marginBottom: 6, 
            fontFamily: "'Raleway',sans-serif" 
          }}>
            ✦ LIVE DRAW ✦
          </div>
          <h1 className="tl-shimmer" style={{ 
            fontSize: 18, 
            fontWeight: 900, 
            letterSpacing: 4, 
            fontFamily: "'Cinzel',serif" 
          }}>
            TAMBOLA
          </h1>
          <div style={{ 
            fontSize: 7, 
            color: "rgba(255,255,255,0.18)", 
            letterSpacing: 3, 
            marginTop: 4, 
            fontFamily: "'Cinzel',serif" 
          }}>
            90 BALL · AUTO DRAW
          </div>
        </div>

        {/* Big Ball Stage */}
        <div style={{ 
          position: "relative", 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          gap: 16 
        }}>
          {/* Pulse Rings */}
          {showPulse && bigNum && (
            <>
              {[0, 1, 2].map(k => (
                <div key={k} style={{
                  position: "absolute", 
                  borderRadius: "50%",
                  inset: -(6 * (k + 1) + 2),
                  border: `${k < 1 ? "1.5" : "1"}px solid ${
                    k === 0 
                      ? getDecadeColor(bigNum).light + "55" 
                      : getDecadeColor(bigNum).base + (k === 1 ? "33" : "18")
                  }`,
                  animation: `tl-softPulse 2.2s ease-out ${k * 0.55}s infinite`,
                }} />
              ))}
              <Particles 
                active={showParticles} 
                color={getDecadeColor(bigNum).light} 
                size={BIG_BALL_SIZE} 
              />
            </>
          )}

          {/* Floor Glow Effect */}
          <div style={{
            position: "absolute", 
            bottom: -22, 
            left: "50%", 
            transform: "translateX(-50%)",
            width: bigNum ? BIG_BALL_SIZE * 0.82 : 0, 
            height: 12, 
            borderRadius: "50%",
            background: bigNum 
              ? `radial-gradient(ellipse, ${getDecadeColor(bigNum).glow} 0%, transparent 70%)` 
              : "none",
            transition: "width 0.8s ease", 
            pointerEvents: "none",
          }} />

          {/* Big Ball */}
          <div ref={bigBallRef} className={bigNum ? "tl-float" : ""}>
            <BigBall number={bigNum} animKey={bigKey} size={BIG_BALL_SIZE} />
          </div>

          {/* Number Display */}
          <div style={{ 
            textAlign: "center", 
            minHeight: 40, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center" 
          }}>
            {bigNum ? (
              <div style={{
                fontSize: 38, 
                fontWeight: 900, 
                fontFamily: "'Cinzel',serif",
                background: `linear-gradient(135deg, ${getDecadeColor(bigNum).light}, ${getDecadeColor(bigNum).base})`,
                WebkitBackgroundClip: "text", 
                WebkitTextFillColor: "transparent",
                lineHeight: 1, 
                letterSpacing: 2,
              }}>
                {bigNum}
              </div>
            ) : (
              <div style={{ 
                fontSize: 8, 
                color: "rgba(255,255,255,0.14)", 
                letterSpacing: 3, 
                fontFamily: "'Cinzel',serif" 
              }}>
                DRAWING…
              </div>
            )}
          </div>
        </div>

        {/* Tray Slots */}
        <TraySlots 
          tray={tray} 
          trayKey={trayKey} 
          traySlotSize={TRAY_SLOT_SIZE} 
          trayBallSize={TRAY_BALL_SIZE}
          slot0Ref={slot0Ref}
          slot1Ref={slot1Ref}
        />

        {/* Stats Bar */}
        <StatsBar calledCount={calledCount} />

        {/* Progress Bar */}
        <ProgressBar calledCount={calledCount} />

        {/* Decade Legend */}
        <Legend />
      </div>

      {/* Right Panel - Board */}
      <div style={{ 
        flex: 1, 
        minWidth: 0, 
        display: "flex", 
        flexDirection: "column", 
        padding: "24px 24px 20px 18px", 
        gap: 14 
      }}>
        {/* Board Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ 
              width: 2, 
              height: 18, 
              background: "linear-gradient(180deg, #FBEFA4, rgba(251,239,164,0))", 
              borderRadius: 2 
            }} />
            <span style={{ 
              fontSize: 11, 
              fontWeight: 600, 
              fontFamily: "'Cinzel',serif", 
              color: "rgba(251,239,164,0.35)", 
              letterSpacing: 3 
            }}>
              FULL BOARD
            </span>
          </div>
          
          {/* Called Count Badge */}
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 6, 
            padding: "5px 14px", 
            borderRadius: 20, 
            background: "rgba(0,20,51,0.50)", 
            border: "1px solid rgba(251,239,164,0.08)", 
            backdropFilter: "blur(8px)" 
          }}>
            <div className="tl-breathe" style={{ 
              width: 5, 
              height: 5, 
              borderRadius: "50%", 
              background: pct === 100 ? "#1abc9c" : "#FBEFA4", 
              boxShadow: pct === 100 ? "0 0 6px #1abc9c" : "0 0 6px #FBEFA4" 
            }} />
            <span style={{ 
              fontSize: 8, 
              color: "rgba(255,255,255,0.40)", 
              fontFamily: "'Cinzel',serif", 
              letterSpacing: 1 
            }}>
              {calledCount} / 90
            </span>
          </div>
        </div>

        {/* Board Grid */}
        <div style={{ 
          flex: 1, 
          background: "rgba(0,8,24,0.35)", 
          borderRadius: 14, 
          border: "1px solid rgba(251,239,164,0.05)", 
          display: "flex", 
          alignItems: "center", 
          overflow: "hidden" 
        }}>
          <BoardGrid 
            isNarrow={isNarrow}
            calledSet={calledSet}
            arrivingCell={arrivingCell}
            gridBallSize={GRID_BALL_SIZE}
            cellRefs={cellRefs}
          />
        </div>
      </div>
    </div>
  );
};

export default DesktopLayout;