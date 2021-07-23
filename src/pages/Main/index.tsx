import React, { useEffect } from "react";

import { Map } from "../../classes/Map";
import { Player } from "../../classes/Player";
import { Fruit } from "../../classes/Fruit";

import { Container, Map as MapElement } from "./styles";
import { Socket } from "../../classes/Socket";

const Main: React.FC = () => {
  useEffect(() => {
    const canvas = document.getElementById("map") as HTMLCanvasElement;

    const socket = new Socket();

    const fruits = {
      fruit1: new Fruit(5, 5, "fruit1"),
    } as Record<string, Fruit>;
    const players = {
      player1: new Player(0, 0, "Davi", "player1"),
      player2: new Player(4, 7, "Thiago", "player2"),
      player3: new Player(3, 9, "Pedro", "player3"),
    } as Record<string, Player>;

    const map = new Map(10, 10, canvas, fruits, players, "player1");

    const renderMap = () => {
      map.render();
      requestAnimationFrame(renderMap);
    };
    renderMap();

    document.addEventListener("keydown", (event) => {
      const actions = {
        ArrowUp: () => {
          map.movePlayer("player1", "up");
        },
        ArrowDown: () => {
          map.movePlayer("player1", "down");
        },
        ArrowLeft: () => {
          map.movePlayer("player1", "left");
        },
        ArrowRight: () => {
          map.movePlayer("player1", "right");
        },
      } as Record<string, Function>;

      actions[event.key] && actions[event.key]();
    });
  }, []);

  return (
    <Container>
      <MapElement width="10" height="10" id="map" />
    </Container>
  );
};

export default Main;
