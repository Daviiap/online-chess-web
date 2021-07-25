interface Fruit {
  X: number;
  Y: number;
  id: string;
}

interface Player {
  id: string;
  name: string;
  X: number;
  Y: number;
  score: number;
}

export interface gameState {
  width: number;
  height: number;
  players: Record<string, Player>;
  fruits: Record<string, Fruit>;
}
