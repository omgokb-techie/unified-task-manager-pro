import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { io } from "socket.io-client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const socket = io("http://localhost:5000", {
  autoConnect: false, // You will connect manually
});