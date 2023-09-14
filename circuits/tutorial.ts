import { CircuitSimulationFactory } from "@/circuits";
import { PinNode, CircuitSimulation, Sequence } from "@/simulation";
import createSequencesFromInputs from "@/utils/createSequencesFromInputs";

const assignVCC = (...pins: PinNode[]) => {
  pins.forEach((pin) => {
    pin.label = 'VCC';
    pin.active = true;
  });
}

type LevelNames =
    '01 Introduction'
  | '02 Metal, Silicon and Vias'
  | '03 PNP Gates'
  | '04 NPN Gates'
  | '05 Propagation Delay';

const tutorial: Record<LevelNames, CircuitSimulationFactory> = {


  '01 Introduction': {
    pinRows: 1,
    width: 14,
    height: 7,
    setup: (network) => {
      const [
        pinIn, pinOut,
      ] = network.getPinNodes();
      pinIn.label = 'In';
      pinOut.label = 'Out';
      const sim = new CircuitSimulation(network, 280);
       const seq = new Sequence()
         .addOscillation(10, 3, 50, 50);
      sim.setInputSequence(pinIn, seq);
      sim.setOutputSequence(pinOut, seq.slice(0));
      return sim;
    },
    info: {
      title: 'Tutorial - Introduction',
      pages: [
        {
          contentHtml: `
<b>Welcome to Open-Konstruktor!</b><br/>
</br>
Your primary objective is to build integrated circuits based on provided specifications.<br/>
<br/>
Your circuits will be verified and graded based on how well they can produce the expected outputs
from a set of input signals.<br/>
          `,
        },
        {
          contentHtml: `
On the bottom of the screen is the verification graph, which shows the input and output signals
of your circuit.<br/>
<br/>
<img src="/tutorial/01/in_out.png" /><br/>
<br/>
Here, "In" represents a signal from an input, and "Out" represents an output signal your circuit is
expected to produce. Signals can be one of two states: <u><b>high</b></u> or <u><b>low</b></u>.
          `,
        },
        {
          contentHtml: `
On the right of the screen is the <u><b>toolbox</b></u>, which contains all the materials you can
draw on the board to build your circuit.<br/>
<br/>
The first one we'll look at is the <u><b>metal</b></u> tool. Metal is a basic conductor, and is the
only material that can connect to the pins of the circuit.
          `,
        },
        {
          contentHtml: `
<b>GOAL:</b><br/>
<br/>
Connect the input pin to the output pin by drawing metal, and click Start to run the
verification test.<br/>
[IMG: Show Start button]
          `,
        },
      ],
    },
    infoCompleted: {
      title: 'Tutorial - Introduction',
      pages: [
        {
          contentHtml: `
After passing the verification test, the level will be marked as complete. In order to pass
the verification test, your circuit must reach a grade of at least <u><b>97%</b></u>.<br/>
<br/>
Completing levels will unlock more levels, and you can always go back and replay previous
levels.<br/>
          `,
        },
        {
          contentHtml: `
The <u><b>design score</b></u> represents the amount of material you used to build your circuit.
There is no limit to the amount of material you can use. The only limit is determined by the size of
the board.<br/>
<br/>
The design score is not related to the verification test, and is only used to compare your design to
others.
          `,
        },
      ],
    },
    nextLevelID: '02 Metal, Silicon and Vias',
  },


  '02 Metal, Silicon and Vias': {
    pinRows: 2,
    width: 22,
    height: 11,
    setup: (network) => {
      const [
        pinInA, pinOutB,
        pinInB, pinOutA,
      ] = network.getPinNodes();
      pinInA.label = 'In A';
      pinOutB.label = 'Out B';
      pinInB.label = 'In B';
      pinOutA.label = 'Out A';
      const sim = new CircuitSimulation(network, 280);
      const seqA = new Sequence()
        .addOscillation(10, 7, 20, 20);
      const seqB = new Sequence()
        .addOscillation(20, 5, 30, 20);
      sim.setInputSequence(pinInA, seqA);
      sim.setInputSequence(pinInB, seqB);
      sim.setOutputSequence(pinOutB, seqB);
      sim.setOutputSequence(pinOutA, seqA);
      return sim;
    },
    info: {
      title: 'Tutorial - Metal, Silicon and Vias',
      pages: [
        {
          contentHtml: `
<u><b>Metal</b></u> and <u><b>silicon</b></u> are the two primary materials used to build your circuits.<br/>
<br/>
Metal and silicon are placed on different layers of the chip, which allows current to flow across
them.<br/>
[IMG: show metal flowing current above silicon]<br/>
<br/>
Place <b>vias</b> to make connections between the two layers.<br/>
[IMG: show silicon connected with metal]
          `,
        },
        {
          contentHtml: `

Silicon comes in two flavors: <u><b>P-Type</b></u> and <u><b>N-Type</b></u>. By themselves, they are simply conductive
materials just like metal. However, by drawing one type over another, we can create a <u><b>gate</b></u> to
control the flow of current, which will be demonstrated in the next level.<br/>
<br/>
In this level, either type of silicon will work.<br/>
<br/>
<b>GOAL:</b><br/>
<br/>
Place metal, silicon and vias in order to connect the matching pairs of pins.
          `,
        },
      ],
    },
    infoCompleted: {
      title: 'Tutorial - Metal, Silicon and Vias',
      pages: [
        {
          contentHtml: `
Next, you will be introduced to gates, which are used to control the flow of current.
          `,
        },
      ],
    },
    nextLevelID: '03 PNP Gates',
  },


  '03 PNP Gates': {
    pinRows: 2,
    width: 22,
    height: 11,
    setup: (network) => {
      const [
        pinA, pinVCC,
        pinNC, pinNA,
      ] = network.getPinNodes();
      assignVCC(pinVCC);
      pinA.label = 'A';
      pinNA.label = '/A';
      const sim = new CircuitSimulation(network, 280);
      const seqA = new Sequence()
        .repeatTogglePoints(10, 4, 30, [ 0, 10, 20, 40 ]);
      sim.setInputSequence(pinA, seqA);
      const [ seqNA ] = createSequencesFromInputs(
        [ seqA ],
        ({ inputs }) => {
          const [ a ] = inputs;
          return [ !a ];
        },
      );
      sim.setOutputSequence(pinNA, seqNA);
      return sim;
    },
    info: {
      title: 'Tutorial - PNP Gates',
      pages: [
        {
          contentHtml: `
There are two types of gates: the <u><b>PNP</b></u> gate and the <u><b>NPN</b></u> gate.<br/>
[IMG: Show PNP and NPN gates]<br/>
<br/>
Gates can be built by drawing silicon over top silicon of the opposite type.<br/>
[IMG: Show steps of PNP gate being drawn]<br/>
<br/>
The first gate we will build is the PNP gate, which is N-Type silicon drawn over P-Type
silicon, as shown above.
          `,
        },
        {
          contentHtml: `
A PNP gate allows current to flow through the P-Type silicon, unless a signal is applied to the
N-Type silicon, in which case the gate will close. When the signal is removed, the gate opens
allowing current to flow again.<br/>
<br/>
By using a PNP gate, we can invert a signal. This is also called a <u><b>NOT gate</b></u>.<br/>
[IMG: Show NOT gate with and without input]<br/>
[IMG: Scope of inverted signal]
          `,
        },
        {
          contentHtml: `
<b>GOAL:</b><br/>
<br/>
Build a NOT gate to invert the input signal.
          `,
        },
      ],
    },
    infoCompleted: {
      title: 'Tutorial - PNP Gates',
      pages: [
        {
          contentHtml: `
You may notice that the output signal is not an exact inversion of the input signal, but
is slightly delayed.<br/>
<br/>
This is due to <u><b>propagation delay</b></u>, which is the time it takes for
the gate to transition between opened or closed. This is expected, and the verification test will
succeed if the output signal matches within a short tolerance. Progagation delay will be explored
further in a later tutorial level.<br/>
<br/>
In the next level, you will be introduced to the counterpart of the PNP gate: the NPN gate.
          `,
        },
      ],
    },
    nextLevelID: '04 NPN Gates',
  },


  '04 NPN Gates': {
    pinRows: 2,
    width: 22,
    height: 11,
    setup: (network) => {
      const [
        pinA, pinVCC,
        pinB, pinY,
      ] = network.getPinNodes();
      assignVCC(pinVCC);
      pinA.label = 'A';
      pinB.label = 'B';
      pinY.label = 'Y';
      const sim = new CircuitSimulation(network, 280);
      const seqA = new Sequence()
        .addOscillation(10, 10, 10, 10)
        .addOscillation(210, 2, 20, 20);
      const seqB = new Sequence()
        .addOscillation(20, 7, 20, 10)
        .addPulse(220, 50);
      sim.setInputSequence(pinA, seqA);
      sim.setInputSequence(pinB, seqB);
      const [ seqY ] = createSequencesFromInputs(
        [ seqA, seqB ],
        ({ inputs }) => {
          const [ a, b ] = inputs;
          return [ a && b ];
        },
      );
      sim.setOutputSequence(pinY, seqY);
      return sim;
    },
    info: {
      title: 'Tutorial - NPN Gates',
      pages: [
        {
          contentHtml: `
The other type of gate is the NPN gate, which is P-Type silicon drawn over N-Type silicon.<br/>
<br/>
An NPN works the opposite way of a PNP gate. It gate allows current to flow through the N-Type
silicon, but only when there is a signal applied to the P-Type silicon. When the signal is removed,
the gate closes again.<br/>
[IMG: Show NPN gate with and without signal]<br/>
[IMG: Scope of signal]<br/>
<br/>
A single NPN gate used as shown above is not very useful here, but by chaining multiple NPN gates
we can stop the flow of current unless all inputs are active. This is also called an
<u><b>AND gate</b></u>.<br/>
[IMG: Show AND gate in use: 00 10 01 11]<br/>
          `,
        },
        {
          contentHtml: `
<b>GOAL:</b><br/>
<br/>
Build an AND gate by using two NPN gates.
          `,
        },
      ],
    },
    infoCompleted: {
      title: 'Tutorial - NPN Gates',
      pages: [
        {
          contentHtml: `
The PNP gate and the NPN gate are the two fundamental building blocks of your circuits. By using
them together, circuits can be built to perform complex logical operations.<br/>
<br/>
It is worth noting that building an AND gate is possible only one NPN gate. However, doing so can
result with some side-effects due to propagation delay, which may or may not be beneficial to your
circuit design. Feel free to give it a try and see what happens!<br/>
<br/>
In the next level, we will go into more detail about propagation delay.
          `,
        },
      ],
    },
    nextLevelID: '05 Propagation Delay',
  },


  '05 Propagation Delay': {
    pinRows: 1,
    width: 36,
    height: 7,
    setup: (network) => {
      const [
        pinIn, pinDelay,
      ] = network.getPinNodes();
      pinIn.label = 'In';
      pinDelay.label = 'Delay';
      const sim = new CircuitSimulation(network, 280);
      const seqIn = new Sequence()
        .addTogglePoints(10, 40, 60, 120, 150, 160, 200, 250);
      sim.setInputSequence(pinIn, seqIn);
      const delay = 10;
      const [ seqDelay ] = createSequencesFromInputs(
        [ seqIn ],
        ({ inputs, state }) => {
          const [ a ] = inputs;
          if (a) {
            state.counter++;
          } else {
            state.counter = 0;
          }
          return [ state.counter > delay ];
        },
        {
          counter: 0,
        }
      );
      sim.setOutputSequence(pinDelay, seqDelay);
      return sim;
    },
    info: {
      title: 'Tutorial - Propagation Delay',
      pages: [
        {
          contentHtml: `
<u><b>Propegation delay</b></u> is the time it takes for a gate to transition between its opened and
closed states.<br/>
<br/>
For many of the earlier levels, propagation delay is usually not a significant concern. Although it
is important to understand as it can affect the behavior of your circuits.
          `,
        },
        {
          contentHtml: `
The delay occurs when a PNP or NPN gate receives a signal to change its state from opened to closed,
or vice versa. The gate's state does not change immediately, and instead takes 1 cycle to
transition.<br/>
<br/>
This means that the output signal will be delayed by 1 cycle if the current needs to wait.<br/>
[IMG: Show timeline of NPN gate accepting a signal, and eventually changing state]
          `,
        },
        {
          contentHtml: `
Because of this delay, some circuits may not behave as expected if care is not taken to account for
it. However, it may also be useful to exploit this delay to create a delay in your circuits.<br/>
<br/>
For example, if we wanted to delay a signal for a certain amount of time, we can chain multiple
NPN gates together. Each gate will add 1 cycle of delay, so we can add as many gates as we
need.<br/>
[IMG: Show NPN chain]
          `,
        },
        {
          contentHtml: `
<b>GOAL:</b><br/>
<br/>
Build a circuit to delay the input by 10 cycles.
          `,
        },
      ],
    },
    infoCompleted: {
      title: 'Tutorial - Propagation Delay',
      pages: [
        {
          contentHtml: `
Tutorial complete! Select a level from the menu bar to start building on your own.<br/>
<br/>
Besides this tutorial, there are two other categories of levels: **KOHCTPYKTOP** and
**Open-Konstruktor**.<br/>
<br/>
**KOHCTPYKTOP**: These levels are based on the levels in the game KOHCTPYKTOP: Engineer of the
People. There are only a handful, but they can quickly become very challenging.<br/>
<br/>
**Open-Konstruktor**: These levels feature a more linear progression of difficulty and often build
upon previous levels. These levels start you off by designing very simple circuits, and by the end
you will be building large, complex devices. If you're a newcomer to this game or KOHCTPYKTOP,
these levels are a good place to start.<br/>
<br/>
Good luck!
          `,
        },
      ],
    },
  },


};

export { tutorial };
