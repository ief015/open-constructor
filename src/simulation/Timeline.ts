import Network from "@/simulation/Network";
import PinNode from "@/simulation/PinNode";

export type PinState = {
  pin: PinNode;
  state: boolean;
};

export type KeyFrame = PinState[];

export type HistoryFrame = {
  frame: number;
  states: readonly PinState[];
};

export default class Timeline {

  private network: Network;
  private keyframes: KeyFrame[] = [];

  private history: HistoryFrame[] = [];

  constructor(network: Network) {
    this.network = network;
  }

  public addKeyFrame(frame: number, pin: PinNode, state: boolean) {
    const keyframe = this.keyframes[frame] = this.keyframes[frame] ?? [];
    keyframe.push({ pin, state });
  }

  public run(length?: number, onPostStep?: (frame: number) => void) {
    this.network.reset();
    this.history.splice(0, this.history.length);
    const pins = this.network.getPins();
    for (let frame = 0; frame < (length ?? this.keyframes.length); frame++) {
      const keyframe = this.keyframes[frame];
      if (keyframe) {
        for (const action of keyframe) {
          action.pin.active = action.state;
        }
      }
      this.network.step();
      this.history.push({
        frame,
        states: pins.map<PinState>(p => ({ pin: p, state: p.state })),
      });
      onPostStep?.(frame);
    }
  }

  public getHistory(): readonly HistoryFrame[] {
    return this.history;
  }

  public printHistory(highSymbol: string = '1', lowSymbol: string = '-', showLabels: boolean = true) {
    const pins = this.network.getPins();
    const maxLengthName = Math.max(...pins.map(p => p.label.length), String(this.history.length).length);
    if (showLabels) {
      const pinNames = pins.map(p => p.label.padStart(maxLengthName));
      console.log([' '.repeat(maxLengthName), ...pinNames].join(' '));
    }
    for (const { frame, states } of this.history) {
      const pinStates = states.map(s => s.state);
      const sFrame = `${frame}`.padStart(maxLengthName);
      const sLine = pinStates.map(s => (s ? highSymbol : lowSymbol).padStart(maxLengthName)).join(' ');
      console.log(`${sFrame} ${sLine}`);
    }
  }

  public printHistoryHorizontal(highSymbol: string = '1', lowSymbol: string = '-', showLabels: boolean = true) {
    const pins = this.network.getPins();
    const maxLengthName = Math.max(...pins.map(p => p.label.length));
    for (const pin of pins) {
      const pinId = pins.indexOf(pin);
      let line = '';
      if (showLabels) {
        line += pin.label.padStart(maxLengthName) + ' ';
      }
      for (const { frame, states } of this.history) {
        const state = states[pinId].state;
        line += state ? highSymbol : lowSymbol;
      }
      console.log(line);
    }
  }

  public printHistoryScope(showLabels: boolean = true) {
    const pins = this.network.getPins();
    const maxLengthName = Math.max(...pins.map(p => p.label.length));
    for (const pin of pins) {
      const pinId = pins.indexOf(pin);
      for (const isTop of [ true, false ]) {
        let line = '';
        if (showLabels) {
          if (!isTop) {
            line += pin.label.padStart(maxLengthName) + ' ';
          } else {
            line += ' '.repeat(maxLengthName) + ' ';
          }
        }
        let lastState = false;
        for (const { frame, states } of this.history) {
          const state = states[pinId].state;
          if (state !== lastState) {
            line += isTop ? (state ? '┌' : '┐') : (state ? '┘' : '└');
            lastState = state;
          } else {
            if ((state && isTop) || (!state && !isTop)) {
              line += '─';
            } else {
              line += ' ';
            }
          }
        }
        console.log(line);
      }
    }
  }

}
