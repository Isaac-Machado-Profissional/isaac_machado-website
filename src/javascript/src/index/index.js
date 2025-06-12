
import { startTypewriter } from './typewriter.js';
import { initGradientRestart } from "./gradientRestart.js";
import { initAcordeonWithScroll } from "./acordeon.js";

initGradientRestart();
initAcordeonWithScroll();

startTypewriter("typewriter", [
    "Desenvolvedor WEB. ",
    "Desenvolvedor Front-END ",
    "Desenvolvedor Back-END ",
    " "
]);

