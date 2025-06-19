document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('hamburgerToggle');
    const offcanvasEl = document.getElementById('offcanvasNavbar');
    const offcanvas = new bootstrap.Offcanvas(offcanvasEl);

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        offcanvas.show();
      } else {
        offcanvas.hide();
      }
    });

    offcanvasEl.addEventListener('shown.bs.offcanvas', () => {
      checkbox.checked = true;
    });

    offcanvasEl.addEventListener('hidden.bs.offcanvas', () => {
      checkbox.checked = false;
    });
  });
