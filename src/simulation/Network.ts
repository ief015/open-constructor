import { GateNode, PathNode, PinNode } from ".";

export function networkFromGraph(graph: any) {
  const paths: PathNode[] = [];
  const gates: GateNode[] = [];
  // TODO: Build the network from the graph
  return new Network([ ...paths, ...gates ]);
}

export default class Network {
  private paths: PathNode[] = [];
  private gates: GateNode[] = [];
  private pins: PinNode[] = [];

  constructor(nodes: (PathNode|PinNode|GateNode)[]) {
    this.paths = nodes.filter(n => n instanceof PathNode) as PathNode[];
    this.gates = nodes.filter(n => n instanceof GateNode) as GateNode[];
    this.pins = nodes.filter(n => n instanceof PinNode) as PinNode[];
  }

  public getPins(): readonly PinNode[] {
    return this.pins;
  }

  public getPaths(): readonly PathNode[] {
    return this.paths;
  }

  public getGates(): readonly GateNode[] {
    return this.gates;
  }

  public reset() {
    for (const path of this.paths) {
      path.state = false;
    }
    for (const gate of this.gates) {
      gate.active = false;
    }
    for (const pin of this.pins) {
      pin.state = false;
    }
  }

  public step() {
    // Reset state of all paths and pins
    for (const path of this.paths) {
      path.state = false;
    }
    for (const pin of this.pins) {
      pin.state = pin.active;
    }

    while (true) {
      let anyChange = false;
      // Propagate path states from gates
      for (const gate of this.gates) {
        // TODO: Gates that have already passed current could be skipped for performance?
        // Needs investigation after more unit tests are written.
        const open = gate.isNPN ? gate.active : !gate.active;
        if (open && gate.gatedPaths.some(p => p.state)) {
          for (const path of gate.gatedPaths) {
            if (!path.state) {
              path.state = true;
              anyChange = true;
            }
          }
        }
      }
      if (!anyChange) {
        break;
      }
    }
    // Check for gates that should be toggled.
    // This is done after gated path propagation to introduce propagation delay.
    for (const gate of this.gates) {
      gate.active = gate.switchingPaths.some(p => p.state);
    }
  }

}
