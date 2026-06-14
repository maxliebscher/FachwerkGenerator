import './styles/app.css';
import { bootFachwerkGenerator } from './app/legacy-runtime';
import { setupInfoModal } from './ui/info-modal';

function boot(): void {
  bootFachwerkGenerator();
  setupInfoModal();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
