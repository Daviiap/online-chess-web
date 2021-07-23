import { Fruit } from "./Fruit";
import { Player } from "./Player";

export class Map {
  private width: number;
  private height: number;
  private mainPlayerId: string;
  private players: Record<string, Player>;
  private fruits: Record<string, Fruit>;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  public constructor(
    width: number,
    height: number,
    canvas: HTMLCanvasElement,
    fruits: Record<string, Fruit>,
    players: Record<string, Player>,
    mainPlayerId: string
  ) {
    this.mainPlayerId = mainPlayerId;
    this.width = width;
    this.height = height;
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.fruits = fruits;
    this.players = players;
  }

  public render() {
    this.context.fillStyle = "#ffffee";
    this.context.clearRect(0, 0, 10, 10);

    Object.values(this.fruits).forEach((fruit) => {
      this.context.fillStyle = "#f4e333";
      this.context.fillRect(fruit.getX(), fruit.getY(), 1, 1);
    });

    Object.entries(this.players).forEach(([playerId, player]) => {
      if (playerId !== this.mainPlayerId) {
        this.context.fillStyle = "#cccccc";
        this.context.fillRect(player.getX(), player.getY(), 1, 1);
      }
    });

    const mainPlayer = this.players[this.mainPlayerId];
    this.context.fillStyle = "#000000";
    this.context.fillRect(mainPlayer.getX(), mainPlayer.getY(), 1, 1);
  }

  public removeFruit(fruitId: string): void {
    this.fruits[fruitId] && delete this.fruits[fruitId];
  }

  public removePlayer(playerId: string): void {
    this.players[playerId] && delete this.players[playerId];
  }

  public addFruit(fruit: Fruit) {
    const fruitId = fruit.getId();
    if (!this.fruits[fruitId]) {
      this.fruits[fruitId] = fruit;
    }
  }

  public addPlayer(player: Player) {
    const playerId = player.getId();
    if (!this.players[playerId]) {
      this.players[playerId] = player;
    }
  }

  public movePlayer(
    playerId: string,
    direction: "left" | "right" | "up" | "down"
  ) {
    const player = this.players[playerId];
    if (player) {
      if (direction === "up" && player.getY() > 0) {
        player.move(direction);
      } else if (direction === "down" && player.getY() < this.height - 1) {
        player.move(direction);
      } else if (direction === "left" && player.getX() > 0) {
        player.move(direction);
      } else if (direction === "right" && player.getX() < this.width - 1) {
        player.move(direction);
      }
    }
  }
}
