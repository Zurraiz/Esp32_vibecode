// Defines one configurable input for a visual programming block.
export type BlockParam = {
  name: string;
  type: "number" | "text" | "select";
  default: string | number;
  options?: string[]; // Used when type is "select".
};

// Represents a block instance placed on the editor canvas.
export type Block = {
  id: number;
  type: string;
  icon: string;
  label: string;
  params: BlockParam[];
  values: Record<string, string | number>;
};

// Represents a command payload sent to the ESP32 device.
export type Command = {
  action: string;
  [key: string]: unknown;
};

// Represents the current connection/runtime state of the ESP32 device.
export type DeviceStatus = "idle" | "connecting" | "online" | "offline";

// Represents one line in the live output/log panel from the device.
export type LiveLogEntry = {
  id: number;
  timestamp: string;
  message: string;
  type: "ok" | "err" | "warn" | "data" | "";
};