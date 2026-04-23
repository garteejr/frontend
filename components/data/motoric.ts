export type Position = { x: number; y: number };

/** Position sets per round for L1 (4 targets) and L2 (6 targets) */
export const MOTOR_POSITIONS: Position[][] = [
  // L1 rounds (4 targets each)
  [{ x: 40, y: 50 }, { x: 200, y: 30 }, { x: 130, y: 140 }, { x: 250, y: 120 }],
  [{ x: 60, y: 30 }, { x: 210, y: 80 }, { x: 80,  y: 160 }, { x: 240, y: 170 }],
  [{ x: 30, y: 100}, { x: 180, y: 40 }, { x: 240, y: 150 }, { x: 100, y: 190 }],
  // L2 rounds (6 targets each)
  [{ x: 50, y: 50 }, { x: 200, y: 120}, { x: 120, y: 30  }, { x: 250, y: 60 }, { x: 80, y: 180 }, { x: 220, y: 190 }],
  [{ x: 40, y: 80 }, { x: 190, y: 30 }, { x: 130, y: 160 }, { x: 250, y: 100}, { x: 70, y: 190 }, { x: 210, y: 180 }],
  [{ x: 60, y: 40 }, { x: 220, y: 60 }, { x: 100, y: 120 }, { x: 250, y: 150}, { x: 50, y: 170 }, { x: 170, y: 200 }],
];

/** All possible flash positions for L3 */
export const FLASH_POSITIONS: Position[] = [
  { x: 40,  y: 60  },
  { x: 200, y: 40  },
  { x: 130, y: 150 },
  { x: 260, y: 120 },
  { x: 60,  y: 180 },
  { x: 220, y: 170 },
  { x: 110, y: 80  },
  { x: 250, y: 60  },
];

export const MOTOR_CONFIG = {
  L1: { rounds: 3, targets: 4 },
  L2: { rounds: 3, targets: 6 },
  L3: { totalFlashes: 8, flashDuration: 1800, gapDuration: 600 },
};
