Quantum Circuit Simulator

Software Used, Installation and Execution Procedure

Document prepared by: Shahvez Rahman Khan
Program: B.Tech Computer Science & Engineering
Institution: SRM Institute of Science and Technology (SRMIST)

Project: QuantumLab, a browser-based quantum circuit simulator.

Live demo: https://quantum-circuit-lab.netlify.app

1. Software Used

The simulator is a front-end web project, so it needs only a web browser to run. The other tools are optional.

Software	Purpose	Required
Web browser (Google Chrome, Microsoft Edge or Mozilla Firefox, recent version)	Runs the simulator	Yes
HTML	Structure of the application (index.html)	Part of the project
CSS	Styling and layout (styles.css)	Part of the project
JavaScript	Application logic, state-vector simulation and visualization (quantum-engine.js, visualizer.js, app.js, learn.js)	Part of the project
Visual Studio Code	Viewing and editing the source code	Optional
Live Server (VS Code extension)	Opens the project with automatic reload	Optional
Node.js	Starts a local server with npx serve .	Optional
Git	Cloning the project from GitHub	Optional

No database or server is needed. The simulation runs entirely in the browser. An internet connection is used only to load the Google Fonts.

2. Project Files
quantum-lab-circuit/
├── index.html           Main page
├── styles.css           Styling
├── quantum-engine.js    Quantum state-vector simulation engine
├── visualizer.js        Probability chart and Bloch sphere drawing
├── app.js               Circuit builder and interface logic
├── learn.js             Learning resources and lessons
├── assets/              Images used by the project
├── netlify.toml         Netlify deployment settings
├── package.json
└── README.md
3. Installation

Setup takes a few minutes and needs no build step.

Install a modern web browser such as Google Chrome, Microsoft Edge or Mozilla Firefox, if one is not already installed.
(Optional) Install Visual Studio Code from https://code.visualstudio.com to view or edit the source code.
(Optional) In VS Code, open the Extensions panel and install Live Server.
(Optional) Install Node.js from https://nodejs.org if you want to use npx serve ..
(Optional) Install Git from https://git-scm.com if you want to clone the project.
Get the project files using either method:
Download the project as a ZIP file and extract it to a folder, or
Clone it:
bash
git clone https://github.com/shahvez-khan/Quantum-Circuit-Simulator.git
cd quantum-lab-circuit
Check that the project folder contains index.html, styles.css, quantum-engine.js, visualizer.js, app.js, learn.js and the assets folder, and keep them in the same folder structure.
4. Execution Procedure

Use any one of the three ways to start the simulator.

Option A, open the file: double-click index.html in the project folder.
Option B, Live Server: open the folder in VS Code, right-click index.html and choose Open with Live Server.
Option C, local server: run the following in the project folder, then open the address shown in the terminal.
bash
npx serve .

Then build and run a circuit:

Wait for the simulator page to load in the browser.
Set the number of qubits with the Add Qubit and Remove Qubit buttons.
Drag gates from the gate palette (H, X, Y, Z, S, T, Rx, Ry, Rz, CNOT, CZ, SWAP, Toffoli) onto the qubit lines. Add the M gate to measure a qubit.
Click Run Circuit. The simulator applies each gate to the state vector and calculates the final quantum state.
Read the results in the Probabilities and Bloch sphere views.
To try an algorithm (Grover's, Shor's, QFT, VQE, QAOA or BB84), choose its card in the algorithms section and run it in the same way.
The export section shows the circuit as Qiskit, Cirq or Q# code.
Use Clear Circuit to start again.
Example: Bell State
Use two qubits, both starting in |0⟩.
Place an H gate on the first qubit.
Place a CNOT gate with the first qubit as control and the second as target.
Add measurement on both qubits and run the circuit.
Expected result: |00⟩ is about 50% and |11⟩ is about 50%, which shows superposition and entanglement.
|0⟩ ── H ──●── Measurement
          │
|0⟩ ──────X── Measurement

