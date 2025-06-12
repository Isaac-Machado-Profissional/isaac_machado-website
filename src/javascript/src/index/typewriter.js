export function startTypewriter(elementId, texts, options = {}) {
    const element = document.getElementById(elementId);
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
  
    const typeSpeed = options.typeSpeed || 100;
    const deleteSpeed = options.deleteSpeed || 50;
    const pauseBetween = options.pauseBetween || 4000;
  
    function type() {
      const currentText = texts[textIndex];
      element.textContent = currentText.substring(0, charIndex);
  
      let delay = isDeleting ? deleteSpeed : typeSpeed;
  
      if (!isDeleting && charIndex === currentText.length) {
        delay = pauseBetween;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        delay = 500;
      }
  
      charIndex += isDeleting ? -1 : 1;
      setTimeout(type, delay);
    }
  
    type();
  }
  