const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(',');

export function setupInfoModal(): void {
  const btnOpen = document.querySelector<HTMLButtonElement>('#btnOpenInfo');
  const btnClose = document.querySelector<HTMLButtonElement>('#btnCloseInfo');
  const modal = document.querySelector<HTMLElement>('#infoModal');
  const modalContent = document.querySelector<HTMLElement>('#infoModalContent');
  if (!btnOpen || !btnClose || !modal || !modalContent) return;

  let returnFocus: HTMLElement | null = null;

  function openModal(): void {
    returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : btnOpen;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    window.setTimeout(() => {
      modal.classList.remove('opacity-0');
      modalContent.classList.remove('scale-95');
      btnClose.focus();
    }, 10);
  }

  function closeModal(): void {
    if (modal.classList.contains('hidden')) return;
    modal.classList.add('opacity-0');
    modalContent.classList.add('scale-95');
    (returnFocus ?? btnOpen).focus();
    window.setTimeout(() => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }, 300);
  }

  function handleKeydown(event: KeyboardEvent): void {
    if (modal.classList.contains('hidden')) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
      return;
    }
    if (event.key !== 'Tab') return;

    const focusable = Array.from(modalContent.querySelectorAll<HTMLElement>(focusableSelector));
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  btnOpen.addEventListener('click', openModal);
  btnClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
  modal.addEventListener('keydown', handleKeydown);

  window.setTimeout(() => {
    const decode = (value: string): string => atob(value);
    const email = document.querySelector<HTMLAnchorElement>('#c-email');
    if (email) {
      email.href = decode('bWFpbHRvOmluZm9AZmFzc2FkZW5zY2htaWVkLmRl');
      email.textContent = decode('aW5mb0BmYXNzYWRlbnNjaG1pZWQuZGU=');
    }
    const imprint = document.querySelector<HTMLElement>('#c-imprint');
    if (imprint) {
      imprint.innerHTML = `${decode('TWF4aW1pbGlhbiBMaWVic2NoZXI=')}<br>${decode('VmVpbGNoZW53ZWcgMjE=')}, ${decode('MDEzMjYgRHJlc2Rlbg==')}`;
    }
  }, 400);
}
