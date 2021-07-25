import React, { useEffect } from "react";

import { Map } from "../../classes/Map";
import { Player } from "../../classes/Player";
import { Fruit } from "../../classes/Fruit";

import { Container, Map as MapElement } from "./styles";
import io from "socket.io-client";
import { gameState } from "../../interfaces/gameState";

const Main: React.FC = () => {
  useEffect(() => {
    const socket = io("http://localhost:3000").on("connect", () => {
      socket.on("load", (state: gameState) => {
        const players = Object.entries(state.players).reduce(
          (payload, [key, value]) => {
            return {
              ...payload,
              [key]: new Player(
                value.X,
                value.Y,
                value.name,
                value.id,
                value.id === socket.id
              ),
            };
          },
          {} as Record<string, Player>
        );
        const fruits = Object.entries(state.fruits).reduce(
          (payload, [key, value]) => {
            return {
              ...payload,
              [key]: new Fruit(value.X, value.Y, value.id),
            };
          },
          {} as Record<string, Fruit>
        );

        startGame(state, players, fruits);
      });
    });

    const startGame = (
      state: gameState,
      players: Record<string, Player>,
      fruits: Record<string, Fruit>
    ) => {
      const canvas = document.getElementById("map") as HTMLCanvasElement;
      const map = new Map(state.width, state.height, canvas, fruits, players);

      socket.on("update", (state: gameState) => {
        const players = Object.entries(state.players).reduce(
          (payload, [key, value]) => {
            return {
              ...payload,
              [key]: new Player(
                value.X,
                value.Y,
                value.name,
                value.id,
                value.id === socket.id
              ),
            };
          },
          {} as Record<string, Player>
        );
        const fruits = Object.entries(state.fruits).reduce(
          (payload, [key, value]) => {
            return {
              ...payload,
              [key]: new Fruit(value.X, value.Y, value.id),
            };
          },
          {} as Record<string, Fruit>
        );

        map.updateState(fruits, players);
      });

      socket.on("move-player", (event) => {
        const { playerId, direction } = event;
        map.movePlayer(playerId, direction);
      });

      document.addEventListener("keydown", (event) => {
        const actions = {
          ArrowUp: () => {
            map.movePlayer(socket.id, "up");
            socket.emit("move", { playerId: socket.id, direction: "up" });
          },
          ArrowDown: () => {
            map.movePlayer(socket.id, "down");
            socket.emit("move", { playerId: socket.id, direction: "down" });
          },
          ArrowLeft: () => {
            map.movePlayer(socket.id, "left");
            socket.emit("move", { playerId: socket.id, direction: "left" });
          },
          ArrowRight: () => {
            map.movePlayer(socket.id, "right");
            socket.emit("move", { playerId: socket.id, direction: "right" });
          },
        } as Record<string, Function>;

        actions[event.key] && actions[event.key]();
      });

      const renderMap = () => {
        map.render();
        requestAnimationFrame(renderMap);
      };
      renderMap();
    };
  });

  return (
    <Container>
      <MapElement id="map" />
    </Container>
  );
};

export default Main;
