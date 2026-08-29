import './styles/app.css';
import { bootFachwerkGenerator } from './app/legacy-runtime';
import { activateI18n, initializeI18n } from './i18n/i18n';
import { setupInfoModal } from './ui/info-modal';

function boot(): void {
  initializeI18n();
  bootFachwerkGenerator();
  setupInfoModal();
  activateI18n();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
