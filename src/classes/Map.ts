import { Fruit } from "./Fruit";
import { Player } from "./Player";

export class Map {
  private width: number;
  private height: number;
  private players: Record<string, Player>;
  private fruits: Record<string, Fruit>;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  public constructor(
    width: number,
    height: number,
    canvas: HTMLCanvasElement,
    fruits: Record<string, Fruit>,
    players: Record<string, Player>
  ) {
    this.width = width;
    this.height = height;

    this.canvas = canvas;
    canvas.height = height;
    canvas.width = width;

    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    this.fruits = fruits;
    this.players = players;

    this.render();
  }

  public updateState(
    fruits: Record<string, Fruit>,
    players: Record<string, Player>
  ) {
    this.fruits = fruits;
    this.players = players;

    this.render();
  }

  public render() {
    this.context.fillStyle = "#ffffee";
    this.context.clearRect(0, 0, this.width, this.height);

    const fruits = Object.values(this.fruits);
    const players = Object.values(this.players);
    if (fruits.length) {
      Object.values(this.fruits).forEach((fruit) => {
        this.context.fillStyle = "#f4e333";
        this.context.fillRect(fruit.getX(), fruit.getY(), 1, 1);
      });
    }

    if (players.length) {
      let principalPlayer = {} as Player;
      Object.values(this.players).forEach((player) => {
        if (!player.getIsPrincipal()) {
          this.context.fillStyle = "#cccccc";
          this.context.fillRect(player.getX(), player.getY(), 1, 1);
        } else {
          principalPlayer = player;
        }
      });
      this.context.fillStyle = "#000000";
      this.context.fillRect(
        principalPlayer.getX(),
        principalPlayer.getY(),
        1,
        1
      );
    }
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

  public getPlayers(): Record<string, Player> {
    return this.players;
  }

  public getFruits(): Record<string, Fruit> {
    return this.fruits;
  }

  public getPlayer(playerId: string) {
    return this.players[playerId];
  }

  public getFruit(fruitId: string) {
    return this.fruits[fruitId];
  }

  public removeFruit(fruitId: string): void {
    this.fruits[fruitId] && delete this.fruits[fruitId];
  }

  public removePlayer(playerId: string): void {
    this.players[playerId] && delete this.players[playerId];
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

      Object.values(this.fruits).forEach((fruit) => {
        if (fruit.getX() === player.getX() && fruit.getY() === player.getY()) {
          this.removeFruit(fruit.getId());
          player.incrementScore();
        }
      });
    }
  }
}
