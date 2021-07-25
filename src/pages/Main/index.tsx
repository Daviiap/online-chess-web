import React, { useEffect } from "react";

import { Container, Map as MapElement } from "./styles";
import io from "socket.io-client";

const Main: React.FC = () => {
  useEffect(() => {
    const socket = io("http://localhost:3000").on("connect", () => {
      const createNewRoom =
        prompt("Deseja criar uma nova sala? ( y / n )") === "y";

      if (createNewRoom) {
        socket.emit("create-room");
        socket.on("created-room", (roomId) => {
          alert(`Sala ${roomId} criada.`);
        });
      } else {
        const roomId = prompt("Digite o id da sala");
        socket.emit("connect-to-room", roomId);
        socket.on("connected-to-room", () => {
          alert(`Conectado à sala ${roomId}.`);
        });
        socket.on("connect-to-room-failed", ({ error }) => {
          alert(error);
        });
      }

      socket.on("player-disconnected", () => {
        alert("PLAYER DISCONNECTED");
      });
    });
  }, []);

  return (
    <Container>
      <MapElement id="map" />
    </Container>
  );
};

export default Main;
