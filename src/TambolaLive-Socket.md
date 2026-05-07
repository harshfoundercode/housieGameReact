# TambolaLive — Socket & Events Documentation

## Connection

The component connects to the Tambola WebSocket server using `socket.io-client`.

```js
const socket = io("https://tambola.honeywithmoon.com", {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
});
```

### Connection Options

| Option | Value | Description |
|--------|-------|-------------|
| `transports` | `["websocket"]` | Forces WebSocket only — no polling fallback |
| `reconnection` | `true` | Auto-reconnects on drop |
| `reconnectionAttempts` | `Infinity` | Never gives up reconnecting |
| `reconnectionDelay` | `1000ms` | Initial wait before retry |
| `reconnectionDelayMax` | `5000ms` | Max wait between retries |

The socket instance is stored in a `useRef` (`socketRef`) so it persists across renders without causing re-renders.

---

## Lifecycle

```
Component mounts
    ↓
socket connects  →  emit "get_game_data" { game_id }
    ↓
server sends "old_numbers"  →  populate grid + tray with history
    ↓
server sends "game_started"
    ↓
server sends "number_called" (repeatedly)
    ↓
server sends "game_over"
    ↓
Component unmounts  →  socket.disconnect()
```

---

## Emitted Events (Client → Server)

### `get_game_data`

Sent immediately on connect. Requests the current game state and history.

```js
socket.emit("get_game_data", { game_id: gameId });
```

| Field | Type | Description |
|-------|------|-------------|
| `game_id` | `number` | The game to subscribe to |

---

## Received Events (Server → Client)

### `connect`

Built-in socket.io event. Fired when the WebSocket connection is established.

**Effect:**
- Sets `connected = true`
- Emits `get_game_data` to sync current game state

---

### `disconnect`

Built-in socket.io event. Fired when the connection drops (network loss, server restart, etc.).

**Effect:**
- Sets `connected = false`
- Socket auto-reconnects per configuration

---

### `connect_error`

Built-in socket.io event. Fired when a connection attempt fails.

**Effect:**
- Sets `connected = false`

---

### `game_started`

Server signals the game has begun.

**Payload:** _(none expected)_

**Effect:**
- Sets `gameStatus = "started"`
- Sets `done = false` (clears any previous full-house overlay)

---

### `game_paused`

Server signals the game draw has been paused.

**Payload:** _(none expected)_

**Effect:**
- Sets `gameStatus = "paused"`
- Status dot changes from green to gold

---

### `game_resumed`

Server signals the game draw has resumed after a pause.

**Payload:** _(none expected)_

**Effect:**
- Sets `gameStatus = "started"`

---

### `game_over`

Server signals all 90 numbers have been called or the game has ended.

**Payload:** _(none expected)_

**Effect:**
- Sets `gameStatus = "over"`
- Sets `done = true` → triggers the Full House overlay

---

### `number_called`

**The primary event.** Fired each time the server calls a new number.

**Payload:**

```json
{
  "game_id": 34,
  "number": 47
}
```

| Field | Type | Description |
|-------|------|-------------|
| `game_id` | `number` | Must match component's `gameId` prop — events for other games are ignored |
| `number` | `number` | The drawn number (1–90) |

**Effect sequence (in order):**

1. Clears all pending timeouts from any previous reveal sequence
2. Plays audio: `/sounds/{number}.mp3` at volume 0.85
3. Sets `bigNum = number` and increments `revealId` → forces `BigBall` to remount and restart its animation
4. Sets `showPulse = true` → pulse rings appear immediately
5. Sets `showParticles = false` initially
6. After **150ms**: sets `showParticles = true` → particles burst outward
7. Sets `arrivingCell = number` → triggers `tlGridArrive` animation on the grid cell
8. After **800ms**: clears `arrivingCell = null`
9. Updates `tray` using functional setter:
   - Slot 0 → new number (id incremented → `tlTraySettle` animation fires)
   - Slot 1 → previous slot 0 number (id unchanged → no animation)
10. Updates `calledSet` (adds the number) and increments `calledCount`
11. After **4000ms**: clears `showPulse`, `showParticles`, `bigNum = null`

> **Note:** All timeouts are registered in `timeoutsRef` and cleared at the start of each `number_called` event. This prevents overlapping animation sequences if numbers arrive faster than 4 seconds apart.

---

### `old_numbers`

Sent by the server after `get_game_data` is received. Provides the full history of numbers called so far in the current game. Used for reconnection and page refresh recovery.

**Payload:**

```json
{
  "calledNumbers": [5, 23, 67, 12, ...]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `calledNumbers` | `number[]` | Ordered array of all numbers called so far (oldest first) |

**Effect:**

- Populates `calledSet` with all numbers → grid lights up immediately with no animation
- Sets `calledCount` to the length of the array
- Fills the tray:
  - Slot 0 → last element (most recent number), `id = 1`
  - Slot 1 → second-to-last element, `id = 2`
  - No animations play (tray balls are rendered statically)

---

## Timeout Management

All `setTimeout` calls inside `revealNumber` are tracked in `timeoutsRef`:

```js
const timeoutsRef = useRef([]);

const after = (ms, fn) => {
  const id = setTimeout(fn, ms);
  timeoutsRef.current.push(id);
  return id;
};

const clearAllTimeouts = () => {
  timeoutsRef.current.forEach(clearTimeout);
  timeoutsRef.current = [];
};
```

`clearAllTimeouts()` is called at the start of every `number_called` handler and on component unmount. This prevents stale timeouts from a previous number call from clearing `bigNum` or `showPulse` mid-animation for a newer number.

---

## State Updated by Socket Events

| State | Type | Updated By |
|-------|------|-----------|
| `connected` | `boolean` | `connect`, `disconnect`, `connect_error` |
| `gameStatus` | `string` | `game_started`, `game_paused`, `game_resumed`, `game_over` |
| `done` | `boolean` | `game_started` (false), `game_over` (true) |
| `bigNum` | `number \| null` | `number_called` (set), timeout (clear) |
| `revealId` | `number` | `number_called` (increment) |
| `showPulse` | `boolean` | `number_called` (true), timeout (false) |
| `showParticles` | `boolean` | After 150ms delay (true), timeout (false) |
| `arrivingCell` | `number \| null` | `number_called` (set), after 800ms (clear) |
| `calledSet` | `Set<number>` | `number_called`, `old_numbers` |
| `calledCount` | `number` | `number_called`, `old_numbers` |
| `tray` | `[{num, id}, {num, id}]` | `number_called`, `old_numbers` |

---

## Audio

Number sounds are loaded on demand (not preloaded):

```js
function playNumberSound(n) {
  const audio = new Audio(`/sounds/${n}.mp3`);
  audio.volume = 0.85;
  audio.play().catch(() => {});
}
```

Expected file structure: `/public/sounds/1.mp3` through `/public/sounds/90.mp3`

Errors are silently caught — if a sound file is missing, the visual reveal still plays normally.

---

## Cleanup

On component unmount, the `useEffect` cleanup function:

1. Calls `clearAllTimeouts()` — prevents any pending state updates after unmount
2. Calls `socket.disconnect()` — closes the WebSocket connection cleanly

```js
return () => {
  clearAllTimeouts();
  socket.disconnect();
};
```
