// src/javascript/import/contact.js

// 1️⃣ importe o Tailwind primeiro
import '../../css/src/tailwind.css';

// 2️⃣ depois seus estilos específicos
import '../../css/src/contact.css';


// 3️⃣ os scripts não-React
import "../src/contact/forms.js";
import '../src/global/animateOnScroll.js';
import "../src/global/cookie.js";
import "../src/global/hover.js";

// 4️⃣ React
import React from "react";
import { createRoot } from "react-dom/client";
import App from "../react/components/listbox.jsx";

// React inicializa aqui
const rootElement = document.getElementById("listbox");
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
}

