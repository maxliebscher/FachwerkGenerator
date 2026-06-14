// @ts-nocheck
/* eslint-disable */
export function setupInfoModal(): void {
  const btnOpen = document.getElementById('btnOpenInfo');
          if (!btnOpen) return;
          const btnClose = document.getElementById('btnCloseInfo');
          const modal = document.getElementById('infoModal');
          const modalContent = document.getElementById('infoModalContent');
          function openModal() {
              modal.classList.remove('hidden');
              modal.classList.add('flex');
              setTimeout(() => {
                  modal.classList.remove('opacity-0');
                  modalContent.classList.remove('scale-95');
              }, 10);
          }
          function closeModal() {
              modal.classList.add('opacity-0');
              modalContent.classList.add('scale-95');
              setTimeout(() => {
                  modal.classList.add('hidden');
                  modal.classList.remove('flex');
              }, 300);
          }
          btnOpen.addEventListener('click', openModal);
          btnClose.addEventListener('click', closeModal);
          modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
          setTimeout(() => {
              const dec = (s) => atob(s);
              const em = document.getElementById('c-email');
              if(em) { 
                  em.href = dec('bWFpbHRvOmluZm9AZmFzc2FkZW5zY2htaWVkLmRl'); 
                  em.textContent = dec('aW5mb0BmYXNzYWRlbnNjaG1pZWQuZGU='); 
              }
              const imp = document.getElementById('c-imprint');
              if(imp) { 
                  imp.innerHTML = dec('TWF4aW1pbGlhbiBMaWVic2NoZXI=') + "<br>" + dec('VmVpbGNoZW53ZWcgMjE=') + ", " + dec('MDEzMjYgRHJlc2Rlbg=='); 
              }
          }, 400);
}
