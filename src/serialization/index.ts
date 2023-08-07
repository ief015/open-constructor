import { decode } from "@/serialization/decode";
import { encode, encodeFromFile } from "@/serialization/encode";
import DesignData, {
  DesignDataLayer,
  Layer,
  LayerColumn,
  LayerDimensions,
  SiliconValue,
  MetalValue,
  GateValue,
  ViaValue,
  ConnectionValue
} from "./DesignData";

export type Base64String = string;
export {
  encode,
  encodeFromFile,
  decode,
  DesignData,
  DesignDataLayer,
  Layer,
  LayerColumn,
  LayerDimensions,
  SiliconValue,
  MetalValue,
  GateValue,
  ViaValue,
  ConnectionValue,
};
