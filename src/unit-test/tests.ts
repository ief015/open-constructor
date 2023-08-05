import { UnitTest } from ".";

import npn from "./tests/npn";
import pnp from "./tests/pnp";
import srLatch from "./tests/sr-latch";
import lineDecoder from "./tests/2to4-line-decoder";
import andOrGate from "./tests/4-input-and-or-gate";

const tests: Record<string, UnitTest> = {
  npn,
  pnp,
  srLatch,
  lineDecoder,
  andOrGate,
};

export default tests;
