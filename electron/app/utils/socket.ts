import io from "socket.io-client";
import { useEffect } from "react";

const sockets = {};

export function getSocket(name) {
  if (!sockets[name]) {
    sockets[name] = io.connect("http://127.0.0.1:5151/" + name);
  }
  return sockets[name];
}

export function useSubscribe(socket, event, callback) {
  useEffect(() => {
    socket.on(event, callback);
    return () => {
      socket.off(event, callback);
    };
  }, []);
}