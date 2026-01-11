# 🐫 OCaml Exercises

An interactive website for learning OCaml through hands-on coding exercises. Built with React, TypeScript, Tailwind CSS, and Monaco Editor.

## Features

- **Interactive Code Editor**: Monaco Editor with OCaml syntax highlighting
- **15+ Exercises**: Covering basics, recursion, lists, higher-order functions, trees, and more
- **Instant Feedback**: Run tests directly in the browser
- **Hints & Solutions**: Progressive hints and full solutions when needed
- **Progress Tracking**: Your code is auto-saved locally
- **Responsive Design**: Works on desktop and mobile

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Code Editor**: Monaco Editor (VS Code's editor)
- **Build Tool**: Vite
- **OCaml Execution**: Simulated toplevel (can be extended with js_of_ocaml)

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development

The development server runs at http://localhost:5173

## Project Structure

```
src/
├── components/
│   ├── CodeEditor.tsx      # Monaco editor with OCaml highlighting
│   ├── ExerciseList.tsx    # Home page with exercise cards
│   └── ExerciseView.tsx    # Individual exercise page
├── data/
│   └── exercises.ts        # Exercise definitions
├── lib/
│   └── ocaml-toplevel.ts   # OCaml execution wrapper
├── App.tsx                 # Router setup
├── main.tsx               # Entry point
└── index.css              # Tailwind imports
```

## License

MIT
