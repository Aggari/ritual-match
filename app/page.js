"use client";
import { useState, useEffect, useRef, useCallback } from "react";

// ─── COMMUNITY PFP POOL (97 members) ─────────────────────────────
const COLORS = ["#5DCAA5","#EF9F27","#85B7EB","#ED93B1","#C8A2FF","#FFD96A","#78F0C4","#FF89B5","#FFB86B","#8DB7FF"];

const ALL_HANDLES = [
  { handle: "_focapa", ext: "jpg" },
  { handle: "0x_HalfMoonKid", ext: "jpg" },
  { handle: "0xBANDAL", ext: "jpg" },
  { handle: "0xhigash1", ext: "jpg" },
  { handle: "0xKreko", ext: "jpg" },
  { handle: "0xOsaragi", ext: "jpg" },
  { handle: "0xspeedx", ext: "jpg" },
  { handle: "0xusamaa", ext: "jpg" },
  { handle: "4betterlife__", ext: "jpg" },
  { handle: "1000jae00001", ext: "jpg" },
  { handle: "Anh_Beeng386", ext: "jpg" },
  { handle: "anirudhchain", ext: "jpg" },
  { handle: "batagor", ext: "jpg" },
  { handle: "bramexyz", ext: "jpg" },
  { handle: "bruceBravogo", ext: "jpg" },
  { handle: "BunsDev", ext: "jpg" },
  { handle: "calistalarisa", ext: "jpg" },
  { handle: "ccrriiy", ext: "jpg" },
  { handle: "Chigo1andonly", ext: "jpg" },
  { handle: "Cripson01", ext: "jpg" },
  { handle: "cristypuiu", ext: "jpg" },
  { handle: "cryptohypegirl0", ext: "jpg" },
  { handle: "cryptokj77", ext: "jpg" },
  { handle: "dappeum", ext: "jpg" },
  { handle: "decka_chan", ext: "jpg" },
  { handle: "DipuDas76904823", ext: "jpg" },
  { handle: "Donaclin", ext: "jpg" },
  { handle: "elifhilalumucu", ext: "jpg" },
  { handle: "ericgudboy", ext: "jpg" },
  { handle: "Fakhirgb", ext: "jpg" },
  { handle: "farmtokyo", ext: "jpg" },
  { handle: "girin0505", ext: "jpg" },
  { handle: "gizdusumandnode", ext: "jpg" },
  { handle: "glenfiddich_18", ext: "jpg" },
  { handle: "hamiweb3", ext: "jpg" },
  { handle: "heeheeheeyaa", ext: "jpg" },
  { handle: "herbcase7", ext: "jpg" },
  { handle: "imborie", ext: "jpg" },
  { handle: "innerpeace300", ext: "jpg" },
  { handle: "jasm1ne_eth", ext: "jpg" },
  { handle: "jepslife", ext: "jpg" },
  { handle: "johhmeow", ext: "jpg" },
  { handle: "johntolxbt", ext: "jpg" },
  { handle: "kastew99999", ext: "jpg" },
  { handle: "kikiundo3", ext: "jpg" },
  { handle: "lalararara37", ext: "jpg" },
  { handle: "linhlambo", ext: "jpg" },
  { handle: "Liora_2278", ext: "jpg" },
  { handle: "Livinginaprayer", ext: "jpg" },
  { handle: "lord__luci", ext: "jpg" },
  { handle: "Madrii_dd", ext: "jpg" },
  { handle: "MarkoStevan19", ext: "jpg" },
  { handle: "mashpotatop", ext: "jpg" },
  { handle: "maslenaFM", ext: "jpg" },
  { handle: "Maxim_Ilyano", ext: "jpg" },
  { handle: "meison_mswen", ext: "jpg" },
  { handle: "mifyroxyy", ext: "jpg" },
  { handle: "moc_tx89", ext: "jpg" },
  { handle: "MOONSEO_", ext: "jpg" },
  { handle: "moooo_iii", ext: "jpg" },
  { handle: "murataydn_34", ext: "jpg" },
  { handle: "NanangN27", ext: "jpg" },
  { handle: "Neitenoz26", ext: "jpg" },
  { handle: "nikitatechnik", ext: "jpg" },
  { handle: "pangdung_", ext: "jpg" },
  { handle: "PixelSect", ext: "jpg" },
  { handle: "PMemoye", ext: "jpg" },
  { handle: "Pugovka_Mari", ext: "jpg" },
  { handle: "Rahul_xyz01", ext: "jpg" },
  { handle: "raintaro_rt", ext: "jpg" },
  { handle: "rifal19988", ext: "jpg" },
  { handle: "ritualcommunity", ext: "jpg" },
  { handle: "rocariedk", ext: "png" },
  { handle: "SaintLee04", ext: "jpg" },
  { handle: "seesac_", ext: "jpg" },
  { handle: "sengoku_xyz", ext: "jpg" },
  { handle: "silverwave1000", ext: "jpg" },
  { handle: "songsong6059", ext: "jpg" },
  { handle: "SOYEONKIM521597", ext: "jpg" },
  { handle: "soyoulJ", ext: "jpg" },
  { handle: "starknight50x", ext: "jpg" },
  { handle: "sterjke", ext: "jpg" },
  { handle: "superJinee", ext: "jpg" },
  { handle: "Syrupynut", ext: "jpg" },
  { handle: "temainweb", ext: "jpg" },
  { handle: "tutubearrr", ext: "jpg" },
  { handle: "tutufly_yy", ext: "jpg" },
  { handle: "w22py", ext: "jpg" },
  { handle: "wallets12_lee", ext: "jpg" },
  { handle: "whuanjg", ext: "jpg" },
  { handle: "Yaneul2ee", ext: "jpg" },
  { handle: "yooyoungmin3", ext: "jpg" },
  { handle: "yourinuu", ext: "jpg" },
  { handle: "yunbbong", ext: "jpg" },
  { handle: "yusrilatiqur", ext: "jpg" },
  { handle: "zeno_Isone", ext: "jpg" },
  { handle: "zzing____", ext: "jpg" }
];

const ALL_PFPS = ALL_HANDLES.map((h, i) => ({
  id: i,
  handle: h.handle,
  imageUrl: `/pfps/@${h.handle}.${h.ext}`,
  color: COLORS[i % COLORS.length],
}));

// Pick 6 random PFPs per game (match-3 balance requires small pool)
const POOL_SIZE = 6;
const pickRandomPFPs = () => {
  const shuffled = [...ALL_PFPS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, POOL_SIZE).map((p, i) => ({
    ...p,
    color: COLORS[i],
    id: i,
  }));
};

let PFP_COLORS = pickRandomPFPs();

const GRID_SIZE = 8;
const GAME_TIME = 60;

// Tile types
const TILE_NORMAL = "normal";
const TILE_ROCKET_H = "rocket_h";
const TILE_ROCKET_V = "rocket_v";
const TILE_BOMB = "bomb";
const TILE_RAINBOW = "rainbow";
const TILE_ICE = "ice";
const TILE_MYSTERY = "mystery";

// ─── SOUND ──────────────────────────────────────────────────────
const useSound = () => {
  const ctx = useRef(null);
  const getCtx = () => { if (!ctx.current) ctx.current = new (window.AudioContext || window.webkitAudioContext)(); return ctx.current; };
  const play = (f, d, t = "sine", v = 0.04) => {
    try {
      const c = getCtx(); const o = c.createOscillator(); const g = c.createGain();
      o.type = t; o.frequency.value = f;
      g.gain.setValueAtTime(v, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + d);
      o.connect(g); g.connect(c.destination);
      o.start(); o.stop(c.currentTime + d);
    } catch (e) {}
  };
  return {
    match: (combo) => {
      const base = 440 + combo * 80;
      [base, base * 1.25, base * 1.5].forEach((f, i) => setTimeout(() => play(f, 0.08, "sine", 0.04), i * 30));
    },
    swap: () => play(600, 0.04, "triangle", 0.02),
    invalid: () => play(200, 0.1, "square", 0.03),
    special: () => {
      [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => play(f, 0.12, "sine", 0.05), i * 40));
    },
    bomb: () => {
      play(120, 0.3, "sawtooth", 0.06);
      setTimeout(() => play(80, 0.4, "sawtooth", 0.05), 100);
    },
    tick: () => play(800, 0.03, "sine", 0.02),
    start: () => { play(440, 0.1); setTimeout(() => play(554, 0.1), 100); setTimeout(() => play(659, 0.15), 200); },
    end: () => { play(600, 0.15); setTimeout(() => play(500, 0.15), 120); setTimeout(() => play(400, 0.25), 240); },
  };
};

// ─── HELPERS ────────────────────────────────────────────────────
const makeTile = (pfpId, type = TILE_NORMAL) => ({
  id: Math.random().toString(36).slice(2),
  pfpId,
  type,
});

const randPFPId = () => Math.floor(Math.random() * PFP_COLORS.length);

// Create grid without initial matches
const createGrid = () => {
  const grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null));
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      let pfpId;
      do {
        pfpId = randPFPId();
      } while (
        (c >= 2 && grid[r][c-1]?.pfpId === pfpId && grid[r][c-2]?.pfpId === pfpId) ||
        (r >= 2 && grid[r-1][c]?.pfpId === pfpId && grid[r-2][c]?.pfpId === pfpId)
      );
      grid[r][c] = makeTile(pfpId);
    }
  }
  return grid;
};

// Find all matches (3+), returns array of match groups with their cells
const findMatches = (grid) => {
  const matches = []; // array of { cells: [[r,c],...], length, direction, pfpId }

  // Horizontal
  for (let r = 0; r < GRID_SIZE; r++) {
    let run = [[r, 0]];
    for (let c = 1; c < GRID_SIZE; c++) {
      if (grid[r][c] && grid[r][c-1] && grid[r][c].pfpId === grid[r][c-1].pfpId && grid[r][c].type !== TILE_ICE && grid[r][c-1].type !== TILE_ICE) {
        run.push([r, c]);
      } else {
        if (run.length >= 3) matches.push({ cells: [...run], length: run.length, dir: "h", pfpId: grid[r][run[0][1]].pfpId });
        run = [[r, c]];
      }
    }
    if (run.length >= 3) matches.push({ cells: [...run], length: run.length, dir: "h", pfpId: grid[r][run[0][1]].pfpId });
  }

  // Vertical
  for (let c = 0; c < GRID_SIZE; c++) {
    let run = [[0, c]];
    for (let r = 1; r < GRID_SIZE; r++) {
      if (grid[r][c] && grid[r-1][c] && grid[r][c].pfpId === grid[r-1][c].pfpId && grid[r][c].type !== TILE_ICE && grid[r-1][c].type !== TILE_ICE) {
        run.push([r, c]);
      } else {
        if (run.length >= 3) matches.push({ cells: [...run], length: run.length, dir: "v", pfpId: grid[run[0][0]][c].pfpId });
        run = [[r, c]];
      }
    }
    if (run.length >= 3) matches.push({ cells: [...run], length: run.length, dir: "v", pfpId: grid[run[0][0]][c].pfpId });
  }

  return matches;
};

// Apply matches: clear cells, create special tiles, trigger mystery effects
const applyMatches = (grid, matches) => {
  const newGrid = grid.map(row => row.map(t => t ? { ...t } : null));
  const clearedCells = new Set();
  const specialsToCreate = []; // {r, c, type, pfpId}
  const mysteryEffects = []; // {r, c, type, label}
  const iceToAdd = []; // {r, c, pfpId}

  matches.forEach(m => {
    m.cells.forEach(([r, c]) => clearedCells.add(`${r},${c}`));
    // Create special at first cell if length >= 4
    if (m.length === 4) {
      const [r, c] = m.cells[Math.floor(m.length/2)];
      specialsToCreate.push({ r, c, type: m.dir === "h" ? TILE_ROCKET_V : TILE_ROCKET_H, pfpId: m.pfpId });
    } else if (m.length >= 5) {
      const [r, c] = m.cells[Math.floor(m.length/2)];
      specialsToCreate.push({ r, c, type: TILE_RAINBOW, pfpId: m.pfpId });
    }
  });

  // Check mystery tiles in or adjacent to matches — reveal effect
  const mysteryToReveal = new Set();
  clearedCells.forEach(key => {
    const [r, c] = key.split(",").map(Number);
    if (newGrid[r][c]?.type === TILE_MYSTERY) mysteryToReveal.add(key);
    [[r-1,c],[r+1,c],[r,c-1],[r,c+1]].forEach(([nr, nc]) => {
      if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE && newGrid[nr][nc]?.type === TILE_MYSTERY) {
        mysteryToReveal.add(`${nr},${nc}`);
      }
    });
  });

  mysteryToReveal.forEach(key => {
    const [r, c] = key.split(",").map(Number);
    const result = revealMystery(newGrid, r, c);
    mysteryEffects.push({ r, c, type: result.type, label: result.label });
    result.cells.forEach(cell => clearedCells.add(cell));
    if (result.freezeTarget) {
      // Pick a random neighbor to freeze
      const neighbors = [[r-1,c],[r+1,c],[r,c-1],[r,c+1]].filter(([nr,nc]) =>
        nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE && newGrid[nr][nc] && !clearedCells.has(`${nr},${nc}`)
      );
      if (neighbors.length > 0) {
        const [fr, fc] = neighbors[Math.floor(Math.random() * neighbors.length)];
        iceToAdd.push({ r: fr, c: fc, pfpId: newGrid[fr][fc].pfpId });
      }
    }
  });

  // Find ice tiles adjacent to cleared cells and crack them
  const iceToRemove = new Set();
  clearedCells.forEach(key => {
    const [r, c] = key.split(",").map(Number);
    [[r-1,c],[r+1,c],[r,c-1],[r,c+1]].forEach(([nr, nc]) => {
      if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE && newGrid[nr][nc]?.type === TILE_ICE) {
        iceToRemove.add(`${nr},${nc}`);
      }
    });
  });

  // Clear matched cells
  clearedCells.forEach(key => {
    const [r, c] = key.split(",").map(Number);
    newGrid[r][c] = null;
  });

  // Remove cracked ice
  iceToRemove.forEach(key => {
    const [r, c] = key.split(",").map(Number);
    newGrid[r][c] = null;
  });

  // Place specials
  specialsToCreate.forEach(({ r, c, type, pfpId }) => {
    newGrid[r][c] = { id: Math.random().toString(36).slice(2), pfpId, type };
  });

  // Place new ice from freeze effects
  iceToAdd.forEach(({ r, c, pfpId }) => {
    if (newGrid[r][c]) {
      newGrid[r][c] = { ...newGrid[r][c], type: TILE_ICE };
    }
  });

  return { grid: newGrid, clearedCount: clearedCells.size + iceToRemove.size, mysteryEffects };
};

// Activate special tile at (r,c), returns cells to clear
const activateSpecial = (grid, r, c) => {
  const tile = grid[r][c];
  if (!tile || tile.type === TILE_NORMAL || tile.type === TILE_ICE) return new Set();
  const cells = new Set();

  if (tile.type === TILE_ROCKET_H) {
    for (let j = 0; j < GRID_SIZE; j++) cells.add(`${r},${j}`);
  } else if (tile.type === TILE_ROCKET_V) {
    for (let i = 0; i < GRID_SIZE; i++) cells.add(`${i},${c}`);
  } else if (tile.type === TILE_BOMB) {
    for (let i = r - 1; i <= r + 1; i++) for (let j = c - 1; j <= c + 1; j++) {
      if (i >= 0 && i < GRID_SIZE && j >= 0 && j < GRID_SIZE) cells.add(`${i},${j}`);
    }
  } else if (tile.type === TILE_RAINBOW) {
    // Clear all tiles of the same pfpId
    const targetPfp = tile.pfpId;
    for (let i = 0; i < GRID_SIZE; i++) for (let j = 0; j < GRID_SIZE; j++) {
      if (grid[i][j]?.pfpId === targetPfp && grid[i][j]?.type !== TILE_ICE) cells.add(`${i},${j}`);
    }
    cells.add(`${r},${c}`);
  }

  return cells;
};

// Apply gravity: drop tiles down, fill empty from top
const applyGravity = (grid) => {
  const newGrid = grid.map(row => row.slice());
  for (let c = 0; c < GRID_SIZE; c++) {
    // Collect non-null from bottom up
    const col = [];
    for (let r = GRID_SIZE - 1; r >= 0; r--) {
      if (newGrid[r][c]) col.push(newGrid[r][c]);
    }
    // Fill from bottom
    for (let r = GRID_SIZE - 1; r >= 0; r--) {
      const idx = GRID_SIZE - 1 - r;
      newGrid[r][c] = col[idx] || makeTile(randPFPId());
    }
  }
  return newGrid;
};

// Check if there's any valid swap that creates a match
const checkPossibleMoves = (grid) => {
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const tile = grid[r][c];
      if (!tile || tile.type === TILE_ICE) continue;

      // Try right swap
      if (c + 1 < GRID_SIZE && grid[r][c+1] && grid[r][c+1].type !== TILE_ICE) {
        const test = grid.map(row => row.slice());
        [test[r][c], test[r][c+1]] = [test[r][c+1], test[r][c]];
        if (findMatches(test).length > 0) return true;
      }
      // Try down swap
      if (r + 1 < GRID_SIZE && grid[r+1][c] && grid[r+1][c].type !== TILE_ICE) {
        const test = grid.map(row => row.slice());
        [test[r][c], test[r+1][c]] = [test[r+1][c], test[r][c]];
        if (findMatches(test).length > 0) return true;
      }
    }
  }
  return false;
};

// Add random mystery tiles — match reveals random effect (bomb/rocket/freeze)
const addMystery = (grid, count = 2) => {
  const newGrid = grid.map(row => row.map(t => t ? { ...t } : null));
  const candidates = [];
  for (let r = 0; r < GRID_SIZE; r++) for (let c = 0; c < GRID_SIZE; c++) {
    if (newGrid[r][c]?.type === TILE_NORMAL) candidates.push([r, c]);
  }
  for (let i = 0; i < Math.min(count, candidates.length); i++) {
    const idx = Math.floor(Math.random() * candidates.length);
    const [r, c] = candidates.splice(idx, 1)[0];
    newGrid[r][c] = { ...newGrid[r][c], type: TILE_MYSTERY };
  }
  return newGrid;
};

// Add random ice tiles
const addIce = (grid, count = 1) => {
  const newGrid = grid.map(row => row.map(t => t ? { ...t } : null));
  const candidates = [];
  for (let r = 0; r < GRID_SIZE; r++) for (let c = 0; c < GRID_SIZE; c++) {
    if (newGrid[r][c]?.type === TILE_NORMAL) candidates.push([r, c]);
  }
  for (let i = 0; i < Math.min(count, candidates.length); i++) {
    const idx = Math.floor(Math.random() * candidates.length);
    const [r, c] = candidates.splice(idx, 1)[0];
    newGrid[r][c] = { ...newGrid[r][c], type: TILE_ICE };
  }
  return newGrid;
};

// Reveal mystery effect: returns {type, cells}
// type: "bomb" = adjacent 3x3 blast, "cross" = cross shape, "freeze" = freezes random tile (ice)
const revealMystery = (grid, r, c) => {
  const rand = Math.random();
  if (rand < 0.45) {
    // Bomb — 3x3 around
    const cells = new Set();
    for (let i = r - 1; i <= r + 1; i++) for (let j = c - 1; j <= c + 1; j++) {
      if (i >= 0 && i < GRID_SIZE && j >= 0 && j < GRID_SIZE) cells.add(`${i},${j}`);
    }
    return { type: "bomb", cells, label: "BOOM!" };
  } else if (rand < 0.8) {
    // Cross — full row and column
    const cells = new Set();
    for (let j = 0; j < GRID_SIZE; j++) cells.add(`${r},${j}`);
    for (let i = 0; i < GRID_SIZE; i++) cells.add(`${i},${c}`);
    return { type: "cross", cells, label: "CROSS!" };
  } else {
    // Freeze — creates ice on nearby random tile, clears original mystery
    const cells = new Set([`${r},${c}`]);
    return { type: "freeze", cells, label: "FROZEN!", freezeTarget: true };
  }
};

// ─── MAIN ───────────────────────────────────────────────────────
export default function Page() {
  const [screen, setScreen] = useState("menu");
  const [mode, setMode] = useState("timeattack");
  const [grid, setGrid] = useState([]);
  const [selected, setSelected] = useState(null); // [r, c]
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timer, setTimer] = useState(GAME_TIME);
  const [processing, setProcessing] = useState(false);
  const [floatingTexts, setFloatingTexts] = useState([]); // {id, r, c, text, color}
  const [iceAdded, setIceAdded] = useState(false);
  const [highestCombo, setHighestCombo] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);
  const [elapsed, setElapsed] = useState(0); // for chill mode
  const [chillStage, setChillStage] = useState(0); // difficulty stage in chill mode
  const sound = useSound();
  const processingRef = useRef(false);

  // Start game
  const startGame = (gameMode = "timeattack") => {
    PFP_COLORS = pickRandomPFPs();
    setMode(gameMode);
    setGrid(createGrid()); setScore(0); setCombo(0); setTimer(GAME_TIME);
    setProcessing(false); setFloatingTexts([]); setIceAdded(false);
    setHighestCombo(0); setTotalMatches(0);
    setElapsed(0); setChillStage(0);
    setScreen("game"); sound.start();
  };

  // Timer (only in time attack mode)
  useEffect(() => {
    if (screen !== "game" || mode !== "timeattack" || timer <= 0) return;
    const id = setInterval(() => {
      setTimer(t => {
        if (t <= 6) sound.tick();
        if (t <= 1) { sound.end(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [screen, mode, timer]);

  // End game when timer hits 0 (time attack only)
  useEffect(() => {
    if (screen === "game" && mode === "timeattack" && timer === 0) {
      setTimeout(() => setScreen("end"), 600);
    }
  }, [timer, screen, mode]);

  // Add ice at 30s mark (time attack only)
  useEffect(() => {
    if (screen === "game" && mode === "timeattack" && timer === 30 && !iceAdded && !processing) {
      setGrid(g => addMystery(g, 3));
      setIceAdded(true);
    }
  }, [timer, screen, mode, iceAdded, processing]);

  // Chill mode: elapsed timer (counts up)
  useEffect(() => {
    if (screen !== "game" || mode !== "chill") return;
    const id = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(id);
  }, [screen, mode]);

  // Chill mode: difficulty escalation (designed to end naturally within ~7 minutes)
  // Stage rises every 60s. Each stage adds more obstacles.
  // Stage 1 (1m): +1 mystery
  // Stage 2 (2m): +1 mystery, +1 ice
  // Stage 3 (3m): +2 mystery, +1 ice
  // Stage 4 (4m): +2 mystery, +2 ice
  // Stage 5 (5m): +3 mystery, +2 ice
  // Stage 6 (6m): +3 mystery, +3 ice
  // Stage 7 (7m): board floods — game forces end
  useEffect(() => {
    if (screen !== "game" || mode !== "chill" || processing) return;
    const targetStage = Math.floor(elapsed / 60);
    if (targetStage > chillStage && targetStage > 0) {
      setChillStage(targetStage);
      if (targetStage === 1) {
        setGrid(g => addMystery(g, 1));
        addFloat(0, 4, "?? appearing", "#9B68FF");
      } else if (targetStage === 2) {
        setGrid(g => addIce(addMystery(g, 1), 1));
        addFloat(0, 4, "ice locked", "#C8E0FF");
      } else if (targetStage === 3) {
        setGrid(g => addIce(addMystery(g, 2), 1));
        addFloat(0, 4, `stage 3`, "#FF89B5");
      } else if (targetStage === 4) {
        setGrid(g => addIce(addMystery(g, 2), 2));
        addFloat(0, 4, `stage 4`, "#FF89B5");
      } else if (targetStage === 5) {
        setGrid(g => addIce(addMystery(g, 3), 2));
        addFloat(0, 4, `stage 5 — heating up`, "#FFB86B");
      } else if (targetStage === 6) {
        setGrid(g => addIce(addMystery(g, 3), 3));
        addFloat(0, 4, `stage 6 — chaos`, "#FFB86B");
      } else if (targetStage >= 7) {
        // Final stage: flood the board, force game end
        addFloat(0, 4, "OVERLOAD", "#ff453a");
        sound.end();
        setTimeout(() => setScreen("end"), 1200);
      }
    }
  }, [elapsed, screen, mode, chillStage, processing]);

  // Detect dead board (no possible moves) — auto end
  useEffect(() => {
    if (screen !== "game" || processing || grid.length === 0) return;
    const hasMove = checkPossibleMoves(grid);
    if (!hasMove) {
      // Show notice and end
      const timeoutId = setTimeout(() => {
        addFloat(0, 4, "no moves left", "#ff453a");
        sound.end();
        setTimeout(() => setScreen("end"), 1200);
      }, 400);
      return () => clearTimeout(timeoutId);
    }
  }, [grid, screen, processing]);

  // Add floating text
  const addFloat = (r, c, text, color = "#5DCAA5") => {
    const id = Math.random().toString(36);
    setFloatingTexts(prev => [...prev, { id, r, c, text, color }]);
    setTimeout(() => setFloatingTexts(prev => prev.filter(f => f.id !== id)), 1000);
  };

  // Process matches cascade
  const processMatches = async (startGrid, comboLevel = 0) => {
    let currentGrid = startGrid;
    let totalScore = 0;
    let highestThisChain = comboLevel;

    while (true) {
      const matches = findMatches(currentGrid);
      if (matches.length === 0) break;

      highestThisChain++;
      const multiplier = highestThisChain === 1 ? 1 : highestThisChain === 2 ? 1.5 : highestThisChain === 3 ? 2 : 3;

      // Score
      let roundScore = 0;
      matches.forEach(m => {
        const base = m.length === 3 ? 30 : m.length === 4 ? 60 : 150;
        roundScore += base;
        // Floating text at center of match
        const midIdx = Math.floor(m.cells.length / 2);
        const [r, c] = m.cells[midIdx];
        if (m.length >= 4) {
          addFloat(r, c, m.length >= 5 ? "RAINBOW!" : "ROCKET!", m.length >= 5 ? "#FFD96A" : "#EF9F27");
          sound.special();
        }
      });
      const finalScore = Math.round(roundScore * multiplier);
      totalScore += finalScore;
      setTotalMatches(t => t + matches.length);

      if (highestThisChain >= 2) {
        const firstMatch = matches[0];
        const [r, c] = firstMatch.cells[0];
        addFloat(r, c, `COMBO x${highestThisChain}!`, "#FF89B5");
      }

      sound.match(highestThisChain);
      setCombo(highestThisChain);

      // Apply matches
      const { grid: afterMatch, mysteryEffects } = applyMatches(currentGrid, matches);

      // Show mystery effect floating texts
      if (mysteryEffects && mysteryEffects.length > 0) {
        mysteryEffects.forEach(fx => {
          const color = fx.type === "bomb" ? "#FFB86B" : fx.type === "cross" ? "#8DB7FF" : "#C8E0FF";
          addFloat(fx.r, fx.c, fx.label, color);
        });
        sound.bomb();
        totalScore += mysteryEffects.length * 40;
      }

      currentGrid = afterMatch;
      setGrid(currentGrid);

      await sleep(280);

      // Apply gravity
      currentGrid = applyGravity(currentGrid);
      setGrid(currentGrid);

      await sleep(280);
    }

    setHighestCombo(h => Math.max(h, highestThisChain));
    setScore(s => s + totalScore);
    setCombo(0);
    return currentGrid;
  };

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  // Handle cell click
  const handleClick = async (r, c) => {
    if (processing || timer === 0) return;
    const tile = grid[r][c];
    if (!tile) return;

    // If clicking a special tile directly, activate it
    if (tile.type !== TILE_NORMAL && tile.type !== TILE_ICE && !selected) {
      processingRef.current = true;
      setProcessing(true);
      const cellsToActivate = activateSpecial(grid, r, c);
      if (tile.type === TILE_BOMB || tile.type === TILE_ROCKET_H || tile.type === TILE_ROCKET_V || tile.type === TILE_RAINBOW) {
        sound.bomb();
      }
      let newGrid = grid.map(row => row.map(t => t ? { ...t } : null));
      cellsToActivate.forEach(key => {
        const [rr, cc] = key.split(",").map(Number);
        newGrid[rr][cc] = null;
      });
      setScore(s => s + cellsToActivate.size * 20);
      addFloat(r, c, `+${cellsToActivate.size * 20}`, "#FFD96A");
      setGrid(newGrid);
      await sleep(300);
      newGrid = applyGravity(newGrid);
      setGrid(newGrid);
      await sleep(280);
      await processMatches(newGrid);
      setProcessing(false);
      processingRef.current = false;
      return;
    }

    if (!selected) {
      setSelected([r, c]);
      sound.swap();
      return;
    }

    const [sr, sc] = selected;
    // Same cell - deselect
    if (sr === r && sc === c) {
      setSelected(null);
      return;
    }

    // Check adjacency
    const dist = Math.abs(sr - r) + Math.abs(sc - c);
    if (dist !== 1) {
      setSelected([r, c]);
      sound.swap();
      return;
    }

    // Can't swap ice
    if (tile.type === TILE_ICE || grid[sr][sc].type === TILE_ICE) {
      sound.invalid();
      setSelected(null);
      return;
    }

    // Try swap
    processingRef.current = true;
    setProcessing(true);
    setSelected(null);

    const newGrid = grid.map(row => row.map(t => t ? { ...t } : null));
    const temp = newGrid[sr][sc];
    newGrid[sr][sc] = newGrid[r][c];
    newGrid[r][c] = temp;

    sound.swap();
    setGrid(newGrid);
    await sleep(180);

    const matches = findMatches(newGrid);
    if (matches.length === 0) {
      // Swap back
      await sleep(120);
      sound.invalid();
      setGrid(grid);
      setProcessing(false);
      processingRef.current = false;
      return;
    }

    await processMatches(newGrid);
    setProcessing(false);
    processingRef.current = false;
  };

  // ─── MENU ─────────────────────────────────────────────────────
  if (screen === "menu") return (
    <div style={S.wrap}>
      <div style={S.gridBg} />
      <div style={S.glowOrb} />
      <div style={S.mc}>
        <div style={S.logoDiamond}>◆</div>
        <h1 style={S.title}>RITUAL</h1>
        <h2 style={S.sub}>MATCH</h2>
        <p style={S.tag}>3 in a row. Pop Ritual community faces.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 36 }}>
          <button onClick={() => startGame("timeattack")} style={{ ...S.pb, padding: "16px 28px", display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
            <span style={{ fontSize: 14, letterSpacing: 3 }}>TIME ATTACK</span>
            <span style={{ fontSize: 10, letterSpacing: 1, color: "rgba(94,228,188,0.6)", fontWeight: 400 }}>60s · mystery tiles at 30s</span>
          </button>
          <button onClick={() => startGame("chill")} style={{ ...S.pb, padding: "16px 28px", display: "flex", flexDirection: "column", gap: 4, alignItems: "center", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", boxShadow: "none" }}>
            <span style={{ fontSize: 14, letterSpacing: 3 }}>CHILL MODE</span>
            <span style={{ fontSize: 10, letterSpacing: 1, color: "rgba(255,255,255,0.35)", fontWeight: 400 }}>no timer · gets harder over time</span>
          </button>
        </div>

        <div style={S.rb}>
          <p style={S.rh}>HOW TO PLAY</p>
          <p style={S.rt}>
            Swap adjacent PFPs to match 3+ in a row. Match 4 for a rocket, 5 for a rainbow. Chain combos for bonus multipliers. In Time Attack, mystery ? tiles appear at 30s — match near them to trigger random effects (bomb, cross-blast, or freeze).
          </p>
        </div>

        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 28, letterSpacing: 1.5 }}>
          created by <a href="https://twitter.com/Livinginaprayer" target="_blank" rel="noopener noreferrer" style={{ color: "#5DCAA5", textDecoration: "none", fontWeight: 600 }}>@badang</a>
        </p>
      </div>
      <style>{animations}</style>
    </div>
  );

  // ─── END ──────────────────────────────────────────────────────
  if (screen === "end") {
    const grade = score >= 5000 ? "S" : score >= 3000 ? "A" : score >= 1500 ? "B" : "C";
    const label = score >= 5000 ? "Match King" : score >= 3000 ? "Combo Master" : score >= 1500 ? "PFP Popper" : "Warm-up";
    return (
      <div style={S.wrap}>
        <div style={S.gridBg} /><div style={S.glowOrb} />
        <div style={{ ...S.mc, maxWidth: 520 }}>
          <div style={{ fontSize: 56, marginBottom: 8 }}>🎉</div>
          <h1 style={{ ...S.title, fontSize: 36 }}>{mode === "timeattack" ? "TIME'S UP" : "NICE PLAY"}</h1>
          <div style={{ marginTop: 28 }}>
            <div style={{ fontSize: 72, fontWeight: 800, color: "#5ee4bc", fontVariantNumeric: "tabular-nums" }}>{score}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: 3, marginTop: 4 }}>TOTAL SCORE</div>
          </div>
          <div style={S.endGrid}>
            <div style={S.endCell}><span style={S.endLabel}>Best Combo</span><span style={S.endVal}>×{highestCombo || 1}</span></div>
            <div style={S.endCell}><span style={S.endLabel}>Matches</span><span style={S.endVal}>{totalMatches}</span></div>
            {mode === "timeattack" ? (
              <>
                <div style={S.endCell}><span style={S.endLabel}>Grade</span><span style={{ ...S.endVal, color: "#ffd60a" }}>{grade}</span></div>
                <div style={S.endCell}><span style={S.endLabel}>Rank</span><span style={{ ...S.endVal, fontSize: 16 }}>{label}</span></div>
              </>
            ) : (
              <>
                <div style={S.endCell}><span style={S.endLabel}>Survived</span><span style={{ ...S.endVal, fontSize: 18 }}>{Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, "0")}</span></div>
                <div style={S.endCell}><span style={S.endLabel}>Stage</span><span style={{ ...S.endVal, color: "#FF89B5" }}>{chillStage || 0}</span></div>
              </>
            )}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 20, flexDirection: "column" }}>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(mode === "timeattack" ? `I scored ${score} on Ritual Match (Time Attack) 🎨\n\nBest combo: ×${highestCombo || 1}\nGrade: ${grade} — ${label}\n\nCan you beat me?\n\n@ritualfnd @dunken9718 @joshsimenhoff @0xMadScientist @Jez_Cryptoz` : `I survived ${Math.floor(elapsed/60)}:${String(elapsed%60).padStart(2,"0")} on Ritual Match (Chill Mode) 🎨\n\nReached stage ${chillStage || 0}\nScore: ${score}\nBest combo: ×${highestCombo || 1}\n\n@ritualfnd @dunken9718 @joshsimenhoff @0xMadScientist @Jez_Cryptoz`)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={S.shareBtn}
            >
              Share on X →
            </a>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => startGame(mode)} style={{ ...S.pb, flex: 1 }}>PLAY AGAIN</button>
              <button onClick={() => setScreen("menu")} style={{ ...S.pb, flex: 1, background: "rgba(255,255,255,0.03)", boxShadow: "none", color: "rgba(255,255,255,0.35)" }}>MENU</button>
            </div>
          </div>
        </div>
        <style>{animations}</style>
      </div>
    );
  }

  // ─── GAME ─────────────────────────────────────────────────────
  const cellSize = 52;

  return (
    <div style={S.gw}>
      {/* HUD */}
      <div style={S.hud}>
        <div style={S.hl}>
          {mode === "timeattack" ? (
            <div style={{ ...S.hudTimer, color: timer <= 10 ? "#ff453a" : "#5DCAA5", animation: timer <= 5 ? "pulse 0.5s ease-in-out infinite" : "none" }}>
              {timer}s
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button onClick={() => setScreen("end")} style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer", letterSpacing: 1.5 }}>
                EXIT →
              </button>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <span style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", letterSpacing: 2 }}>ELAPSED</span>
                <span style={{ fontSize: 16, fontWeight: 800, color: "#5DCAA5", fontVariantNumeric: "tabular-nums" }}>
                  {Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, "0")}
                </span>
              </div>
              {chillStage > 0 && (
                <div style={{ fontSize: 10, fontWeight: 700, color: "#FF89B5", background: "rgba(255,137,181,0.08)", border: "1px solid rgba(255,137,181,0.2)", borderRadius: 6, padding: "4px 8px", letterSpacing: 1 }}>
                  STAGE {chillStage}
                </div>
              )}
            </div>
          )}
        </div>
        <div style={S.hr}>
          {combo >= 2 && <span style={{ ...S.comboBadge, animation: "pop 0.3s ease" }}>×{combo} COMBO</span>}
          <div style={S.scoreDisplay}>
            <span style={S.scoreLabel}>SCORE</span>
            <span style={S.scoreVal}>{score}</span>
          </div>
        </div>
      </div>

      <div style={S.boardWrap}>
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_SIZE}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, ${cellSize}px)`,
          gap: 4,
          padding: 12,
          background: "rgba(8,12,10,0.8)",
          borderRadius: 16,
          border: "1px solid rgba(94,228,188,0.1)",
          position: "relative",
        }}>
          {grid.map((row, r) => row.map((tile, c) => {
            if (!tile) return <div key={`${r}-${c}`} style={{ width: cellSize, height: cellSize }} />;
            const pfp = PFP_COLORS[tile.pfpId];
            const isSelected = selected && selected[0] === r && selected[1] === c;
            const isMystery = tile.type === TILE_MYSTERY;
            const isIce = tile.type === TILE_ICE;
            const isSpecial = !isMystery && !isIce && tile.type !== TILE_NORMAL;

            return (
              <div
                key={tile.id}
                onClick={() => handleClick(r, c)}
                style={{
                  width: cellSize,
                  height: cellSize,
                  borderRadius: 10,
                  background: isIce
                    ? "linear-gradient(135deg, rgba(200,220,240,0.9), rgba(150,180,210,0.7))"
                    : isMystery
                      ? "linear-gradient(135deg, #9B68FF, #5E3FBF)"
                      : pfp.imageUrl ? `${pfp.color} url(${pfp.imageUrl}) center/cover no-repeat` : pfp.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: processing ? "default" : "pointer",
                  transform: isSelected ? "scale(1.15)" : "scale(1)",
                  boxShadow: isSelected ? `0 0 0 3px #fff, 0 0 20px ${pfp.color}80` : isMystery ? "0 0 14px rgba(155,104,255,0.7)" : isSpecial ? `0 0 12px ${pfp.color}` : "none",
                  border: isSpecial || isMystery ? "2px solid #fff" : "none",
                  transition: "transform 0.18s, box-shadow 0.18s",
                  position: "relative",
                  fontWeight: 800,
                  fontSize: 10,
                  color: "rgba(0,0,0,0.6)",
                  animation: isMystery ? "mysteryPulse 1.5s ease-in-out infinite" : "none",
                }}
              >
                {isIce ? (
                  <span style={{ fontSize: 20 }}>❄</span>
                ) : isMystery ? (
                  <span style={{ fontSize: 22, color: "#fff", fontWeight: 800, textShadow: "0 0 6px rgba(0,0,0,0.6)" }}>?</span>
                ) : isSpecial ? (
                  <span style={{ fontSize: 18, color: "#fff", textShadow: "0 0 4px rgba(0,0,0,0.8)" }}>
                    {tile.type === TILE_BOMB ? "💣" : tile.type === TILE_RAINBOW ? "✨" : tile.type === TILE_ROCKET_H ? "↔" : "↕"}
                  </span>
                ) : pfp.imageUrl ? null : (
                  pfp.handle.slice(0, 2).toUpperCase()
                )}
              </div>
            );
          }))}

          {/* Floating texts */}
          {floatingTexts.map(f => (
            <div key={f.id} style={{
              position: "absolute",
              left: 12 + f.c * (cellSize + 4) + cellSize / 2,
              top: 12 + f.r * (cellSize + 4) + cellSize / 2,
              transform: "translate(-50%, -50%)",
              color: f.color,
              fontSize: 18,
              fontWeight: 800,
              textShadow: "0 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.6)",
              pointerEvents: "none",
              animation: "floatUp 1s ease-out forwards",
              zIndex: 10,
              letterSpacing: 0.5,
            }}>
              {f.text}
            </div>
          ))}
        </div>
      </div>

      <style>{animations}</style>
    </div>
  );
}

// ─── STYLES ─────────────────────────────────────────────────────
const animations = `
@keyframes pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.1);opacity:0.7}}
@keyframes pop{0%{transform:scale(0.5)}50%{transform:scale(1.3)}100%{transform:scale(1)}}
@keyframes floatUp{0%{transform:translate(-50%,-50%) scale(0.8);opacity:0}20%{transform:translate(-50%,-80%) scale(1.2);opacity:1}100%{transform:translate(-50%,-180%) scale(1);opacity:0}}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes mysteryPulse{0%,100%{box-shadow:0 0 10px rgba(155,104,255,0.5);transform:scale(1)}50%{box-shadow:0 0 18px rgba(155,104,255,0.9);transform:scale(1.05)}}
`;

const S = {
  wrap: { minHeight: "100vh", background: "#050505", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'SF Pro Display','Helvetica Neue',-apple-system,sans-serif", color: "#fff", padding: 24, position: "relative", overflow: "hidden" },
  gridBg: { position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(94,228,188,0.02) 1px, transparent 1px)", backgroundSize: "24px 24px", pointerEvents: "none" },
  glowOrb: { position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(94,228,188,.06) 0%,transparent 60%)", top: "15%", left: "55%", transform: "translate(-50%,-50%)", pointerEvents: "none" },
  mc: { maxWidth: 460, width: "100%", textAlign: "center", position: "relative", zIndex: 1 },
  logoDiamond: { fontSize: 28, color: "#5ee4bc", marginBottom: 16, animation: "bob 3s ease-in-out infinite" },
  title: { fontSize: 48, fontWeight: 800, letterSpacing: 16, margin: 0, color: "#5ee4bc" },
  sub: { fontSize: 13, fontWeight: 300, letterSpacing: 12, color: "rgba(255,255,255,.2)", margin: "4px 0 0" },
  tag: { fontSize: 12, color: "rgba(255,255,255,.15)", marginTop: 20, letterSpacing: 1 },
  pb: { background: "rgba(94,228,188,.08)", color: "#5ee4bc", border: "1px solid rgba(94,228,188,.18)", borderRadius: 10, padding: "13px 36px", fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: 3, display: "inline-flex", alignItems: "center", justifyContent: "center", transition: "all .2s" },
  rb: { marginTop: 36, padding: "16px 20px", background: "rgba(255,255,255,.01)", borderRadius: 14, border: "1px solid rgba(255,255,255,.03)", textAlign: "left" },
  rh: { fontSize: 8, letterSpacing: 3, color: "rgba(255,255,255,.15)", marginBottom: 8, marginTop: 0, textTransform: "uppercase" },
  rt: { fontSize: 12, color: "rgba(255,255,255,.25)", lineHeight: 1.9, margin: 0 },
  shareBtn: { display: "block", textAlign: "center", padding: "12px 20px", borderRadius: 10, background: "rgba(29,155,240,0.1)", border: "1px solid rgba(29,155,240,0.2)", color: "#1d9bf0", fontSize: 12, fontWeight: 700, letterSpacing: 1, textDecoration: "none" },
  endGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 20, textAlign: "left" },
  endCell: { background: "rgba(255,255,255,.02)", borderRadius: 12, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 2, border: "1px solid rgba(255,255,255,.04)" },
  endLabel: { fontSize: 8, color: "rgba(255,255,255,.3)", letterSpacing: 2, textTransform: "uppercase" },
  endVal: { fontSize: 22, fontWeight: 800, color: "#fff" },

  gw: { minHeight: "100vh", background: "#050505", fontFamily: "'SF Pro Display','Helvetica Neue',-apple-system,sans-serif", color: "#fff", display: "flex", flexDirection: "column", overflow: "hidden" },
  hud: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,.03)", background: "rgba(5,5,5,.8)", backdropFilter: "blur(16px)", flexShrink: 0, zIndex: 5 },
  hl: { display: "flex", alignItems: "center", gap: 12 },
  hr: { display: "flex", alignItems: "center", gap: 12 },
  hudTimer: { fontSize: 24, fontWeight: 800, letterSpacing: 1, fontVariantNumeric: "tabular-nums" },
  comboBadge: { fontSize: 12, fontWeight: 800, color: "#FF89B5", background: "rgba(255,137,181,0.1)", border: "1px solid rgba(255,137,181,0.3)", borderRadius: 10, padding: "6px 14px", letterSpacing: 1.5 },
  scoreDisplay: { display: "flex", flexDirection: "column", alignItems: "flex-end" },
  scoreLabel: { fontSize: 8, color: "rgba(255,255,255,0.3)", letterSpacing: 3 },
  scoreVal: { fontSize: 22, fontWeight: 800, color: "#fff", fontVariantNumeric: "tabular-nums" },
  boardWrap: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
};
