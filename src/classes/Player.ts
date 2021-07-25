export class Player {
  private id: string;
  private name: string;
  private X: number;
  private Y: number;
  private score: number;
  private isPrincipal: boolean;

  public constructor(
    x: number,
    y: number,
    name: string,
    id: string,
    isPrincipal: boolean = false
  ) {
    this.X = x;
    this.Y = y;
    this.name = name;
    this.id = id;
    this.score = 0;
    this.isPrincipal = isPrincipal;
  }

  public getX(): number {
    return this.X;
  }

  public getY(): number {
    return this.Y;
  }

  public getIsPrincipal() {
    return this.isPrincipal;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getScore(): number {
    return this.score;
  }

  public incrementScore(): void {
    this.score += 1;
  }

  public move(direction: "left" | "right" | "up" | "down"): void {
    if (direction === "left") {
      this.X--;
    } else if (direction === "right") {
      this.X++;
    } else if (direction === "up") {
      this.Y--;
    } else if (direction === "down") {
      this.Y++;
    }
  }
}
