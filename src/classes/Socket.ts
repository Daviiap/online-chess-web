import io, { Socket as IoSocket } from "socket.io-client";
import { Fruit } from "./Fruit";
import { Player } from "./Player";

interface MapInterface {
  width: number;
  height: number;
  players: Record<string, Player>;
  fruits: Record<string, Fruit>;
}

export class Socket {
  private socket: IoSocket;

  public constructor() {
    this.socket = io("http://localhost:3000");
    this.socket.on("bootstrap", (event) => {});
  }

  public getId() {
    return this.socket.id;
  }

  public movePlayer(
    playerId: string,
    direction: "up" | "down" | "left" | "right"
  ) {
    this.socket.emit("move-player", { playerId, direction });
  }
}
