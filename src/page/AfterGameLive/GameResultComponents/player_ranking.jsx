// // export default PlayerRanking;
// /**
//  * player_ranking.jsx  — PROPS-DRIVEN VERSION (FIXED)
//  *
//  * Fixes:
//  * 1. Winner list now shows ALL winners from API (like HTML page) — no hardcoded categories
//  * 2. Sound added for number calls via Web Audio API
//  * 3. Proper winner matching using win_type / prize_name fields
//  */

// import React, { useState, useEffect, useRef } from "react";

// const GOLD      = "#FBEFA4";
// const NAVY      = "#004296";
// const NAVY_DARK = "#001433";
// const NAVY_MID  = "#002b66";

// const RANK_CONFIG = {
//   1: { bg: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)", text: "#3a1f00", glow: "rgba(255,215,0,0.55)", medal: "🥇", shadow: "0 0 24px rgba(255,215,0,0.45)" },
//   2: { bg: "linear-gradient(135deg, #E8E8E8 0%, #B0B0B0 100%)", text: "#1a1a2e", glow: "rgba(192,192,192,0.45)", medal: "🥈", shadow: "0 0 18px rgba(192,192,192,0.35)" },
//   3: { bg: "linear-gradient(135deg, #CD7F32 0%, #8B4513 100%)", text: "#fff",    glow: "rgba(205,127,50,0.45)",  medal: "🥉", shadow: "0 0 18px rgba(205,127,50,0.35)" },
// };

// /* ─── Ticket grid parser ─── */
// function parseTicketGrid(ticket) {
//   let grid = ticket.ticket_data;
//   try { if (typeof grid === "string") grid = JSON.parse(grid); } catch { grid = [[], [], []]; }
//   if (!Array.isArray(grid)) grid = [[], [], []];
//   const normalized = grid.slice(0, 3).map(row => {
//     const safe = Array.isArray(row) ? row.slice(0, 9) : [];
//     while (safe.length < 9) safe.push(null);
//     return safe;
//   });
//   while (normalized.length < 3) normalized.push(Array(9).fill(null));
//   return normalized;
// }

// function getMatchData(ticket, calledNumbers) {
//   const grid    = parseTicketGrid(ticket);
//   const flat    = grid.flat().filter(n => n !== null && n !== undefined && n !== 0 && n !== "").map(Number).filter(n => !isNaN(n));
//   const matched = [...new Set(flat.filter(n => calledNumbers.includes(n)))];
//   return { grid, flat, matched, matchedCount: matched.length, total: flat.length };
// }

// /* ─── Mini ticket grid ─── */
// function TicketMiniGrid({ ticket, calledNumbers, size = "sm" }) {
//   const { grid } = getMatchData(ticket, calledNumbers);
//   const cellH    = size === "sm" ? 20 : 36;
//   const fontSize = size === "sm" ? 8  : 13;
//   return (
//     <div style={{ display: "grid", gridTemplateColumns: "repeat(9, 1fr)", gap: size === "sm" ? 2 : 4, width: "100%" }}>
//       {grid.flat().map((num, i) => {
//         const isEmpty   = num === null || num === undefined || num === 0 || num === "";
//         const isMatched = !isEmpty && calledNumbers.includes(Number(num));
//         return (
//           <div key={i} style={{
//             height: cellH, display: "flex", alignItems: "center", justifyContent: "center",
//             borderRadius: size === "sm" ? 3 : 5,
//             background: isEmpty ? "transparent" : isMatched ? `linear-gradient(135deg, ${NAVY}, #1a5fb4)` : "rgba(255,255,255,0.12)",
//             border: isEmpty ? "1px dashed rgba(255,255,255,0.08)" : isMatched ? `1px solid ${GOLD}55` : "1px solid rgba(255,255,255,0.15)",
//             fontSize, fontWeight: 700, fontFamily: "'Cinzel', serif",
//             color: isEmpty ? "transparent" : isMatched ? GOLD : "rgba(255,255,255,0.75)",
//             boxShadow: isMatched ? `0 0 6px rgba(251,239,164,0.3)` : "none",
//             transition: "all 0.4s ease",
//           }}>
//             {!isEmpty ? num : ""}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// /* ─── Winner / Ticket detail modal ─── */
// function TicketDetailModal({ ticket, calledNumbers, onClose }) {
//   if (!ticket) return null;
//   const { matched, matchedCount, total } = getMatchData(ticket, calledNumbers);
//   const pct = total > 0 ? Math.round((matchedCount / total) * 100) : 0;

//   return (
//     <div onClick={onClose} style={{
//       position: "fixed", inset: 0, zIndex: 9999,
//       background: "rgba(0,5,20,0.88)", backdropFilter: "blur(16px)",
//       display: "flex", alignItems: "center", justifyContent: "center",
//       padding: 20, animation: "pr-fadeIn 0.25s ease",
//     }}>
//       <div onClick={e => e.stopPropagation()} style={{
//         width: "min(680px, 100%)",
//         background: `linear-gradient(160deg, ${NAVY_MID} 0%, ${NAVY_DARK} 100%)`,
//         borderRadius: 24, padding: "28px 24px",
//         border: `2px solid ${GOLD}55`,
//         boxShadow: `0 0 60px rgba(0,0,0,0.7)`,
//         position: "relative", color: "#fff",
//         animation: "pr-slideUp 0.3s cubic-bezier(0.16,1.2,0.3,1)",
//       }}>
//         <button onClick={onClose} style={{
//           position: "absolute", top: 16, right: 16,
//           width: 32, height: 32, borderRadius: "50%",
//           background: "rgba(251,239,164,0.10)", border: `1px solid ${GOLD}40`,
//           color: GOLD, fontSize: 16, cursor: "pointer",
//           display: "flex", alignItems: "center", justifyContent: "center",
//         }}>✕</button>

//         <div style={{ textAlign: "center", marginBottom: 20 }}>
//           <div style={{ fontSize: 9, letterSpacing: 5, color: `${GOLD}66`, marginBottom: 6, fontFamily: "'Cinzel',serif" }}>TICKET DETAILS</div>
//           <h2 style={{ fontSize: 20, fontWeight: 900, fontFamily: "'Cinzel',serif", color: GOLD, marginBottom: 4 }}>
//             {ticket.prize_name || ticket.win_type || `Ticket #${ticket.ticket_number}`}
//           </h2>
//           <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "'Raleway',sans-serif" }}>
//             {ticket.user_name || "Unknown Player"} · Ticket #{ticket.ticket_number}
//             {ticket.amount ? ` · ₹${ticket.amount}` : ""}
//           </div>
//         </div>

//         <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
//           {[
//             { label: "PLAYER",  val: ticket.user_name || "Unknown" },
//             { label: "MATCHED", val: `${matchedCount}/${total}` },
//             { label: "FILLED",  val: `${pct}%` },
//           ].map(m => (
//             <div key={m.label} style={{
//               flex: 1, minWidth: 80, textAlign: "center",
//               padding: "10px 8px", borderRadius: 12,
//               background: "rgba(0,20,51,0.5)", border: `1px solid rgba(251,239,164,0.10)`,
//             }}>
//               <div style={{ fontSize: 16, fontWeight: 900, fontFamily: "'Cinzel',serif", color: GOLD }}>{m.val}</div>
//               <div style={{ fontSize: 7, color: "rgba(255,255,255,0.3)", letterSpacing: 2, marginTop: 3 }}>{m.label}</div>
//             </div>
//           ))}
//         </div>

//         <div style={{ background: "rgba(0,8,24,0.5)", borderRadius: 16, padding: 14, border: "1px solid rgba(251,239,164,0.08)" }}>
//           <div style={{ fontSize: 8, color: `${GOLD}44`, letterSpacing: 3, marginBottom: 10, fontFamily: "'Cinzel',serif", textAlign: "center" }}>TICKET GRID</div>
//           <TicketMiniGrid ticket={ticket} calledNumbers={calledNumbers} size="lg" />
//         </div>

//         {matched.length > 0 && (
//           <div style={{ marginTop: 14, textAlign: "center" }}>
//             <div style={{ fontSize: 8, color: `${GOLD}55`, letterSpacing: 2, marginBottom: 8, fontFamily: "'Cinzel',serif" }}>MATCHED NUMBERS</div>
//             <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
//               {matched.map(n => (
//                 <span key={n} style={{
//                   padding: "4px 10px", borderRadius: 20,
//                   background: `linear-gradient(135deg, ${NAVY}, #1a5fb4)`,
//                   border: `1px solid ${GOLD}55`,
//                   fontSize: 10, fontWeight: 700, fontFamily: "'Cinzel',serif", color: GOLD,
//                 }}>{n}</span>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ─── Ticket search modal ─── */
// function TicketSearchModal({ tickets, calledNumbers, onClose }) {
//   const [query,    setQuery]    = useState("");
//   const [selected, setSelected] = useState(null);

//   const filtered = query.trim()
//     ? tickets.filter(t =>
//         t.ticket_number?.toString().includes(query) ||
//         (t.user_name || "").toLowerCase().includes(query.toLowerCase())
//       )
//     : tickets;

//   if (selected) {
//     return <TicketDetailModal ticket={selected} calledNumbers={calledNumbers} onClose={() => setSelected(null)} />;
//   }

//   return (
//     <div onClick={onClose} style={{
//       position: "fixed", inset: 0, zIndex: 9998,
//       background: "rgba(0,5,20,0.88)", backdropFilter: "blur(16px)",
//       display: "flex", alignItems: "flex-start", justifyContent: "center",
//       padding: "60px 16px 24px", animation: "pr-fadeIn 0.2s ease",
//     }}>
//       <div onClick={e => e.stopPropagation()} style={{
//         width: "min(900px, 100%)",
//         background: `linear-gradient(160deg, ${NAVY_MID}, ${NAVY_DARK})`,
//         borderRadius: 24, border: `2px solid ${GOLD}44`,
//         boxShadow: `0 30px 80px rgba(0,0,0,0.8)`,
//         display: "flex", flexDirection: "column",
//         maxHeight: "calc(100vh - 80px)",
//         animation: "pr-slideUp 0.3s cubic-bezier(0.16,1.2,0.3,1)",
//       }}>
//         <div style={{ padding: "20px 20px 16px", borderBottom: `1px solid rgba(251,239,164,0.08)` }}>
//           <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
//             <div style={{ fontSize: 11, fontWeight: 900, fontFamily: "'Cinzel',serif", color: GOLD, letterSpacing: 3 }}>🔍 SEARCH TICKETS</div>
//             <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(251,239,164,0.08)", border: `1px solid ${GOLD}40`, color: GOLD, fontSize: 14, cursor: "pointer" }}>✕</button>
//           </div>
//           <div style={{ position: "relative" }}>
//             <input
//               autoFocus
//               value={query}
//               onChange={e => setQuery(e.target.value)}
//               placeholder="Enter ticket number or player name..."
//               style={{
//                 width: "100%", padding: "12px 16px", borderRadius: 50,
//                 background: "rgba(255,255,255,0.07)",
//                 border: `1.5px solid ${query ? GOLD + "88" : "rgba(251,239,164,0.18)"}`,
//                 color: "#fff", fontSize: 13, fontFamily: "'Raleway',sans-serif",
//                 outline: "none", boxSizing: "border-box",
//               }}
//             />
//             {query && (
//               <button onClick={() => setQuery("")} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: `${GOLD}88`, cursor: "pointer", fontSize: 16 }}>✕</button>
//             )}
//           </div>
//           <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginTop: 8, fontFamily: "'Raleway',sans-serif" }}>
//             Showing <span style={{ color: GOLD, fontWeight: 700 }}>{filtered.length}</span> of {tickets.length} tickets
//           </div>
//         </div>

//         <div style={{ overflowY: "auto", flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
//           {filtered.length === 0 ? (
//             <div style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", padding: 40, fontFamily: "'Raleway',sans-serif" }}>No tickets found</div>
//           ) : filtered.map(ticket => {
//             const { matchedCount, total } = getMatchData(ticket, calledNumbers);
//             const pct     = total > 0 ? Math.round((matchedCount / total) * 100) : 0;
//             const isWinner = ticket.winner_id && ticket.prize_name;
//             return (
//               <div key={ticket.ticket_id} onClick={() => setSelected(ticket)}
//                 style={{
//                   background: isWinner ? `linear-gradient(135deg, rgba(255,215,0,0.08), rgba(0,66,150,0.3))` : "rgba(0,20,51,0.4)",
//                   border: `1px solid ${isWinner ? GOLD + "55" : "rgba(251,239,164,0.08)"}`,
//                   borderRadius: 14, padding: "14px 16px", cursor: "pointer",
//                   boxShadow: isWinner ? `0 0 20px rgba(255,215,0,0.12)` : "none",
//                   transition: "all 0.2s ease",
//                 }}
//                 onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; }}
//                 onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
//               >
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, flexWrap: "wrap", gap: 6 }}>
//                   <div>
//                     <span style={{ fontSize: 13, fontWeight: 900, fontFamily: "'Cinzel',serif", color: GOLD }}>🎟️ #{ticket.ticket_number}</span>
//                     {isWinner && <span style={{ marginLeft: 8, fontSize: 9, padding: "3px 8px", borderRadius: 20, background: "rgba(255,215,0,0.15)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.3)", fontWeight: 700 }}>🏆 {ticket.prize_name}</span>}
//                   </div>
//                   <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//                     <span style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", fontFamily: "'Raleway',sans-serif" }}>{ticket.user_name || "Unsold"}</span>
//                     <span style={{ fontSize: 9, padding: "3px 10px", borderRadius: 20, background: `linear-gradient(135deg, ${NAVY}, #1a5fb4)`, border: `1px solid ${GOLD}40`, color: GOLD, fontWeight: 700 }}>{matchedCount}/{total} · {pct}%</span>
//                   </div>
//                 </div>
//                 <div style={{ width: "100%", height: 2, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
//                   <div style={{
//                     height: "100%", width: `${pct}%`, borderRadius: 2,
//                     background: pct >= 80 ? "linear-gradient(90deg, #FFD700, #FFA500)" : pct >= 50 ? "linear-gradient(90deg, #1abc9c, #0e8a72)" : `linear-gradient(90deg, ${NAVY}, #1a5fb4)`,
//                     transition: "width 0.8s ease",
//                   }} />
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ════════════════════════════════════════════════════════════════
//    MAIN: PlayerRanking  — ALL STATE FROM PROPS
// ════════════════════════════════════════════════════════════════ */
// const PlayerRanking = ({
//   calledNumbers = [],
//   calledCount   = 0,
//   allTickets    = [],
//   winners       = [],
//   connected     = false,
// }) => {
//   const [selectedTicket,   setSelectedTicket]   = useState(null);
//   const [showTicketSearch, setShowTicketSearch] = useState(false);
//   const [searchQuery,      setSearchQuery]      = useState("");
//   /* ── Live ranking derived from props ── */
//   const rankingData = React.useMemo(() => {
//     return allTickets
//       .map(t => {
//         const { matchedCount, total } = getMatchData(t, calledNumbers);
//         const pct = total > 0 ? Math.round((matchedCount / total) * 100) : 0;
//         return { ...t, matchedCount, total, pct };
//       })
//       .sort((a, b) => b.matchedCount - a.matchedCount || a.ticket_number - b.ticket_number)
//       .slice(0, 10);
//   }, [allTickets, calledNumbers]);

//   /* ── Filtered tickets for search ── */
//   const filteredTickets = React.useMemo(() => {
//     if (!searchQuery.trim()) return allTickets;
//     const q = searchQuery.toLowerCase();
//     return allTickets.filter(t =>
//       t.ticket_number?.toString().includes(q) ||
//       (t.user_name || "").toLowerCase().includes(q) ||
//       (t.user_id || "").toString().includes(q)
//     );
//   }, [allTickets, searchQuery]);

//   const loading = allTickets.length === 0;

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Raleway:wght@300;400;600&display=swap');
//         @keyframes pr-fadeIn  { from { opacity: 0; } to { opacity: 1; } }
//         @keyframes pr-slideUp {
//           from { transform: translateY(30px) scale(0.97); opacity: 0; }
//           to   { transform: translateY(0) scale(1); opacity: 1; }
//         }
//         @keyframes pr-cardIn {
//           from { transform: translateX(20px) scale(0.95); opacity: 0; }
//           to   { transform: translateX(0) scale(1); opacity: 1; }
//         }
//         @keyframes pr-shimmer {
//           0%   { background-position: -400px 0; }
//           100% { background-position:  400px 0; }
//         }
//         @keyframes pr-breathe {
//           0%,100% { opacity: 0.4; }
//           50%     { opacity: 1; }
//         }
//         @keyframes pr-winnerGlow {
//           0%,100% { box-shadow: 0 0 20px rgba(255,215,0,0.3); }
//           50%     { box-shadow: 0 0 40px rgba(255,215,0,0.6), 0 0 80px rgba(255,215,0,0.2); }
//         }
//         @keyframes pr-winnerEntrance {
//           0%   { transform: scale(0.85) translateY(10px); opacity: 0; }
//           60%  { transform: scale(1.04) translateY(-2px); opacity: 1; }
//           100% { transform: scale(1) translateY(0); opacity: 1; }
//         }
//         .pr-rank-card   { transition: transform 0.25s ease, box-shadow 0.25s ease; }
//         .pr-rank-card:hover { transform: translateY(-4px) scale(1.02); }
//         .pr-winner-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
//         .pr-winner-card:hover { transform: translateY(-3px) scale(1.03); }
//         .pr-gold-shimmer {
//           background: linear-gradient(90deg, #c9b86c 0%, #ffe066 28%, #FBEFA4 50%, #ffe066 72%, #c9b86c 100%);
//           background-size: 400px 100%;
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           animation: pr-shimmer 3s linear infinite;
//         }
//       `}</style>

//       {/* ══ PLAYER RANKING ══ */}
//       <div className="w-full max-w-7xl mx-auto mt-8">
//         <div style={{
//           background: "rgba(0,66,150,0.35)", backdropFilter: "blur(12px)",
//           borderRadius: 28, border: `2px solid rgba(251,239,164,0.22)`,
//           boxShadow: `0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(251,239,164,0.06)`,
//           overflow: "hidden",
//         }}>
//           <div style={{
//             background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_MID} 100%)`,
//             padding: "18px 24px", borderBottom: `2px solid rgba(251,239,164,0.18)`,
//             display: "flex", alignItems: "center", justifyContent: "space-between",
//           }}>
//             <h2 style={{ fontFamily: "'Cinzel',serif", fontSize: 18, fontWeight: 900, letterSpacing: 2, margin: 0 }}>
//               <span className="pr-gold-shimmer">🏆 PLAYER RANKING</span>
//             </h2>
//             <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//               <div style={{
//                 width: 7, height: 7, borderRadius: "50%",
//                 background: connected ? "#1abc9c" : "#ff4444",
//                 boxShadow: connected ? "0 0 8px #1abc9c" : "0 0 8px #ff4444",
//                 animation: "pr-breathe 2s ease-in-out infinite",
//               }} />
//               <span style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", fontFamily: "'Cinzel',serif", letterSpacing: 2 }}>
//                 {loading ? "LOADING" : connected ? "LIVE" : "OFFLINE"}
//               </span>
//             </div>
//           </div>

//           <div style={{ padding: "16px 20px 20px", overflowX: "auto" }}>
//             {loading ? (
//               <div style={{ textAlign: "center", padding: 40, color: "rgba(255,255,255,0.3)", fontFamily: "'Raleway',sans-serif" }}>Loading rankings…</div>
//             ) : rankingData.length === 0 ? (
//               <div style={{ textAlign: "center", padding: 40, color: "rgba(255,255,255,0.3)", fontFamily: "'Raleway',sans-serif" }}>No tickets found</div>
//             ) : (
//               <div style={{ display: "flex", gap: 14, minWidth: "max-content", paddingBottom: 6 }}>
//                 {rankingData.map((item, idx) => {
//                   const rank    = idx + 1;
//                   const cfg     = RANK_CONFIG[rank];
//                   const isTop3  = rank <= 3;
//                   const isWinner = item.winner_id && item.prize_name;
//                   return (
//                     <div key={item.ticket_id || item.ticket_number} className="pr-rank-card"
//                       onClick={() => setSelectedTicket(item)}
//                       style={{
//                         width: 180, flexShrink: 0, borderRadius: 20, padding: "16px 14px",
//                         background: isTop3 ? cfg.bg : "rgba(255,255,255,0.07)",
//                         border: isTop3 ? `2px solid rgba(255,255,255,0.35)` : `2px solid rgba(251,239,164,0.18)`,
//                         boxShadow: isTop3 ? cfg.shadow : isWinner ? "0 0 20px rgba(255,215,0,0.2)" : "0 4px 16px rgba(0,0,0,0.3)",
//                         cursor: "pointer", position: "relative", overflow: "hidden",
//                         animation: `pr-cardIn 0.4s ${idx * 0.06}s both ease`,
//                       }}
//                     >
//                       {isTop3 && (
//                         <div style={{
//                           position: "absolute", top: 0, left: 0, right: 0, height: 40,
//                           background: "linear-gradient(180deg, rgba(255,255,255,0.18), transparent)",
//                           borderRadius: "20px 20px 0 0", pointerEvents: "none",
//                         }} />
//                       )}
//                       <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
//                         <span style={{ fontSize: 20 }}>{isTop3 ? cfg.medal : "🎯"}</span>
//                         <div style={{ fontSize: 9, fontWeight: 900, fontFamily: "'Cinzel',serif", letterSpacing: 2, color: isTop3 ? cfg.text : "rgba(255,255,255,0.5)" }}>
//                           RANK #{rank}
//                         </div>
//                       </div>
//                       <div style={{ fontSize: 12, fontWeight: 900, fontFamily: "'Cinzel',serif", color: isTop3 ? cfg.text : "#fff", marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//                         {item.user_name || "Unknown"}
//                       </div>
//                       <div style={{ fontSize: 9, color: isTop3 ? `${cfg.text}aa` : "rgba(255,255,255,0.45)", fontFamily: "'Raleway',sans-serif", marginBottom: 12 }}>
//                         Ticket #{item.ticket_number}{isWinner && " 🏆"}
//                       </div>
//                       <div style={{ marginBottom: 6 }}>
//                         <div style={{ width: "100%", height: 4, borderRadius: 4, background: isTop3 ? "rgba(0,0,0,0.20)" : "rgba(255,255,255,0.08)", overflow: "hidden" }}>
//                           <div style={{
//                             height: "100%", width: `${item.pct}%`, borderRadius: 4,
//                             background: isTop3 ? "rgba(0,0,0,0.35)" : `linear-gradient(90deg, ${NAVY}, #1a5fb4)`,
//                             transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
//                           }} />
//                         </div>
//                       </div>
//                       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                         <span style={{ fontSize: 14, fontWeight: 900, fontFamily: "'Cinzel',serif", color: isTop3 ? cfg.text : GOLD }}>
//                           {item.matchedCount}/{item.total}
//                         </span>
//                         <span style={{ fontSize: 9, fontWeight: 700, color: isTop3 ? `${cfg.text}88` : "rgba(255,255,255,0.35)", fontFamily: "'Raleway',sans-serif" }}>
//                           {item.pct}%
//                         </span>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ══ TICKET SEARCH ══ */}
//       <div className="w-full max-w-7xl mx-auto mt-6">
//         <div style={{
//           background: "rgba(0,66,150,0.35)", backdropFilter: "blur(12px)",
//           borderRadius: 28, border: `2px solid rgba(251,239,164,0.22)`,
//           boxShadow: `0 20px 60px rgba(0,0,0,0.4)`, overflow: "hidden",
//         }}>
//           <div style={{ background: `linear-gradient(135deg, ${NAVY}, ${NAVY_MID})`, padding: "18px 24px", borderBottom: `2px solid rgba(251,239,164,0.18)` }}>
//             <h2 style={{ fontFamily: "'Cinzel',serif", fontSize: 18, fontWeight: 900, letterSpacing: 2, margin: 0, color: GOLD, textAlign: "center" }}>
//               🔍 TICKETS FOR GAME
//             </h2>
//           </div>
//           <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
//             <div style={{ position: "relative", width: "100%", maxWidth: 480 }}>
//               <input
//                 type="text"
//                 placeholder="Enter ticket no., name or agent…"
//                 value={searchQuery}
//                 onChange={e => setSearchQuery(e.target.value)}
//                 onFocus={() => { if (allTickets.length > 0) setShowTicketSearch(true); }}
//                 style={{
//                   width: "100%", padding: "12px 44px 12px 20px", borderRadius: 50,
//                   background: "rgba(255,255,255,0.08)",
//                   border: `1.5px solid ${searchQuery ? GOLD + "88" : "rgba(251,239,164,0.30)"}`,
//                   color: "#fff", fontSize: 13, fontFamily: "'Raleway',sans-serif",
//                   outline: "none", boxSizing: "border-box",
//                   transition: "border-color 0.3s ease",
//                 }}
//               />
//               {searchQuery && (
//                 <button onClick={() => setSearchQuery("")} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: `${GOLD}88`, cursor: "pointer", fontSize: 16 }}>✕</button>
//               )}
//             </div>
//             <button
//               onClick={() => setShowTicketSearch(true)}
//               style={{
//                 background: `linear-gradient(135deg, ${GOLD}, #c9b86c)`, color: NAVY_DARK,
//                 padding: "10px 32px", borderRadius: 50, border: "2px solid rgba(255,255,255,0.25)",
//                 fontSize: 11, fontWeight: 900, fontFamily: "'Cinzel',serif", letterSpacing: 2, cursor: "pointer",
//                 boxShadow: "0 4px 20px rgba(251,239,164,0.30)",
//                 transition: "transform 0.2s ease, box-shadow 0.2s ease",
//               }}
//               onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; }}
//               onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
//             >
//               SEARCH
//             </button>
//             <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", fontFamily: "'Raleway',sans-serif" }}>
//               {allTickets.length} tickets loaded · {calledCount}/90 numbers called
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ══ WINNER LIST — Dynamic from API (like HTML page) ══ */}
//       <div className="w-full max-w-7xl mx-auto mt-6">
//         <div style={{
//           background: "rgba(0,66,150,0.35)", backdropFilter: "blur(12px)",
//           borderRadius: 28, border: `2px solid rgba(251,239,164,0.22)`,
//           boxShadow: `0 20px 60px rgba(0,0,0,0.4)`, overflow: "hidden",
//         }}>
//           <div style={{ background: `linear-gradient(135deg, ${NAVY}, ${NAVY_MID})`, padding: "18px 24px", borderBottom: `2px solid rgba(251,239,164,0.18)` }}>
//             <h2 style={{ fontFamily: "'Cinzel',serif", fontSize: 18, fontWeight: 900, letterSpacing: 2, margin: 0, color: GOLD, textAlign: "center" }}>
//               🎉 WINNER LIST
//             </h2>
//             <div style={{ textAlign: "center", marginTop: 6, fontSize: 9, color: "rgba(255,255,255,0.35)", fontFamily: "'Raleway',sans-serif", letterSpacing: 2 }}>
//               {winners.length > 0 ? `${winners.length} WINNER${winners.length > 1 ? "S" : ""} DECLARED` : "AWAITING WINNERS"}
//             </div>
//           </div>

//           <div style={{ padding: "20px" }}>
//             {winners.length === 0 ? (
//               /* ── No winners yet ── */
//               <div style={{ textAlign: "center", padding: "40px 20px" }}>
//                 <div style={{ fontSize: 40, marginBottom: 12 }}>🎯</div>
//                 <div style={{ fontFamily: "'Cinzel',serif", fontSize: 14, color: "rgba(255,255,255,0.3)", letterSpacing: 2 }}>
//                   NO WINNERS YET
//                 </div>
//                 <div style={{ fontFamily: "'Raleway',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 6 }}>
//                   Winners will appear here as they are declared
//                 </div>
//               </div>
//             ) : (
//               /* ── Winners grid — same as HTML page style ── */
//               <div style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
//                 gap: 16,
//               }}>
//                 {winners.map((winner, idx) => (
//                   <div
//                     key={winner.winner_id || idx}
//                     className="pr-winner-card"
//                     onClick={() => {
//                       // Find matching ticket for detail view
//                       const ticket = allTickets.find(t => t.ticket_id === winner.ticket_id) || winner;
//                       setSelectedTicket({ ...ticket, ...winner });
//                     }}
//                     style={{
//                       borderRadius: 20, overflow: "hidden",
//                       cursor: "pointer",
//                       animation: `pr-winnerEntrance 0.6s ${idx * 0.1}s both ease, pr-winnerGlow 2.5s ${idx * 0.3}s ease-in-out infinite`,
//                       boxShadow: "0 0 28px rgba(255,215,0,0.30)",
//                       border: `2px solid ${GOLD}55`,
//                     }}
//                   >
//                     {/* Prize header */}
//                     <div style={{
//                       background: `linear-gradient(135deg, ${NAVY}, ${NAVY_MID})`,
//                       padding: "12px 16px",
//                       borderBottom: `2px solid ${GOLD}66`,
//                       display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
//                     }}>
//                       <span style={{ fontSize: 16 }}>🏆</span>
//                       <div style={{
//                         fontSize: 10, fontWeight: 900, fontFamily: "'Cinzel',serif",
//                         color: GOLD, letterSpacing: 2, textAlign: "center",
//                         textTransform: "uppercase",
//                       }}>
//                         {winner.prize_name || winner.win_type || "Winner"}
//                       </div>
//                     </div>

//                     {/* Winner info */}
//                     <div style={{
//                       background: `linear-gradient(135deg, ${GOLD}, #c9b86c)`,
//                       padding: "16px 14px",
//                       textAlign: "center",
//                     }}>
//                       <div style={{
//                         fontSize: 15, fontWeight: 900, fontFamily: "'Cinzel',serif",
//                         color: NAVY_DARK, marginBottom: 4,
//                         overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
//                       }}>
//                         {winner.user_name || "Winner"}
//                       </div>
//                       <div style={{
//                         fontSize: 10, color: NAVY_MID,
//                         fontFamily: "'Raleway',sans-serif", marginBottom: 8,
//                       }}>
//                         Ticket #{winner.ticket_number}
//                         {winner.amount ? ` · ₹${winner.amount}` : ""}
//                       </div>
//                       {winner.win_type && winner.win_type !== winner.prize_name && (
//                         <div style={{
//                           fontSize: 9, padding: "3px 10px", borderRadius: 20,
//                           background: "rgba(0,20,60,0.18)", color: NAVY_DARK,
//                           display: "inline-block", fontFamily: "'Cinzel',serif",
//                           fontWeight: 700, marginBottom: 6,
//                           border: `1px solid rgba(0,20,60,0.2)`,
//                         }}>
//                           {winner.win_type}
//                         </div>
//                       )}
//                       <div style={{
//                         marginTop: 6, fontSize: 9, padding: "4px 12px", borderRadius: 20,
//                         background: NAVY, color: GOLD, display: "inline-block",
//                         fontFamily: "'Cinzel',serif", fontWeight: 700,
//                         boxShadow: `0 2px 8px rgba(0,0,0,0.3)`,
//                       }}>
//                         VIEW TICKET →
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ─── Modals ─── */}
//       {selectedTicket && !showTicketSearch && (
//         <TicketDetailModal
//           ticket={selectedTicket}
//           calledNumbers={calledNumbers}
//           onClose={() => setSelectedTicket(null)}
//         />
//       )}
//       {showTicketSearch && (
//         <TicketSearchModal
//           tickets={filteredTickets}
//           calledNumbers={calledNumbers}
//           onClose={() => { setShowTicketSearch(false); setSelectedTicket(null); }}
//         />
//       )}
//     </>
//   );
// };

// export default PlayerRanking;

/**
 * player_ranking.jsx — PROPS-DRIVEN VERSION
 *
 * All state received via props from AfterGameLive (no internal socket).
 * No changes needed here — sound was never in this file.
 */

import React, { useState } from "react";

const GOLD      = "#FBEFA4";
const NAVY      = "#004296";
const NAVY_DARK = "#001433";
const NAVY_MID  = "#002b66";

const RANK_CONFIG = {
  1: { bg: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)", text: "#3a1f00", glow: "rgba(255,215,0,0.55)", medal: "🥇", shadow: "0 0 24px rgba(255,215,0,0.45)" },
  2: { bg: "linear-gradient(135deg, #E8E8E8 0%, #B0B0B0 100%)", text: "#1a1a2e", glow: "rgba(192,192,192,0.45)", medal: "🥈", shadow: "0 0 18px rgba(192,192,192,0.35)" },
  3: { bg: "linear-gradient(135deg, #CD7F32 0%, #8B4513 100%)", text: "#fff",    glow: "rgba(205,127,50,0.45)",  medal: "🥉", shadow: "0 0 18px rgba(205,127,50,0.35)" },
};

/* ─── Ticket grid parser ─── */
function parseTicketGrid(ticket) {
  let grid = ticket.ticket_data;
  try { if (typeof grid === "string") grid = JSON.parse(grid); } catch { grid = [[], [], []]; }
  if (!Array.isArray(grid)) grid = [[], [], []];
  const normalized = grid.slice(0, 3).map(row => {
    const safe = Array.isArray(row) ? row.slice(0, 9) : [];
    while (safe.length < 9) safe.push(null);
    return safe;
  });
  while (normalized.length < 3) normalized.push(Array(9).fill(null));
  return normalized;
}

function getMatchData(ticket, calledNumbers) {
  const grid    = parseTicketGrid(ticket);
  const flat    = grid.flat().filter(n => n !== null && n !== undefined && n !== 0 && n !== "").map(Number).filter(n => !isNaN(n));
  const matched = [...new Set(flat.filter(n => calledNumbers.includes(n)))];
  return { grid, flat, matched, matchedCount: matched.length, total: flat.length };
}

/* ─── Mini ticket grid ─── */
function TicketMiniGrid({ ticket, calledNumbers, size = "sm" }) {
  const { grid } = getMatchData(ticket, calledNumbers);
  const cellH    = size === "sm" ? 20 : 36;
  const fontSize = size === "sm" ? 8  : 13;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(9, 1fr)", gap: size === "sm" ? 2 : 4, width: "100%" }}>
      {grid.flat().map((num, i) => {
        const isEmpty   = num === null || num === undefined || num === 0 || num === "";
        const isMatched = !isEmpty && calledNumbers.includes(Number(num));
        return (
          <div key={i} style={{
            height: cellH, display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: size === "sm" ? 3 : 5,
            background: isEmpty ? "transparent" : isMatched ? `linear-gradient(135deg, ${NAVY}, #1a5fb4)` : "rgba(255,255,255,0.12)",
            border: isEmpty ? "1px dashed rgba(255,255,255,0.08)" : isMatched ? `1px solid ${GOLD}55` : "1px solid rgba(255,255,255,0.15)",
            fontSize, fontWeight: 700, fontFamily: "'Cinzel', serif",
            color: isEmpty ? "transparent" : isMatched ? GOLD : "rgba(255,255,255,0.75)",
            boxShadow: isMatched ? `0 0 6px rgba(251,239,164,0.3)` : "none",
            transition: "all 0.4s ease",
          }}>
            {!isEmpty ? num : ""}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Winner / Ticket detail modal ─── */
function TicketDetailModal({ ticket, calledNumbers, onClose }) {
  if (!ticket) return null;
  const { matched, matchedCount, total } = getMatchData(ticket, calledNumbers);
  const pct = total > 0 ? Math.round((matchedCount / total) * 100) : 0;

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(0,5,20,0.88)", backdropFilter: "blur(16px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20, animation: "pr-fadeIn 0.25s ease",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "min(680px, 100%)",
        background: `linear-gradient(160deg, ${NAVY_MID} 0%, ${NAVY_DARK} 100%)`,
        borderRadius: 24, padding: "28px 24px",
        border: `2px solid ${GOLD}55`,
        boxShadow: `0 0 60px rgba(0,0,0,0.7)`,
        position: "relative", color: "#fff",
        animation: "pr-slideUp 0.3s cubic-bezier(0.16,1.2,0.3,1)",
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16,
          width: 32, height: 32, borderRadius: "50%",
          background: "rgba(251,239,164,0.10)", border: `1px solid ${GOLD}40`,
          color: GOLD, fontSize: 16, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>✕</button>

        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 9, letterSpacing: 5, color: `${GOLD}66`, marginBottom: 6, fontFamily: "'Cinzel',serif" }}>TICKET DETAILS</div>
          <h2 style={{ fontSize: 20, fontWeight: 900, fontFamily: "'Cinzel',serif", color: GOLD, marginBottom: 4 }}>
            {ticket.prize_name || ticket.win_type || `Ticket #${ticket.ticket_number}`}
          </h2>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "'Raleway',sans-serif" }}>
            {ticket.user_name || "Unknown Player"} · Ticket #{ticket.ticket_number}
            {ticket.amount ? ` · ₹${ticket.amount}` : ""}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
          {[
            { label: "PLAYER",  val: ticket.user_name || "Unknown" },
            { label: "MATCHED", val: `${matchedCount}/${total}` },
            { label: "FILLED",  val: `${pct}%` },
          ].map(m => (
            <div key={m.label} style={{
              flex: 1, minWidth: 80, textAlign: "center",
              padding: "10px 8px", borderRadius: 12,
              background: "rgba(0,20,51,0.5)", border: `1px solid rgba(251,239,164,0.10)`,
            }}>
              <div style={{ fontSize: 16, fontWeight: 900, fontFamily: "'Cinzel',serif", color: GOLD }}>{m.val}</div>
              <div style={{ fontSize: 7, color: "rgba(255,255,255,0.3)", letterSpacing: 2, marginTop: 3 }}>{m.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "rgba(0,8,24,0.5)", borderRadius: 16, padding: 14, border: "1px solid rgba(251,239,164,0.08)" }}>
          <div style={{ fontSize: 8, color: `${GOLD}44`, letterSpacing: 3, marginBottom: 10, fontFamily: "'Cinzel',serif", textAlign: "center" }}>TICKET GRID</div>
          <TicketMiniGrid ticket={ticket} calledNumbers={calledNumbers} size="lg" />
        </div>

        {matched.length > 0 && (
          <div style={{ marginTop: 14, textAlign: "center" }}>
            <div style={{ fontSize: 8, color: `${GOLD}55`, letterSpacing: 2, marginBottom: 8, fontFamily: "'Cinzel',serif" }}>MATCHED NUMBERS</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
              {matched.map(n => (
                <span key={n} style={{
                  padding: "4px 10px", borderRadius: 20,
                  background: `linear-gradient(135deg, ${NAVY}, #1a5fb4)`,
                  border: `1px solid ${GOLD}55`,
                  fontSize: 10, fontWeight: 700, fontFamily: "'Cinzel',serif", color: GOLD,
                }}>{n}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Ticket search modal ─── */
function TicketSearchModal({ tickets, calledNumbers, onClose }) {
  const [query,    setQuery]    = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = query.trim()
    ? tickets.filter(t =>
        t.ticket_number?.toString().includes(query) ||
        (t.user_name || "").toLowerCase().includes(query.toLowerCase())
      )
    : tickets;

  if (selected) {
    return <TicketDetailModal ticket={selected} calledNumbers={calledNumbers} onClose={() => setSelected(null)} />;
  }

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 9998,
      background: "rgba(0,5,20,0.88)", backdropFilter: "blur(16px)",
      display: "flex", alignItems: "flex-start", justifyContent: "center",
      padding: "60px 16px 24px", animation: "pr-fadeIn 0.2s ease",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "min(900px, 100%)",
        background: `linear-gradient(160deg, ${NAVY_MID}, ${NAVY_DARK})`,
        borderRadius: 24, border: `2px solid ${GOLD}44`,
        boxShadow: `0 30px 80px rgba(0,0,0,0.8)`,
        display: "flex", flexDirection: "column",
        maxHeight: "calc(100vh - 80px)",
        animation: "pr-slideUp 0.3s cubic-bezier(0.16,1.2,0.3,1)",
      }}>
        <div style={{ padding: "20px 20px 16px", borderBottom: `1px solid rgba(251,239,164,0.08)` }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 900, fontFamily: "'Cinzel',serif", color: GOLD, letterSpacing: 3 }}>🔍 SEARCH TICKETS</div>
            <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(251,239,164,0.08)", border: `1px solid ${GOLD}40`, color: GOLD, fontSize: 14, cursor: "pointer" }}>✕</button>
          </div>
          <div style={{ position: "relative" }}>
            <input
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Enter ticket number or player name..."
              style={{
                width: "100%", padding: "12px 16px", borderRadius: 50,
                background: "rgba(255,255,255,0.07)",
                border: `1.5px solid ${query ? GOLD + "88" : "rgba(251,239,164,0.18)"}`,
                color: "#fff", fontSize: 13, fontFamily: "'Raleway',sans-serif",
                outline: "none", boxSizing: "border-box",
              }}
            />
            {query && (
              <button onClick={() => setQuery("")} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: `${GOLD}88`, cursor: "pointer", fontSize: 16 }}>✕</button>
            )}
          </div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginTop: 8, fontFamily: "'Raleway',sans-serif" }}>
            Showing <span style={{ color: GOLD, fontWeight: 700 }}>{filtered.length}</span> of {tickets.length} tickets
          </div>
        </div>

        <div style={{ overflowY: "auto", flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", padding: 40, fontFamily: "'Raleway',sans-serif" }}>No tickets found</div>
          ) : filtered.map(ticket => {
            const { matchedCount, total } = getMatchData(ticket, calledNumbers);
            const pct      = total > 0 ? Math.round((matchedCount / total) * 100) : 0;
            const isWinner = ticket.winner_id && ticket.prize_name;
            return (
              <div key={ticket.ticket_id} onClick={() => setSelected(ticket)}
                style={{
                  background: isWinner ? `linear-gradient(135deg, rgba(255,215,0,0.08), rgba(0,66,150,0.3))` : "rgba(0,20,51,0.4)",
                  border: `1px solid ${isWinner ? GOLD + "55" : "rgba(251,239,164,0.08)"}`,
                  borderRadius: 14, padding: "14px 16px", cursor: "pointer",
                  boxShadow: isWinner ? `0 0 20px rgba(255,215,0,0.12)` : "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, flexWrap: "wrap", gap: 6 }}>
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 900, fontFamily: "'Cinzel',serif", color: GOLD }}>🎟️ #{ticket.ticket_number}</span>
                    {isWinner && <span style={{ marginLeft: 8, fontSize: 9, padding: "3px 8px", borderRadius: 20, background: "rgba(255,215,0,0.15)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.3)", fontWeight: 700 }}>🏆 {ticket.prize_name}</span>}
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", fontFamily: "'Raleway',sans-serif" }}>{ticket.user_name || "Unsold"}</span>
                    <span style={{ fontSize: 9, padding: "3px 10px", borderRadius: 20, background: `linear-gradient(135deg, ${NAVY}, #1a5fb4)`, border: `1px solid ${GOLD}40`, color: GOLD, fontWeight: 700 }}>{matchedCount}/{total} · {pct}%</span>
                  </div>
                </div>
                <div style={{ width: "100%", height: 2, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", width: `${pct}%`, borderRadius: 2,
                    background: pct >= 80 ? "linear-gradient(90deg, #FFD700, #FFA500)" : pct >= 50 ? "linear-gradient(90deg, #1abc9c, #0e8a72)" : `linear-gradient(90deg, ${NAVY}, #1a5fb4)`,
                    transition: "width 0.8s ease",
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   MAIN: PlayerRanking — ALL STATE FROM PROPS
════════════════════════════════════════════════════════════════ */
const PlayerRanking = ({
  calledNumbers = [],
  calledCount   = 0,
  allTickets    = [],
  winners       = [],
  connected     = false,
}) => {
  const [selectedTicket,   setSelectedTicket]   = useState(null);
  const [showTicketSearch, setShowTicketSearch] = useState(false);
  const [searchQuery,      setSearchQuery]      = useState("");

  /* ── Live ranking derived from props ── */
  const rankingData = React.useMemo(() => {
    return allTickets
      .map(t => {
        const { matchedCount, total } = getMatchData(t, calledNumbers);
        const pct = total > 0 ? Math.round((matchedCount / total) * 100) : 0;
        return { ...t, matchedCount, total, pct };
      })
      .sort((a, b) => b.matchedCount - a.matchedCount || a.ticket_number - b.ticket_number)
      .slice(0, 10);
  }, [allTickets, calledNumbers]);

  /* ── Filtered tickets for search ── */
  const filteredTickets = React.useMemo(() => {
    if (!searchQuery.trim()) return allTickets;
    const q = searchQuery.toLowerCase();
    return allTickets.filter(t =>
      t.ticket_number?.toString().includes(q) ||
      (t.user_name || "").toLowerCase().includes(q) ||
      (t.user_id || "").toString().includes(q)
    );
  }, [allTickets, searchQuery]);

  const loading = allTickets.length === 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Raleway:wght@300;400;600&display=swap');
        @keyframes pr-fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pr-slideUp {
          from { transform: translateY(30px) scale(0.97); opacity: 0; }
          to   { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes pr-cardIn {
          from { transform: translateX(20px) scale(0.95); opacity: 0; }
          to   { transform: translateX(0) scale(1); opacity: 1; }
        }
        @keyframes pr-shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
        @keyframes pr-breathe {
          0%,100% { opacity: 0.4; }
          50%     { opacity: 1; }
        }
        @keyframes pr-winnerGlow {
          0%,100% { box-shadow: 0 0 20px rgba(255,215,0,0.3); }
          50%     { box-shadow: 0 0 40px rgba(255,215,0,0.6), 0 0 80px rgba(255,215,0,0.2); }
        }
        @keyframes pr-winnerEntrance {
          0%   { transform: scale(0.85) translateY(10px); opacity: 0; }
          60%  { transform: scale(1.04) translateY(-2px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .pr-rank-card   { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .pr-rank-card:hover { transform: translateY(-4px) scale(1.02); }
        .pr-winner-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .pr-winner-card:hover { transform: translateY(-3px) scale(1.03); }
        .pr-gold-shimmer {
          background: linear-gradient(90deg, #c9b86c 0%, #ffe066 28%, #FBEFA4 50%, #ffe066 72%, #c9b86c 100%);
          background-size: 400px 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: pr-shimmer 3s linear infinite;
        }
      `}</style>

      {/* ══ PLAYER RANKING ══ */}
      <div className="w-full max-w-7xl mx-auto mt-8">
        <div style={{
          background: "rgba(0,66,150,0.35)", backdropFilter: "blur(12px)",
          borderRadius: 28, border: `2px solid rgba(251,239,164,0.22)`,
          boxShadow: `0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(251,239,164,0.06)`,
          overflow: "hidden",
        }}>
          <div style={{
            background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_MID} 100%)`,
            padding: "18px 24px", borderBottom: `2px solid rgba(251,239,164,0.18)`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <h2 style={{ fontFamily: "'Cinzel',serif", fontSize: 18, fontWeight: 900, letterSpacing: 2, margin: 0 }}>
              <span className="pr-gold-shimmer">🏆 PLAYER RANKING</span>
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 7, height: 7, borderRadius: "50%",
                background: connected ? "#1abc9c" : "#ff4444",
                boxShadow: connected ? "0 0 8px #1abc9c" : "0 0 8px #ff4444",
                animation: "pr-breathe 2s ease-in-out infinite",
              }} />
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", fontFamily: "'Cinzel',serif", letterSpacing: 2 }}>
                {loading ? "LOADING" : connected ? "LIVE" : "OFFLINE"}
              </span>
            </div>
          </div>

          <div style={{ padding: "16px 20px 20px", overflowX: "auto" }}>
            {loading ? (
              <div style={{ textAlign: "center", padding: 40, color: "rgba(255,255,255,0.3)", fontFamily: "'Raleway',sans-serif" }}>Loading rankings…</div>
            ) : rankingData.length === 0 ? (
              <div style={{ textAlign: "center", padding: 40, color: "rgba(255,255,255,0.3)", fontFamily: "'Raleway',sans-serif" }}>No tickets found</div>
            ) : (
              <div style={{ display: "flex", gap: 14, minWidth: "max-content", paddingBottom: 6 }}>
                {rankingData.map((item, idx) => {
                  const rank    = idx + 1;
                  const cfg     = RANK_CONFIG[rank];
                  const isTop3  = rank <= 3;
                  const isWinner = item.winner_id && item.prize_name;
                  return (
                    <div key={item.ticket_id || item.ticket_number} className="pr-rank-card"
                      onClick={() => setSelectedTicket(item)}
                      style={{
                        width: 180, flexShrink: 0, borderRadius: 20, padding: "16px 14px",
                        background: isTop3 ? cfg.bg : "rgba(255,255,255,0.07)",
                        border: isTop3 ? `2px solid rgba(255,255,255,0.35)` : `2px solid rgba(251,239,164,0.18)`,
                        boxShadow: isTop3 ? cfg.shadow : isWinner ? "0 0 20px rgba(255,215,0,0.2)" : "0 4px 16px rgba(0,0,0,0.3)",
                        cursor: "pointer", position: "relative", overflow: "hidden",
                        animation: `pr-cardIn 0.4s ${idx * 0.06}s both ease`,
                      }}
                    >
                      {isTop3 && (
                        <div style={{
                          position: "absolute", top: 0, left: 0, right: 0, height: 40,
                          background: "linear-gradient(180deg, rgba(255,255,255,0.18), transparent)",
                          borderRadius: "20px 20px 0 0", pointerEvents: "none",
                        }} />
                      )}
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                        <span style={{ fontSize: 20 }}>{isTop3 ? cfg.medal : "🎯"}</span>
                        <div style={{ fontSize: 9, fontWeight: 900, fontFamily: "'Cinzel',serif", letterSpacing: 2, color: isTop3 ? cfg.text : "rgba(255,255,255,0.5)" }}>
                          RANK #{rank}
                        </div>
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 900, fontFamily: "'Cinzel',serif", color: isTop3 ? cfg.text : "#fff", marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.user_name || "Unknown"}
                      </div>
                      <div style={{ fontSize: 9, color: isTop3 ? `${cfg.text}aa` : "rgba(255,255,255,0.45)", fontFamily: "'Raleway',sans-serif", marginBottom: 12 }}>
                        Ticket #{item.ticket_number}{isWinner && " 🏆"}
                      </div>
                      <div style={{ marginBottom: 6 }}>
                        <div style={{ width: "100%", height: 4, borderRadius: 4, background: isTop3 ? "rgba(0,0,0,0.20)" : "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                          <div style={{
                            height: "100%", width: `${item.pct}%`, borderRadius: 4,
                            background: isTop3 ? "rgba(0,0,0,0.35)" : `linear-gradient(90deg, ${NAVY}, #1a5fb4)`,
                            transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
                          }} />
                        </div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 14, fontWeight: 900, fontFamily: "'Cinzel',serif", color: isTop3 ? cfg.text : GOLD }}>
                          {item.matchedCount}/{item.total}
                        </span>
                        <span style={{ fontSize: 9, fontWeight: 700, color: isTop3 ? `${cfg.text}88` : "rgba(255,255,255,0.35)", fontFamily: "'Raleway',sans-serif" }}>
                          {item.pct}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══ TICKET SEARCH ══ */}
      <div className="w-full max-w-7xl mx-auto mt-6">
        <div style={{
          background: "rgba(0,66,150,0.35)", backdropFilter: "blur(12px)",
          borderRadius: 28, border: `2px solid rgba(251,239,164,0.22)`,
          boxShadow: `0 20px 60px rgba(0,0,0,0.4)`, overflow: "hidden",
        }}>
          <div style={{ background: `linear-gradient(135deg, ${NAVY}, ${NAVY_MID})`, padding: "18px 24px", borderBottom: `2px solid rgba(251,239,164,0.18)` }}>
            <h2 style={{ fontFamily: "'Cinzel',serif", fontSize: 18, fontWeight: 900, letterSpacing: 2, margin: 0, color: GOLD, textAlign: "center" }}>
              🔍 TICKETS FOR GAME
            </h2>
          </div>
          <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative", width: "100%", maxWidth: 480 }}>
              <input
                type="text"
                placeholder="Enter ticket no., name or agent…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => { if (allTickets.length > 0) setShowTicketSearch(true); }}
                style={{
                  width: "100%", padding: "12px 44px 12px 20px", borderRadius: 50,
                  background: "rgba(255,255,255,0.08)",
                  border: `1.5px solid ${searchQuery ? GOLD + "88" : "rgba(251,239,164,0.30)"}`,
                  color: "#fff", fontSize: 13, fontFamily: "'Raleway',sans-serif",
                  outline: "none", boxSizing: "border-box",
                  transition: "border-color 0.3s ease",
                }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: `${GOLD}88`, cursor: "pointer", fontSize: 16 }}>✕</button>
              )}
            </div>
            <button
              onClick={() => setShowTicketSearch(true)}
              style={{
                background: `linear-gradient(135deg, ${GOLD}, #c9b86c)`, color: NAVY_DARK,
                padding: "10px 32px", borderRadius: 50, border: "2px solid rgba(255,255,255,0.25)",
                fontSize: 11, fontWeight: 900, fontFamily: "'Cinzel',serif", letterSpacing: 2, cursor: "pointer",
                boxShadow: "0 4px 20px rgba(251,239,164,0.30)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              SEARCH
            </button>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", fontFamily: "'Raleway',sans-serif" }}>
              {allTickets.length} tickets loaded · {calledCount}/90 numbers called
            </div>
          </div>
        </div>
      </div>

      {/* ══ WINNER LIST ══ */}
      <div className="w-full max-w-7xl mx-auto mt-6">
        <div style={{
          background: "rgba(0,66,150,0.35)", backdropFilter: "blur(12px)",
          borderRadius: 28, border: `2px solid rgba(251,239,164,0.22)`,
          boxShadow: `0 20px 60px rgba(0,0,0,0.4)`, overflow: "hidden",
        }}>
          <div style={{ background: `linear-gradient(135deg, ${NAVY}, ${NAVY_MID})`, padding: "18px 24px", borderBottom: `2px solid rgba(251,239,164,0.18)` }}>
            <h2 style={{ fontFamily: "'Cinzel',serif", fontSize: 18, fontWeight: 900, letterSpacing: 2, margin: 0, color: GOLD, textAlign: "center" }}>
              🎉 WINNER LIST
            </h2>
            <div style={{ textAlign: "center", marginTop: 6, fontSize: 9, color: "rgba(255,255,255,0.35)", fontFamily: "'Raleway',sans-serif", letterSpacing: 2 }}>
              {winners.length > 0 ? `${winners.length} WINNER${winners.length > 1 ? "S" : ""} DECLARED` : "AWAITING WINNERS"}
            </div>
          </div>

          <div style={{ padding: "20px" }}>
            {winners.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🎯</div>
                <div style={{ fontFamily: "'Cinzel',serif", fontSize: 14, color: "rgba(255,255,255,0.3)", letterSpacing: 2 }}>
                  NO WINNERS YET
                </div>
                <div style={{ fontFamily: "'Raleway',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 6 }}>
                  Winners will appear here as they are declared
                </div>
              </div>
            ) : (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 16,
              }}>
                {winners.map((winner, idx) => (
                  <div
                    key={winner.winner_id || idx}
                    className="pr-winner-card"
                    onClick={() => {
                      const ticket = allTickets.find(t => t.ticket_id === winner.ticket_id) || winner;
                      setSelectedTicket({ ...ticket, ...winner });
                    }}
                    style={{
                      borderRadius: 20, overflow: "hidden",
                      cursor: "pointer",
                      animation: `pr-winnerEntrance 0.6s ${idx * 0.1}s both ease, pr-winnerGlow 2.5s ${idx * 0.3}s ease-in-out infinite`,
                      boxShadow: "0 0 28px rgba(255,215,0,0.30)",
                      border: `2px solid ${GOLD}55`,
                    }}
                  >
                    <div style={{
                      background: `linear-gradient(135deg, ${NAVY}, ${NAVY_MID})`,
                      padding: "12px 16px",
                      borderBottom: `2px solid ${GOLD}66`,
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    }}>
                      <span style={{ fontSize: 16 }}>🏆</span>
                      <div style={{
                        fontSize: 10, fontWeight: 900, fontFamily: "'Cinzel',serif",
                        color: GOLD, letterSpacing: 2, textAlign: "center",
                        textTransform: "uppercase",
                      }}>
                        {winner.prize_name || winner.win_type || "Winner"}
                      </div>
                    </div>

                    <div style={{
                      background: `linear-gradient(135deg, ${GOLD}, #c9b86c)`,
                      padding: "16px 14px",
                      textAlign: "center",
                    }}>
                      <div style={{
                        fontSize: 15, fontWeight: 900, fontFamily: "'Cinzel',serif",
                        color: NAVY_DARK, marginBottom: 4,
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      }}>
                        {winner.user_name || "Winner"}
                      </div>
                      <div style={{
                        fontSize: 10, color: NAVY_MID,
                        fontFamily: "'Raleway',sans-serif", marginBottom: 8,
                      }}>
                        Ticket #{winner.ticket_number}
                        {winner.amount ? ` · ₹${winner.amount}` : ""}
                      </div>
                      {winner.win_type && winner.win_type !== winner.prize_name && (
                        <div style={{
                          fontSize: 9, padding: "3px 10px", borderRadius: 20,
                          background: "rgba(0,20,60,0.18)", color: NAVY_DARK,
                          display: "inline-block", fontFamily: "'Cinzel',serif",
                          fontWeight: 700, marginBottom: 6,
                          border: `1px solid rgba(0,20,60,0.2)`,
                        }}>
                          {winner.win_type}
                        </div>
                      )}
                      <div style={{
                        marginTop: 6, fontSize: 9, padding: "4px 12px", borderRadius: 20,
                        background: NAVY, color: GOLD, display: "inline-block",
                        fontFamily: "'Cinzel',serif", fontWeight: 700,
                        boxShadow: `0 2px 8px rgba(0,0,0,0.3)`,
                      }}>
                        VIEW TICKET →
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Modals ─── */}
      {selectedTicket && !showTicketSearch && (
        <TicketDetailModal
          ticket={selectedTicket}
          calledNumbers={calledNumbers}
          onClose={() => setSelectedTicket(null)}
        />
      )}
      {showTicketSearch && (
        <TicketSearchModal
          tickets={filteredTickets}
          calledNumbers={calledNumbers}
          onClose={() => { setShowTicketSearch(false); setSelectedTicket(null); }}
        />
      )}
    </>
  );
};

export default PlayerRanking;