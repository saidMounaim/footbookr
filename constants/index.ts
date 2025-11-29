import { Wifi, Car, ShowerHead, ShieldCheck, Zap } from "lucide-react";

export const VENUE_AMENITIES = [
  { icon: Wifi, label: "Free WiFi" },
  { icon: Car, label: "Free Parking" },
  { icon: ShowerHead, label: "Hot Showers" },
  { icon: ShieldCheck, label: "Locker Rooms" },
  { icon: Zap, label: "Floodlights" },
];

export type ActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};
