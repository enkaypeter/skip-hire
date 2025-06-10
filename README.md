# Skip Hire Re-design

This project is a React-based frontend application made as a redesign of the skip hiring screen on [wewantwaste](https://wewantwaste.co.uk/). The application is designed to be responsive and user-friendly, focusing on a clean and maintainable codebase.

## Getting Started
The installation instructions below will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v18.x or later recommended)
*   Yarn (v1.x or later recommended)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/enkaypeter/skip-hire
    ```
2.  Navigate to the project directory:
    ```bash
    cd skip-hire
    ```
3.  Install dependencies:
    ```bash
    yarn
    ```

### Running the Development Server

To start the development server, run:

```bash
yarn dev
```

This will typically start the application on `http://localhost:5173`

## Re-design Approach

### Overall Philosophy
Focuses on clean, maintainable code, responsiveness, and UI/UX improvements.

- **User Experience:** Aims to deliver an intuitive frontend.
- **Maintainable React Code:**
  - Leverages a component-driven architecture for modularity and reusability.
  - Utilizes TypeScript for type safety, catching errors early and improving code clarity.
  - Employs custom hooks to encapsulate and reuse stateful logic, keeping components clean.
- **Responsive Design & UI/UX:**
  - Utilizes Tailwind CSS with a customized for a utility-first styling approach.
  - Ensures visual consistency and adaptability across different devices.
  - Utilizes Radix-UI component library for catchy visual components


### AI Workflow
- Jules: Used for scaffolding features (e.g., pulling data from API, persisting skip selection state).
- Bolt: Used for scaffolding UI components.

### Figma Board
The Figma board ([link](https://www.figma.com/design/LmLZjOlbdMCUTpNptoBjzc/skip-hire-redesign)) shows the old and new designs side-by-side.

### Production URL

This project's `main` branch has been deployed on vercel for live demo purposes:
https://skip-hire-teal.vercel.app
