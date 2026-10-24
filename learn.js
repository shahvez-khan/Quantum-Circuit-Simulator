const PI = Math.PI;

const COURSES = [
  {
    id: "basics",
    title: "Quantum Basics",
    lessons: [
      {
        title: "What Is Quantum Computing?",
        body: `
          <p>A quantum computer processes information using the laws of quantum mechanics. Instead of bits that are strictly 0 or 1, it uses <strong>qubits</strong>, which can exist in combinations of both states at once.</p>
          <p>This is not simply "trying every answer in parallel". Quantum algorithms work by carefully arranging <strong>interference</strong>: amplitudes leading to wrong answers cancel out, while those leading to right answers reinforce each other.</p>
          <h4>Three ideas you will meet in this course</h4>
          <ul>
            <li><strong>Superposition</strong> — a qubit can be in a blend of |0⟩ and |1⟩.</li>
            <li><strong>Measurement</strong> — reading a qubit gives a random outcome with well-defined probabilities.</li>
            <li><strong>Entanglement</strong> — qubits can share correlations that no classical system can reproduce.</li>
          </ul>
          <p>QuantumLab simulates all of this classically by tracking the full state vector, which is exact but grows as 2<sup>n</sup> with the number of qubits.</p>`,
        takeaway: "Quantum computers gain their power from superposition, entanglement and interference, not from raw speed.",
      },
      {
        title: "Classical Bits vs Qubits",
        body: `
          <p>A classical bit is always either 0 or 1. A qubit's state is written in <strong>Dirac (ket) notation</strong>. The two basis states are:</p>
          <div class="lm-formula">|0⟩ = [1, 0]ᵀ &nbsp;&nbsp;&nbsp; |1⟩ = [0, 1]ᵀ</div>
          <p>These play the role of classical 0 and 1. Every qubit starts in |0⟩ in the simulator. Applying an <strong>X gate</strong> flips it to |1⟩, just like a classical NOT.</p>
          <p>The difference appears when we use gates that have no classical counterpart, which you will see in the next lesson.</p>`,
        takeaway: "|0⟩ and |1⟩ are the computational basis states; a qubit can also be in any normalized combination of them.",
        circuit: { qubits: 1, gates: [["X", 0]] },
        tryHint: "Load a single X gate and confirm the result is |1⟩ with 100% probability.",
      },
      {
        title: "Superposition",
        body: `
          <p>A general single-qubit state is a weighted sum of the basis states:</p>
          <div class="lm-formula">|ψ⟩ = α|0⟩ + β|1⟩ &nbsp;&nbsp; with &nbsp;&nbsp; |α|² + |β|² = 1</div>
          <p>The numbers α and β are complex <strong>amplitudes</strong>. They are not probabilities themselves; their squared magnitudes are.</p>
          <p>The <strong>Hadamard gate (H)</strong> turns |0⟩ into an equal superposition:</p>
          <div class="lm-formula">H|0⟩ = (|0⟩ + |1⟩) / √2 = |+⟩</div>
          <p>Measuring |+⟩ gives 0 or 1 with 50% probability each.</p>`,
        takeaway: "Superposition means the state has non-zero amplitude on more than one basis state at the same time.",
        circuit: { qubits: 1, gates: [["H", 0]] },
        tryHint: "Apply H to q0 and look at the 50/50 probability bars.",
      },
      {
        title: "Measurement & Probability",
        body: `
          <p>When a qubit is measured, the superposition <strong>collapses</strong> to a single outcome. The <strong>Born rule</strong> gives the probabilities:</p>
          <div class="lm-formula">P(0) = |α|² &nbsp;&nbsp;&nbsp; P(1) = |β|²</div>
          <p>After measurement, the qubit stays in the observed state. Measuring it again immediately gives the same answer.</p>
          <p>Because a single measurement gives only one bit, real quantum programs are run many times (called <strong>shots</strong>) to estimate the probability distribution.</p>
          <ul>
            <li>Measurement is irreversible: the original amplitudes are lost.</li>
            <li>You cannot read α and β directly from one copy of a state.</li>
          </ul>`,
        takeaway: "Measurement returns a random classical result with probability |amplitude|², and destroys the superposition.",
        circuit: { qubits: 1, gates: [["H", 0], ["M", 0]] },
        tryHint: "Run H followed by a measurement several times and watch the outcome change.",
      },
      {
        title: "The Bloch Sphere",
        body: `
          <p>Any single-qubit state (ignoring a global phase) can be written with two angles:</p>
          <div class="lm-formula">|ψ⟩ = cos(θ/2)|0⟩ + e<sup>iφ</sup> sin(θ/2)|1⟩</div>
          <p>This maps every state to a point on the surface of a sphere: θ is the angle from the north pole, φ is the angle around the equator.</p>
          <ul>
            <li>North pole: |0⟩ &nbsp;·&nbsp; South pole: |1⟩</li>
            <li>Equator: equal superpositions such as |+⟩, |−⟩, |+i⟩, |−i⟩</li>
          </ul>
          <p>Single-qubit gates are <strong>rotations</strong> of this sphere. Try the sliders in the State Visualizer section to explore θ and φ directly.</p>`,
        takeaway: "The Bloch sphere turns single-qubit states into points and single-qubit gates into rotations.",
        circuit: { qubits: 1, gates: [["Ry", 0, null, null, { theta: PI / 3 }]] },
        tryHint: "Ry(π/3) tilts the state 60° from |0⟩, giving P(1) = sin²(π/6) = 25%.",
      },
      {
        title: "Phase and Interference",
        body: `
          <p>Two states can have identical measurement probabilities yet behave differently. Compare:</p>
          <div class="lm-formula">|+⟩ = (|0⟩ + |1⟩)/√2 &nbsp;&nbsp;&nbsp; |−⟩ = (|0⟩ − |1⟩)/√2</div>
          <p>The only difference is the <strong>relative phase</strong> (the minus sign). Applying H again reveals it: H|+⟩ = |0⟩ but H|−⟩ = |1⟩.</p>
          <p>This is <strong>interference</strong>. In H·H|0⟩, the two paths to |1⟩ have opposite signs and cancel, while the paths to |0⟩ add up. Every useful quantum algorithm is built on this effect.</p>`,
        takeaway: "Relative phase is invisible to direct measurement but controls interference, the engine of quantum algorithms.",
        circuit: { qubits: 1, gates: [["H", 0], ["H", 0]] },
        tryHint: "Two Hadamards in a row bring the qubit back to |0⟩ with 100% certainty.",
      },
      {
        title: "Multiple Qubits",
        body: `
          <p>Combining qubits uses the <strong>tensor product</strong>. Two qubits have four basis states:</p>
          <div class="lm-formula">|00⟩, |01⟩, |10⟩, |11⟩</div>
          <p>In general, n qubits need 2<sup>n</sup> complex amplitudes to describe. That exponential growth is why classical simulation becomes impossible beyond about 50 qubits, and why QuantumLab limits circuits to 10 qubits.</p>
          <p>Applying H to every qubit creates a uniform superposition over all 2<sup>n</sup> basis states, a common first step in many algorithms.</p>`,
        takeaway: "n qubits span a 2ⁿ-dimensional state space; H on every qubit gives an equal superposition of all of them.",
        circuit: { qubits: 3, gates: [["H", 0], ["H", 1], ["H", 2]] },
        tryHint: "H on three qubits gives all 8 outcomes with 12.5% probability each.",
      },
      {
        title: "Introduction to Entanglement",
        body: `
          <p>Some multi-qubit states cannot be written as a product of individual qubit states. These are <strong>entangled</strong>. The most famous example is the Bell state:</p>
          <div class="lm-formula">|Φ⁺⟩ = (|00⟩ + |11⟩) / √2</div>
          <p>Measuring either qubit gives a random result, but the two results always agree. This correlation is stronger than anything allowed by classical physics.</p>
          <p>It is created with just two gates: H on the first qubit, then a CNOT controlled by it. The Quantum Entanglement course explores this in depth.</p>`,
        takeaway: "Entangled qubits share a joint state; measuring one instantly fixes the correlated outcome of the other.",
        circuit: { qubits: 2, gates: [["H", 0], ["CNOT", 1, 0]] },
        tryHint: "Only |00⟩ and |11⟩ appear, each with 50% probability.",
        quiz: [
          {
            q: "What is the probability of measuring 1 for the state (|0⟩ + |1⟩)/√2?",
            options: ["0%", "25%", "50%", "100%"],
            answer: 2,
          },
          {
            q: "How many complex amplitudes describe a 4-qubit state?",
            options: ["4", "8", "16", "32"],
            answer: 2,
          },
          {
            q: "What does applying H twice to |0⟩ produce?",
            options: ["|0⟩", "|1⟩", "|+⟩", "|−⟩"],
            answer: 0,
          },
        ],
      },
    ],
  },
  {
    id: "gates",
    title: "Quantum Gates",
    lessons: [
      {
        title: "What Is a Quantum Gate?",
        body: `
          <p>A quantum gate is an operation that transforms a qubit's state. Mathematically, every gate is a <strong>unitary matrix</strong> U, meaning U†U = I.</p>
          <ul>
            <li><strong>Unitary</strong> gates preserve total probability (the state stays normalized).</li>
            <li>Every gate is <strong>reversible</strong>: U† undoes U.</li>
            <li>Single-qubit gates are 2×2 matrices; two-qubit gates are 4×4.</li>
          </ul>
          <p>Measurement is the one operation that is not unitary, which is why it is irreversible.</p>`,
        takeaway: "Quantum gates are reversible unitary transformations; only measurement breaks reversibility.",
      },
      {
        title: "Pauli-X Gate",
        body: `
          <p>The X gate is the quantum NOT. It swaps the amplitudes of |0⟩ and |1⟩:</p>
          <div class="lm-formula">X = [[0, 1], [1, 0]] &nbsp;&nbsp; X|0⟩ = |1⟩, &nbsp; X|1⟩ = |0⟩</div>
          <p>On the Bloch sphere it is a 180° rotation around the X axis. Applied to a superposition α|0⟩ + β|1⟩, it gives β|0⟩ + α|1⟩.</p>`,
        takeaway: "X flips |0⟩ ↔ |1⟩ and is a half-turn around the Bloch sphere's X axis.",
        circuit: { qubits: 1, gates: [["X", 0]] },
        tryHint: "X takes q0 from |0⟩ to |1⟩.",
      },
      {
        title: "Pauli-Y and Pauli-Z Gates",
        body: `
          <p>The other two Pauli gates are half-turns around the Y and Z axes:</p>
          <div class="lm-formula">Y = [[0, −i], [i, 0]] &nbsp;&nbsp;&nbsp; Z = [[1, 0], [0, −1]]</div>
          <p><strong>Z</strong> is a <em>phase flip</em>: it leaves |0⟩ alone and multiplies |1⟩ by −1. It turns |+⟩ into |−⟩ without changing measurement probabilities.</p>
          <p><strong>Y</strong> combines a bit flip and a phase flip: Y = iXZ.</p>`,
        takeaway: "Z flips the phase of |1⟩; Y flips both the bit and the phase.",
        circuit: { qubits: 1, gates: [["H", 0], ["Z", 0], ["H", 0]] },
        tryHint: "H·Z·H acts like X: the phase flip becomes a bit flip, so q0 ends in |1⟩.",
      },
      {
        title: "Hadamard Gate",
        body: `
          <p>The Hadamard gate creates and removes superposition:</p>
          <div class="lm-formula">H = (1/√2)·[[1, 1], [1, −1]]</div>
          <p>It maps |0⟩ → |+⟩ and |1⟩ → |−⟩, and it is its own inverse (H·H = I). Geometrically it swaps the X and Z axes of the Bloch sphere.</p>
          <p>H is the gate you will use most often: to start algorithms in superposition and to convert phase information into measurable bit information at the end.</p>`,
        takeaway: "H switches between the Z basis (|0⟩, |1⟩) and the X basis (|+⟩, |−⟩).",
        circuit: { qubits: 1, gates: [["X", 0], ["H", 0]] },
        tryHint: "X then H prepares |−⟩: still 50/50, but with a negative amplitude on |1⟩.",
      },
      {
        title: "Phase Gates: S and T",
        body: `
          <p>Phase gates add a phase to |1⟩ without touching |0⟩:</p>
          <div class="lm-formula">S = [[1, 0], [0, i]] &nbsp;&nbsp;&nbsp; T = [[1, 0], [0, e<sup>iπ/4</sup>]]</div>
          <p>They are fractions of Z: S = √Z (a 90° rotation around Z) and T = √S (45°). Their inverses are S† and T†.</p>
          <p>T is especially important because adding it to the "Clifford" gates (H, S, CNOT) makes a universal gate set.</p>`,
        takeaway: "S and T rotate the phase by 90° and 45°; two T gates equal one S, two S gates equal one Z.",
        circuit: { qubits: 1, gates: [["H", 0], ["T", 0], ["T", 0]] },
        tryHint: "H followed by T·T (= S) moves |+⟩ to |+i⟩ on the equator. Probabilities stay 50/50.",
      },
      {
        title: "Rotation Gates: Rx, Ry, Rz",
        body: `
          <p>Rotation gates turn the Bloch sphere by any angle θ around a chosen axis:</p>
          <div class="lm-formula">Ry(θ) = [[cos θ/2, −sin θ/2], [sin θ/2, cos θ/2]]</div>
          <ul>
            <li><strong>Rx(π)</strong> and <strong>Ry(π)</strong> equal X and Y up to a global phase.</li>
            <li><strong>Rz(θ)</strong> changes only the relative phase.</li>
            <li>Ry is handy for setting exact probabilities: Ry(θ)|0⟩ gives P(1) = sin²(θ/2).</li>
          </ul>
          <p>Parameterized rotations are the adjustable "knobs" in variational algorithms like VQE and QAOA.</p>`,
        takeaway: "Rx, Ry and Rz are continuous rotations; any single-qubit gate can be built from them.",
        circuit: { qubits: 1, gates: [["Ry", 0, null, null, { theta: PI / 2 }]] },
        tryHint: "Ry(π/2) rotates |0⟩ onto the equator, giving a 50/50 split like H.",
      },
      {
        title: "The √X (SX) Gate",
        body: `
          <p>SX is the square root of X: applying it twice gives a full bit flip.</p>
          <div class="lm-formula">SX = ½·[[1+i, 1−i], [1−i, 1+i]] &nbsp;&nbsp; SX·SX = X</div>
          <p>It is a 90° rotation around the X axis. IBM Quantum hardware uses SX, Rz and CNOT (or ECR) as its <strong>native gates</strong>; every other gate in your circuit is compiled into them.</p>`,
        takeaway: "SX is a quarter-turn around X and one of the native gates on real IBM hardware.",
        circuit: { qubits: 1, gates: [["SX", 0], ["SX", 0]] },
        tryHint: "Two SX gates act as one X gate, ending in |1⟩.",
      },
      {
        title: "The CNOT Gate",
        body: `
          <p>CNOT (controlled-NOT) is the most important two-qubit gate. It flips the <strong>target</strong> qubit only when the <strong>control</strong> qubit is |1⟩:</p>
          <div class="lm-formula">|00⟩→|00⟩ &nbsp; |01⟩→|01⟩ &nbsp; |10⟩→|11⟩ &nbsp; |11⟩→|10⟩ &nbsp;&nbsp; (control first)</div>
          <p>With a classical control it behaves like a reversible XOR. With a control in superposition, it creates <strong>entanglement</strong>.</p>`,
        takeaway: "CNOT flips the target when the control is |1⟩, and entangles qubits when the control is in superposition.",
        circuit: { qubits: 2, gates: [["X", 0], ["CNOT", 1, 0]] },
        tryHint: "q0 is set to |1⟩, so the CNOT flips q1 and both qubits read 1.",
      },
      {
        title: "CZ and Controlled-Phase Gates",
        body: `
          <p>The controlled-Z gate applies Z to the target when the control is |1⟩. Its matrix is diagonal:</p>
          <div class="lm-formula">CZ = diag(1, 1, 1, −1)</div>
          <p>Only |11⟩ picks up a minus sign, so CZ is <strong>symmetric</strong>: it doesn't matter which qubit you call the control.</p>
          <p>CZ and CNOT are interchangeable using Hadamards: CNOT = (I⊗H)·CZ·(I⊗H). Many superconducting chips implement CZ natively.</p>`,
        takeaway: "CZ adds a −1 phase only to |11⟩ and is equivalent to CNOT up to Hadamards on the target.",
        circuit: { qubits: 2, gates: [["H", 0], ["H", 1], ["CZ", 1, 0], ["H", 1]] },
        tryHint: "H–CZ–H on the target is exactly a CNOT, producing a Bell state.",
      },
      {
        title: "The SWAP Gate",
        body: `
          <p>SWAP exchanges the states of two qubits:</p>
          <div class="lm-formula">SWAP|01⟩ = |10⟩ &nbsp;&nbsp; SWAP|10⟩ = |01⟩</div>
          <p>It can be built from three CNOTs alternating direction. On real devices, qubits are only connected to their neighbours, so the compiler inserts SWAPs to move data around. Fewer SWAPs means less noise.</p>`,
        takeaway: "SWAP exchanges two qubits and equals three alternating CNOTs.",
        circuit: { qubits: 2, gates: [["X", 0], ["SWAP", 1, 0]] },
        tryHint: "q0 starts in |1⟩; after SWAP, the 1 has moved to q1.",
      },
      {
        title: "The Toffoli (CCX) Gate",
        body: `
          <p>The Toffoli gate has two controls and one target. It flips the target only when <strong>both</strong> controls are |1⟩.</p>
          <div class="lm-formula">|a, b, c⟩ → |a, b, c ⊕ (a·b)⟩</div>
          <p>Toffoli is a reversible AND gate and is universal for classical reversible computation. That means any classical circuit can run on a quantum computer. It is decomposed into 6 CNOTs plus single-qubit gates on hardware.</p>`,
        takeaway: "Toffoli is a reversible AND: the target flips only when both controls are 1.",
        circuit: { qubits: 3, gates: [["X", 0], ["X", 1], ["Toffoli", 2, 0, 1]] },
        tryHint: "Both controls are |1⟩, so the target q2 flips and the result is |111⟩.",
      },
      {
        title: "Universal Gate Sets",
        body: `
          <p>A gate set is <strong>universal</strong> if combinations of its gates can approximate any unitary operation to arbitrary precision.</p>
          <ul>
            <li><strong>{H, T, CNOT}</strong> is the classic universal set.</li>
            <li><strong>{Rx, Rz, CNOT}</strong> is universal using continuous rotations.</li>
            <li>The Clifford set {H, S, CNOT} alone is <em>not</em> universal and can be simulated efficiently on a classical computer (Gottesman–Knill theorem).</li>
          </ul>
          <p>The <strong>Solovay–Kitaev theorem</strong> guarantees that approximating a gate to precision ε needs only about log<sup>c</sup>(1/ε) gates from a universal set.</p>`,
        takeaway: "A small set like {H, T, CNOT} is enough to build any quantum computation.",
        quiz: [
          {
            q: "Which gate maps |0⟩ to (|0⟩ + |1⟩)/√2?",
            options: ["X", "Z", "H", "T"],
            answer: 2,
          },
          {
            q: "Two T gates in a row are equivalent to which gate?",
            options: ["S", "Z", "X", "H"],
            answer: 0,
          },
          {
            q: "Which gate set is universal?",
            options: ["{H, S, CNOT}", "{X, Z}", "{H, T, CNOT}", "{CNOT, SWAP}"],
            answer: 2,
          },
        ],
      },
    ],
  },
  {
    id: "algorithms",
    title: "Quantum Algorithms",
    lessons: [
      {
        title: "What Makes an Algorithm Quantum?",
        body: `
          <p>Most quantum algorithms follow the same pattern:</p>
          <ol>
            <li><strong>Prepare</strong> a superposition over many inputs (usually with Hadamards).</li>
            <li><strong>Encode</strong> the problem with an oracle or problem-specific gates, often as phases.</li>
            <li><strong>Interfere</strong> the amplitudes so that wrong answers cancel.</li>
            <li><strong>Measure</strong> to read out the answer with high probability.</li>
          </ol>
          <p>A speedup only exists when the problem has structure that interference can exploit. For unstructured problems, the best possible gain is quadratic (Grover); for problems with hidden periodicity, it can be exponential (Shor).</p>`,
        takeaway: "Quantum algorithms are recipes for interference: superpose, encode, interfere, measure.",
      },
      {
        title: "Deutsch–Jozsa Algorithm",
        body: `
          <p>You are given a function f(x) that is promised to be either <strong>constant</strong> (same output for all inputs) or <strong>balanced</strong> (0 for half the inputs, 1 for the other half). Which is it?</p>
          <p>Classically you may need 2<sup>n−1</sup>+1 queries. Deutsch–Jozsa needs <strong>exactly one</strong>.</p>
          <ul>
            <li>An ancilla qubit is prepared in |−⟩ so the oracle writes f(x) as a phase (<em>phase kickback</em>).</li>
            <li>A final H on the input qubits gives all zeros if f is constant, and something else if balanced.</li>
          </ul>`,
        takeaway: "Using phase kickback, one oracle query decides whether f is constant or balanced.",
        circuit: { qubits: 2, gates: [["X", 1], ["H", 0], ["H", 1], ["CNOT", 1, 0], ["H", 0]] },
        tryHint: "The oracle is f(x) = x (balanced), so q0 measures 1. q1 is the ancilla and stays in |−⟩.",
      },
      {
        title: "Bernstein–Vazirani Algorithm",
        body: `
          <p>A hidden bit string s defines f(x) = s·x (mod 2). The task is to find s.</p>
          <p>Classically you need n queries, one per bit. The quantum circuit uses the same structure as Deutsch–Jozsa and recovers <strong>all of s in a single query</strong>.</p>
          <p>The oracle places a CNOT from each input qubit where s has a 1 onto the ancilla. After the final Hadamards, the input register reads exactly s.</p>`,
        takeaway: "Bernstein–Vazirani reads an n-bit secret string with one quantum query instead of n.",
        circuit: {
          qubits: 3,
          gates: [["X", 2], ["H", 0], ["H", 1], ["H", 2], ["CNOT", 2, 0], ["CNOT", 2, 1], ["H", 0], ["H", 1]],
        },
        tryHint: "The secret is s = 11, so q0 and q1 always read 1. q2 is the ancilla.",
      },
      {
        title: "Grover's Search: The Idea",
        body: `
          <p>Grover's algorithm finds a marked item in an unsorted list of N entries using about <strong>(π/4)·√N</strong> queries, compared to N/2 on average classically.</p>
          <p>It works by <strong>amplitude amplification</strong>: start with equal amplitudes, then repeatedly</p>
          <ol>
            <li>flip the sign of the marked item (the <em>oracle</em>), and</li>
            <li>reflect all amplitudes about their average (the <em>diffuser</em>).</li>
          </ol>
          <p>Each round increases the marked amplitude. Too many rounds overshoot, so the iteration count matters.</p>`,
        takeaway: "Grover gives a quadratic speedup for unstructured search by amplifying the marked amplitude.",
      },
      {
        title: "Grover's Search: Oracle and Diffuser",
        body: `
          <p>The <strong>oracle</strong> is built from multi-controlled Z gates (with X gates around them to select the target pattern). It applies −1 only to the marked state.</p>
          <p>The <strong>diffuser</strong> is H⊗ⁿ · (2|0⟩⟨0| − I) · H⊗ⁿ, which performs the "inversion about the mean".</p>
          <div class="lm-formula">Optimal iterations ≈ ⌊(π/4)·√N⌋ &nbsp;&nbsp; (N = 8 → 2 iterations)</div>
          <p>The preset loads a 3-qubit Grover search for the state |111⟩.</p>`,
        takeaway: "Oracle marks the answer with a phase; the diffuser converts that phase into higher probability.",
        algorithm: "grover",
        tryHint: "Load the Grover preset and see |111⟩ dominate the probability chart.",
      },
      {
        title: "Quantum Fourier Transform",
        body: `
          <p>The QFT is the quantum version of the discrete Fourier transform. It maps basis states to phases:</p>
          <div class="lm-formula">|x⟩ → (1/√N) Σ<sub>k</sub> e<sup>2πi·xk/N</sup> |k⟩</div>
          <p>A classical FFT on 2<sup>n</sup> numbers takes O(n·2<sup>n</sup>) steps. The QFT circuit uses only O(n²) gates: Hadamards, controlled phase rotations and a final reversal with SWAPs.</p>
          <p>Note that the output lives in amplitudes, so it cannot simply be read out. Its power comes from being a subroutine in phase estimation and Shor's algorithm.</p>`,
        takeaway: "The QFT turns periodicity into peaks using only O(n²) gates.",
        algorithm: "qft",
        tryHint: "Load the 4-qubit QFT circuit into the simulator.",
      },
      {
        title: "Quantum Phase Estimation",
        body: `
          <p>Given a unitary U and one of its eigenstates |u⟩ with U|u⟩ = e<sup>2πiφ</sup>|u⟩, phase estimation finds φ.</p>
          <ol>
            <li>Put a counting register of t qubits in superposition.</li>
            <li>Apply controlled-U<sup>2ᵏ</sup> from each counting qubit; the phase kicks back.</li>
            <li>Apply the inverse QFT to the counting register and measure φ to t bits.</li>
          </ol>
          <p>Phase estimation is the core of Shor's algorithm, quantum chemistry energy calculations and the HHL linear-systems algorithm.</p>`,
        takeaway: "Phase estimation reads an eigenvalue's phase into a register using kickback and an inverse QFT.",
      },
      {
        title: "Shor's Algorithm",
        body: `
          <p>Shor's algorithm factors an integer N in polynomial time, which would break RSA encryption.</p>
          <ol>
            <li>Pick a random a &lt; N. Factoring reduces to finding the <strong>period r</strong> of f(x) = aˣ mod N.</li>
            <li>A quantum computer finds r using modular exponentiation and the QFT (phase estimation).</li>
            <li>Classical post-processing: gcd(a<sup>r/2</sup> ± 1, N) gives the factors.</li>
          </ol>
          <p>Breaking 2048-bit RSA is estimated to need around a million noisy physical qubits with error correction, far beyond today's devices. The simulator preset loads the QFT core of the algorithm.</p>`,
        takeaway: "Shor reduces factoring to period finding, which the QFT solves exponentially faster than known classical methods.",
        algorithm: "shor",
        tryHint: "Load the QFT stage used for period finding.",
      },
      {
        title: "Variational Algorithms: VQE & QAOA",
        body: `
          <p>Today's noisy devices can't run deep circuits. <strong>Variational</strong> algorithms use a short parameterized circuit and let a classical optimizer tune the parameters.</p>
          <ul>
            <li><strong>VQE</strong> (Variational Quantum Eigensolver) finds the ground-state energy of a molecule by minimizing ⟨ψ(θ)|H|ψ(θ)⟩.</li>
            <li><strong>QAOA</strong> (Quantum Approximate Optimization Algorithm) alternates a problem layer (γ) and a mixer layer (β) to approximate solutions to combinatorial problems like Max-Cut.</li>
          </ul>
          <p>The quantum computer evaluates the cost; the classical computer decides the next parameters.</p>`,
        takeaway: "VQE and QAOA are hybrid loops: a shallow quantum circuit plus a classical optimizer.",
        algorithm: "vqe",
        tryHint: "Load a 4-qubit VQE ansatz with rotation and entangling layers.",
      },
      {
        title: "Quantum Advantage & Limits",
        body: `
          <p>Quantum computers are not universally faster. Known speedups by problem type:</p>
          <ul>
            <li><strong>Exponential:</strong> factoring, discrete log, simulating quantum systems.</li>
            <li><strong>Quadratic:</strong> unstructured search, some optimization and Monte Carlo methods.</li>
            <li><strong>None known:</strong> most everyday tasks such as sorting, web serving or spreadsheets.</li>
          </ul>
          <p>Current hardware is in the <strong>NISQ</strong> era (Noisy Intermediate-Scale Quantum). Qubits decohere and gates have errors of roughly 0.1–1%. <strong>Quantum error correction</strong> combines many physical qubits into one reliable logical qubit and is the path to large-scale algorithms.</p>`,
        takeaway: "Quantum speedups are problem-specific; error correction is needed to run the big algorithms at scale.",
        quiz: [
          {
            q: "How many oracle queries does Deutsch–Jozsa need?",
            options: ["1", "n", "√N", "2ⁿ⁻¹ + 1"],
            answer: 0,
          },
          {
            q: "What speedup does Grover's algorithm give over classical search?",
            options: ["None", "Quadratic", "Exponential", "Logarithmic"],
            answer: 1,
          },
          {
            q: "Shor's algorithm reduces factoring to which problem?",
            options: ["Sorting", "Graph colouring", "Period finding", "Unstructured search"],
            answer: 2,
          },
        ],
      },
    ],
  },
  {
    id: "entanglement",
    title: "Quantum Entanglement",
    lessons: [
      {
        title: "What Is Entanglement?",
        body: `
          <p>A two-qubit state is <strong>separable</strong> if it can be written as a product |a⟩⊗|b⟩. Otherwise it is <strong>entangled</strong>.</p>
          <div class="lm-formula">(|00⟩ + |11⟩)/√2 &nbsp; ≠ &nbsp; (α|0⟩ + β|1⟩) ⊗ (γ|0⟩ + δ|1⟩)</div>
          <p>For an entangled pair, neither qubit has a definite state of its own. Only the pair as a whole is described by a pure state.</p>
          <p>Entanglement does <strong>not</strong> allow faster-than-light communication: each person sees purely random results until they compare notes over a classical channel.</p>`,
        takeaway: "Entangled states can't be factored into individual qubit states; the information lives in the correlations.",
        circuit: { qubits: 2, gates: [["H", 0], ["CNOT", 1, 0]] },
        tryHint: "The Bell state gives perfectly correlated outcomes: only 00 or 11.",
      },
      {
        title: "The Four Bell States",
        body: `
          <p>There are four maximally entangled two-qubit states, forming the <strong>Bell basis</strong>:</p>
          <div class="lm-formula">|Φ⁺⟩ = (|00⟩ + |11⟩)/√2 &nbsp;&nbsp; |Φ⁻⟩ = (|00⟩ − |11⟩)/√2<br>|Ψ⁺⟩ = (|01⟩ + |10⟩)/√2 &nbsp;&nbsp; |Ψ⁻⟩ = (|01⟩ − |10⟩)/√2</div>
          <p>All are made with H + CNOT, starting from a different input:</p>
          <ul>
            <li>|00⟩ → Φ⁺ &nbsp;·&nbsp; |10⟩ → Φ⁻ &nbsp;·&nbsp; |01⟩ → Ψ⁺ &nbsp;·&nbsp; |11⟩ → Ψ⁻ &nbsp; (first qubit is the H/control qubit)</li>
          </ul>
          <p>Running the circuit backwards (CNOT then H) is a <strong>Bell measurement</strong>, used in teleportation and superdense coding.</p>`,
        takeaway: "The four Bell states form a complete basis of maximally entangled two-qubit states.",
        circuit: { qubits: 2, gates: [["X", 1], ["H", 0], ["CNOT", 1, 0]] },
        tryHint: "Starting from q1 = |1⟩ gives |Ψ⁺⟩: only 01 and 10 appear (anti-correlated).",
      },
      {
        title: "EPR Paradox & Bell's Theorem",
        body: `
          <p>In 1935 Einstein, Podolsky and Rosen argued that entanglement implied quantum mechanics was incomplete, and that hidden variables must predetermine the outcomes. Einstein called it "spooky action at a distance".</p>
          <p>In 1964 John Bell showed this could be tested. Any local hidden-variable theory must satisfy the <strong>CHSH inequality</strong>:</p>
          <div class="lm-formula">|S| ≤ 2 &nbsp; (classical) &nbsp;&nbsp;&nbsp; |S| ≤ 2√2 ≈ 2.83 &nbsp; (quantum)</div>
          <p>Experiments consistently measure values near 2√2. Loophole-free tests in 2015 confirmed the violation, and the 2022 Nobel Prize in Physics went to Aspect, Clauser and Zeilinger for this work.</p>`,
        takeaway: "Bell tests prove that entangled correlations cannot be explained by any local hidden-variable theory.",
      },
      {
        title: "GHZ States",
        body: `
          <p>Entanglement extends beyond two qubits. The <strong>GHZ state</strong> (Greenberger–Horne–Zeilinger) on three qubits is:</p>
          <div class="lm-formula">|GHZ⟩ = (|000⟩ + |111⟩)/√2</div>
          <p>It is built with one H and a chain of CNOTs. All three qubits always agree when measured, but losing any single qubit destroys all the entanglement.</p>
          <p>GHZ states give an even sharper contradiction with local realism than Bell pairs, and they are used in quantum sensing and as benchmarks for hardware quality.</p>`,
        takeaway: "GHZ states entangle many qubits into an all-or-nothing correlation.",
        circuit: { qubits: 3, gates: [["H", 0], ["CNOT", 1, 0], ["CNOT", 2, 1]] },
        tryHint: "Only 000 and 111 appear, each with 50% probability.",
      },
      {
        title: "Quantum Teleportation",
        body: `
          <p>The <strong>no-cloning theorem</strong> says an unknown quantum state can't be copied. It can, however, be <em>moved</em> using entanglement and two classical bits.</p>
          <ol>
            <li>Alice and Bob share a Bell pair (q1 with Alice, q2 with Bob).</li>
            <li>Alice performs a Bell measurement on her message qubit q0 and q1.</li>
            <li>She sends her two result bits to Bob classically.</li>
            <li>Bob applies X and/or Z to q2 depending on those bits, and q2 becomes the original state.</li>
          </ol>
          <p>The simulator version replaces measurement plus classical corrections with controlled gates (the <em>deferred measurement principle</em>), giving the same result.</p>`,
        takeaway: "Teleportation transfers a qubit's state using one Bell pair and two classical bits; the original is destroyed.",
        circuit: {
          qubits: 3,
          gates: [
            ["Ry", 0, null, null, { theta: PI / 3 }],
            ["H", 1],
            ["CNOT", 2, 1],
            ["CNOT", 1, 0],
            ["H", 0],
            ["CNOT", 2, 1],
            ["CZ", 2, 0],
          ],
        },
        tryHint: "q0 starts in Ry(π/3)|0⟩ (25% chance of 1). After teleportation q2 carries that same 25%.",
      },
      {
        title: "Applications of Entanglement",
        body: `
          <p>Entanglement is a resource that powers many protocols:</p>
          <ul>
            <li><strong>Superdense coding</strong>: send 2 classical bits by transmitting 1 qubit of a shared Bell pair.</li>
            <li><strong>Quantum key distribution</strong> (E91, BB84): any eavesdropper disturbs the correlations and is detected.</li>
            <li><strong>Quantum repeaters &amp; networks</strong>: entanglement swapping links distant nodes.</li>
            <li><strong>Error correction</strong>: logical qubits are encoded in entangled states of many physical qubits.</li>
          </ul>
          <p>The circuit below sends the message "11" with superdense coding: Alice applies Z and X to her half, and Bob decodes with CNOT + H.</p>`,
        takeaway: "Entanglement enables secure keys, superdense coding, teleportation and error correction.",
        circuit: {
          qubits: 2,
          gates: [["H", 0], ["CNOT", 1, 0], ["Z", 0], ["X", 0], ["CNOT", 1, 0], ["H", 0]],
        },
        tryHint: "Bob decodes the message 11 with 100% probability.",
        quiz: [
          {
            q: "Which state is entangled?",
            options: ["|00⟩", "(|00⟩ + |01⟩)/√2", "(|01⟩ + |10⟩)/√2", "|+⟩|+⟩"],
            answer: 2,
          },
          {
            q: "What is the maximum CHSH value allowed by quantum mechanics?",
            options: ["1", "2", "2√2", "4"],
            answer: 2,
          },
          {
            q: "How many classical bits are needed to teleport one qubit?",
            options: ["0", "1", "2", "Unlimited"],
            answer: 2,
          },
        ],
      },
    ],
  },
];

const LEARN_STORAGE_KEY = "quantumlab-learn-progress";

let learnProgress = loadLearnProgress();
let activeCourse = null;
let activeLesson = 0;
let lessonModal = null;

function loadLearnProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(LEARN_STORAGE_KEY));
    return saved && typeof saved === "object" ? saved : {};
  } catch (e) {
    return {};
  }
}

function saveLearnProgress() {
  try {
    localStorage.setItem(LEARN_STORAGE_KEY, JSON.stringify(learnProgress));
  } catch (e) {}
}

function courseState(course) {
  if (!learnProgress[course.id]) {
    learnProgress[course.id] = { completed: [], last: 0 };
  }
  return learnProgress[course.id];
}

function isLessonDone(course, index) {
  return courseState(course).completed.includes(index);
}

function markLessonDone(course, index) {
  const state = courseState(course);
  if (!state.completed.includes(index)) {
    state.completed.push(index);
  }
  saveLearnProgress();
}

function coursePercent(course) {
  return Math.round((courseState(course).completed.length / course.lessons.length) * 100);
}

function setupLearningCourses() {
  const buttons = document.querySelectorAll(".course-card .btn-outline");
  buttons.forEach((btn, i) => {
    const course = COURSES[i];
    if (!course) return;
    btn.addEventListener("click", () => openCourse(course));
  });
  updateCourseCards();
}

function updateCourseCards() {
  document.querySelectorAll(".course-card").forEach((card, i) => {
    const course = COURSES[i];
    if (!course) return;
    const percent = coursePercent(course);
    const bar = card.querySelector(".progress-bar");
    const btn = card.querySelector(".btn-outline");
    if (bar) bar.style.width = `${percent}%`;
    if (btn) {
      btn.textContent = percent === 100 ? "Review Course" : percent > 0 ? "Continue Learning" : "Start Learning";
    }
  });
}

function buildLessonModal() {
  const modal = document.createElement("div");
  modal.className = "lm-overlay";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.innerHTML = `
    <div class="lm-panel">
      <header class="lm-header">
        <div class="lm-header-text">
          <span class="lm-course-tag"></span>
          <h2 class="lm-course-title"></h2>
        </div>
        <div class="lm-header-progress">
          <span class="lm-progress-label"></span>
          <div class="course-progress lm-progress"><div class="progress-bar"></div></div>
        </div>
        <button class="lm-close" aria-label="Close lessons">×</button>
      </header>
      <div class="lm-body">
        <nav class="lm-sidebar" aria-label="Lessons"></nav>
        <article class="lm-content"></article>
      </div>
      <footer class="lm-footer">
        <button class="btn-outline lm-prev">← Previous</button>
        <span class="lm-step"></span>
        <button class="btn-primary lm-next"></button>
      </footer>
    </div>`;

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeCourse();
  });
  modal.querySelector(".lm-close").addEventListener("click", closeCourse);
  modal.querySelector(".lm-prev").addEventListener("click", () => showLesson(activeLesson - 1));
  modal.querySelector(".lm-next").addEventListener("click", completeAndAdvance);

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("open")) return;
    if (e.key === "Escape") closeCourse();
    if (e.target.closest("input, textarea")) return;
    if (e.key === "ArrowRight" && activeLesson < activeCourse.lessons.length - 1) showLesson(activeLesson + 1);
    if (e.key === "ArrowLeft" && activeLesson > 0) showLesson(activeLesson - 1);
  });

  document.body.appendChild(modal);
  return modal;
}

function openCourse(course) {
  if (!lessonModal) lessonModal = buildLessonModal();
  activeCourse = course;

  const index = COURSES.indexOf(course);
  lessonModal.querySelector(".lm-course-tag").textContent = `Course ${String(index + 1).padStart(2, "0")}`;
  lessonModal.querySelector(".lm-course-title").textContent = course.title;

  const state = courseState(course);
  const firstUnfinished = course.lessons.findIndex((_, i) => !state.completed.includes(i));
  const start = firstUnfinished === -1 ? state.last || 0 : firstUnfinished;

  document.body.style.overflow = "hidden";
  lessonModal.classList.add("open");
  showLesson(Math.min(start, course.lessons.length - 1));
}

function closeCourse() {
  if (!lessonModal) return;
  lessonModal.classList.remove("open");
  document.body.style.overflow = "";
  updateCourseCards();
}

function renderLessonSidebar() {
  const sidebar = lessonModal.querySelector(".lm-sidebar");
  sidebar.innerHTML = activeCourse.lessons
    .map(
      (lesson, i) => `
      <button class="lm-lesson-link${i === activeLesson ? " active" : ""}${isLessonDone(activeCourse, i) ? " done" : ""}" data-index="${i}">
        <span class="lm-lesson-num">${isLessonDone(activeCourse, i) ? "✓" : i + 1}</span>
        <span class="lm-lesson-name">${lesson.title}</span>
      </button>`
    )
    .join("");
  sidebar.querySelectorAll(".lm-lesson-link").forEach((link) => {
    link.addEventListener("click", () => showLesson(parseInt(link.dataset.index)));
  });
  sidebar.querySelector(".active")?.scrollIntoView({ block: "nearest", inline: "nearest" });
}

function renderLessonProgress() {
  const percent = coursePercent(activeCourse);
  const done = courseState(activeCourse).completed.length;
  lessonModal.querySelector(".lm-progress-label").textContent = `${done}/${activeCourse.lessons.length} completed`;
  lessonModal.querySelector(".lm-progress .progress-bar").style.width = `${percent}%`;
}

function showLesson(index) {
  const lessons = activeCourse.lessons;
  if (index < 0 || index >= lessons.length) return;
  activeLesson = index;
  courseState(activeCourse).last = index;
  saveLearnProgress();

  const lesson = lessons[index];
  const hasLab = lesson.circuit || lesson.algorithm;
  const content = lessonModal.querySelector(".lm-content");

  content.innerHTML = `
    <span class="lm-lesson-tag">Lesson ${index + 1} of ${lessons.length}</span>
    <h3 class="lm-lesson-title">${lesson.title}</h3>
    <div class="lm-text">${lesson.body}</div>
    <div class="lm-takeaway"><strong>Key takeaway</strong><p>${lesson.takeaway}</p></div>
    ${
      hasLab
        ? `<div class="lm-lab">
            <div>
              <strong>Try it in the simulator</strong>
              <p>${lesson.tryHint || ""}</p>
            </div>
            <button class="btn-outline lm-try">Open in Simulator</button>
          </div>`
        : ""
    }
    ${lesson.quiz ? renderQuiz(lesson.quiz) : ""}`;

  content.querySelector(".lm-try")?.addEventListener("click", () => tryLessonCircuit(lesson));
  if (lesson.quiz) setupQuiz(content, lesson.quiz);
  content.scrollTop = 0;

  const isLast = index === lessons.length - 1;
  lessonModal.querySelector(".lm-prev").disabled = index === 0;
  lessonModal.querySelector(".lm-next").textContent = isLast ? "Finish Course ✓" : "Complete & Next →";
  lessonModal.querySelector(".lm-step").textContent = `${index + 1} / ${lessons.length}`;

  renderLessonSidebar();
  renderLessonProgress();
}

function completeAndAdvance() {
  markLessonDone(activeCourse, activeLesson);
  if (activeLesson < activeCourse.lessons.length - 1) {
    showLesson(activeLesson + 1);
    return;
  }
  renderLessonSidebar();
  renderLessonProgress();
  if (coursePercent(activeCourse) === 100) {
    showNotification(`🎉 You completed "${activeCourse.title}"!`, "success");
    closeCourse();
  } else {
    const remaining = activeCourse.lessons.findIndex((_, i) => !isLessonDone(activeCourse, i));
    showNotification("Almost there! A few lessons are still unfinished.", "info");
    showLesson(remaining);
  }
}

function renderQuiz(quiz) {
  return `
    <div class="lm-quiz">
      <h4>Course Quiz</h4>
      ${quiz
        .map(
          (item, qi) => `
          <fieldset class="lm-question" data-q="${qi}">
            <legend>${qi + 1}. ${item.q}</legend>
            ${item.options
              .map(
                (opt, oi) => `
                <label class="lm-option">
                  <input type="radio" name="lm-q${qi}" value="${oi}">
                  <span>${opt}</span>
                </label>`
              )
              .join("")}
          </fieldset>`
        )
        .join("")}
      <div class="lm-quiz-actions">
        <button class="btn-outline lm-check">Check Answers</button>
        <span class="lm-score"></span>
      </div>
    </div>`;
}

function setupQuiz(container, quiz) {
  container.querySelector(".lm-check").addEventListener("click", () => {
    let correct = 0;
    quiz.forEach((item, qi) => {
      const fieldset = container.querySelector(`.lm-question[data-q="${qi}"]`);
      const picked = fieldset.querySelector("input:checked");
      fieldset.querySelectorAll(".lm-option").forEach((label, oi) => {
        label.classList.toggle("correct", oi === item.answer);
        label.classList.toggle("wrong", picked && parseInt(picked.value) === oi && oi !== item.answer);
      });
      if (picked && parseInt(picked.value) === item.answer) correct++;
    });
    container.querySelector(".lm-score").textContent = `Score: ${correct} / ${quiz.length}`;
  });
}

function tryLessonCircuit(lesson) {
  closeCourse();

  if (lesson.algorithm) {
    window.loadAlgorithm(lesson.algorithm);
    return;
  }

  circuit = new QuantumCircuit(lesson.circuit.qubits);
  lesson.circuit.gates.forEach((g) => circuit.addGate(...g));
  selectQubit(0);
  renderCircuit();
  runCircuit();
  scrollToSection("simulator");
  showNotification(`Loaded "${lesson.title}" circuit`, "success");
}

document.addEventListener("DOMContentLoaded", setupLearningCourses);
