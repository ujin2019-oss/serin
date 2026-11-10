(() => {
  'use strict';
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('#mobile-menu');
  const header = document.querySelector('.site-header');
  const desktop = window.matchMedia('(min-width: 1101px)');
  const headerBackground = header.querySelectorAll('[data-menu-background]');
  const setMenu = (open, restoreFocus = false) => {
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? '전체 메뉴 닫기' : '전체 메뉴 열기');
    mobileMenu.hidden = !open;
    document.body.classList.toggle('menu-open', open);
    // Restrict focus and assistive technology to navigation while the overlay is open.
    document.querySelector('main').inert = open;
    document.querySelector('footer').inert = open;
    headerBackground.forEach(element => { element.inert = open; });
    if (open) mobileMenu.querySelector('a').focus();
    else if (restoreFocus) menuToggle.focus();
  };
  menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  header.querySelector('.wordmark').addEventListener('click', () => setMenu(false));
  desktop.addEventListener('change', () => setMenu(false));
  document.addEventListener('keydown', event => {
    if (mobileMenu.hidden) return;
    if (event.key === 'Escape') { setMenu(false, true); return; }
    if (event.key === 'Tab') {
      const items = [menuToggle, ...mobileMenu.querySelectorAll('a')];
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hero = document.querySelector('.hero');
  const backToTop = document.querySelector('[data-back-to-top]');
  const root = document.documentElement;
  const compactHeaderHeight = Number.parseFloat(window.getComputedStyle(root).getPropertyValue('--header-compact-height')) || 56;
  let headerScrollQueued = false;
  const updateCompactHeader = () => {
    headerScrollQueued = false;
    const pastHero = hero.getBoundingClientRect().bottom <= compactHeaderHeight;
    root.classList.toggle('has-compact-header', pastHero);
    backToTop.classList.toggle('is-visible', pastHero);
    backToTop.setAttribute('aria-hidden', String(!pastHero));
    backToTop.setAttribute('tabindex', pastHero ? '0' : '-1');
    backToTop.inert = !pastHero;
  };
  const queueHeaderUpdate = () => {
    if (headerScrollQueued) return;
    headerScrollQueued = true;
    window.requestAnimationFrame(updateCompactHeader);
  };
  window.addEventListener('scroll', queueHeaderUpdate, { passive: true });
  window.addEventListener('resize', queueHeaderUpdate);
  window.addEventListener('pageshow', updateCompactHeader);
  backToTop.addEventListener('click', event => {
    event.preventDefault();
    header.querySelector('.wordmark').focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: motion.matches ? 'instant' : 'smooth' });
  });
  updateCompactHeader();

  const heroSlides = [...hero.querySelectorAll('.hero-slide')];
  const heroDots = [...hero.querySelectorAll('[data-hero-slide]')];
  const heroPlayback = hero.querySelector('[data-hero-autoplay]');
  const heroStatus = hero.querySelector('[data-hero-status]');
  let heroIndex = 0;
  let heroAutoplay = !motion.matches;
  let heroTimer = null;
  let heroFocused = false;
  let heroTouchActive = false;
  let heroInView = true;
  const scheduleHeroRotation = () => {
    window.clearTimeout(heroTimer);
    heroTimer = null;
    heroPlayback.classList.toggle('is-paused', !heroAutoplay);
    heroPlayback.setAttribute('aria-label', heroAutoplay ? '자동 전환 일시정지' : '자동 전환 재생');
    const rotating = heroAutoplay && !heroFocused && !heroTouchActive && !document.hidden && heroInView;
    // Keep automatic transitions quiet for screen readers; announce manual changes.
    heroStatus.setAttribute('aria-live', rotating ? 'off' : 'polite');
    if (rotating) heroTimer = window.setTimeout(() => {
      heroTimer = null;
      showHeroSlide(heroIndex + 1);
    }, 3000);
  };
  const showHeroSlide = index => {
    const previous = heroSlides[heroIndex];
    const moveFocus = document.activeElement && previous.contains(document.activeElement);
    heroIndex = (index + heroSlides.length) % heroSlides.length;
    heroSlides.forEach((slide, position) => {
      const active = position === heroIndex;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      slide.inert = !active;
      heroDots[position].classList.toggle('is-active', active);
      heroDots[position].setAttribute('aria-pressed', String(active));
    });
    heroStatus.textContent = heroSlides[heroIndex].getAttribute('aria-label');
    if (moveFocus) heroSlides[heroIndex].querySelector('a').focus({ preventScroll: true });
    scheduleHeroRotation();
  };
  showHeroSlide(0);
  hero.querySelector('.hero-controls').hidden = false;
  hero.querySelector('[data-hero-prev]').addEventListener('click', () => showHeroSlide(heroIndex - 1));
  hero.querySelector('[data-hero-next]').addEventListener('click', () => showHeroSlide(heroIndex + 1));
  heroDots.forEach(dot => dot.addEventListener('click', () => showHeroSlide(Number(dot.dataset.heroSlide))));
  heroPlayback.addEventListener('click', () => {
    heroAutoplay = !heroAutoplay;
    if (heroAutoplay) heroFocused = false;
    scheduleHeroRotation();
  });
  hero.addEventListener('focusin', () => { heroFocused = true; scheduleHeroRotation(); });
  hero.addEventListener('focusout', event => {
    heroFocused = Boolean(event.relatedTarget && hero.contains(event.relatedTarget));
    scheduleHeroRotation();
  });
  document.addEventListener('visibilitychange', scheduleHeroRotation);
  motion.addEventListener('change', event => {
    if (event.matches) heroAutoplay = false;
    scheduleHeroRotation();
  });
  if ('IntersectionObserver' in window) {
    const heroVisibility = new window.IntersectionObserver(entries => {
      heroInView = entries.some(entry => entry.isIntersecting);
      scheduleHeroRotation();
    }, { threshold: 0 });
    heroVisibility.observe(hero);
  }
  hero.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showHeroSlide(heroIndex + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  let heroTouch = null;
  hero.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch') { heroTouchActive = true; scheduleHeroRotation(); }
    heroTouch = event.pointerType === 'touch' && !event.target.closest('a, button')
      ? { x: event.clientX, y: event.clientY, id: event.pointerId } : null;
  });
  hero.addEventListener('pointerup', event => {
    if (event.pointerType === 'touch') heroTouchActive = false;
    if (!heroTouch || event.pointerId !== heroTouch.id) { scheduleHeroRotation(); return; }
    const dx = event.clientX - heroTouch.x;
    const dy = event.clientY - heroTouch.y;
    heroTouch = null;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.2) showHeroSlide(heroIndex + (dx < 0 ? 1 : -1));
    else scheduleHeroRotation();
  });
  hero.addEventListener('pointercancel', () => { heroTouch = null; heroTouchActive = false; scheduleHeroRotation(); });

  if ('IntersectionObserver' in window && !motion.matches) {
    document.documentElement.classList.add('motion-ready');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    motion.addEventListener('change', event => { if (event.matches) document.documentElement.classList.remove('motion-ready'); });
  }

  const productConfig = document.querySelector('#product-config');
  const quantityInput = productConfig.querySelector('#product-quantity');
  const quantityFeedback = productConfig.querySelector('#quantity-feedback');
  const totalValue = productConfig.querySelector('[data-total-value]');
  const totalUnit = productConfig.querySelector('[data-total-unit]');
  const quantityButtons = [...productConfig.querySelectorAll('[data-quantity-step]')];
  const unitPrice = Number(productConfig.dataset.unitPrice);
  const minQuantity = Number(quantityInput.getAttribute('min'));
  const maxQuantity = Number(quantityInput.getAttribute('max'));
  const won = new Intl.NumberFormat('ko-KR');
  let productQuantity = 1;
  const renderProductPrice = (quantity, message = '') => {
    productQuantity = quantity;
    quantityInput.value = String(quantity);
    quantityInput.removeAttribute('aria-invalid');
    quantityFeedback.textContent = message;
    totalValue.textContent = won.format(unitPrice * quantity);
    totalUnit.hidden = false;
    quantityButtons[0].disabled = quantity <= minQuantity;
    quantityButtons[1].disabled = quantity >= maxQuantity;
  };
  const validQuantity = value => /^\d+$/.test(value) && Number(value) >= minQuantity && Number(value) <= maxQuantity;
  quantityInput.addEventListener('input', () => {
    if (validQuantity(quantityInput.value)) renderProductPrice(Number(quantityInput.value));
    else {
      quantityInput.setAttribute('aria-invalid', 'true');
      quantityFeedback.textContent = `수량은 ${minQuantity}~${maxQuantity} 사이의 정수로 입력해 주세요.`;
      totalValue.textContent = '수량 확인';
      totalUnit.hidden = true;
    }
  });
  quantityInput.addEventListener('change', () => {
    if (validQuantity(quantityInput.value)) { renderProductPrice(Number(quantityInput.value)); return; }
    const numeric = Number(quantityInput.value);
    const quantity = Math.min(maxQuantity, Math.max(minQuantity, Number.isFinite(numeric) ? Math.trunc(numeric) : minQuantity));
    renderProductPrice(quantity, `수량을 ${quantity}박스로 조정했습니다.`);
  });
  quantityButtons.forEach(button => button.addEventListener('click', () => {
    const quantity = Math.min(maxQuantity, Math.max(minQuantity, productQuantity + Number(button.dataset.quantityStep)));
    renderProductPrice(quantity);
  }));
  productConfig.querySelector('input[name="product-package"]').addEventListener('change', () => renderProductPrice(productQuantity));
  renderProductPrice(1);

  const ritualTrack = document.querySelector('#ritual-track');
  const ritualCards = [...ritualTrack.querySelectorAll('.ritual-card')];
  const ritualPrev = document.querySelector('[data-ritual-prev]');
  const ritualNext = document.querySelector('[data-ritual-next]');
  const ritualStatus = document.querySelector('[data-ritual-status]');
  let ritualIndex = 0;
  let ritualScrollQueued = false;
  ritualCards.forEach((card, index) => {
    const title = card.querySelector('h3');
    title.id = `ritual-card-title-${index + 1}`;
    card.setAttribute('aria-labelledby', title.id);
    card.querySelector('img').setAttribute('draggable', 'false');
  });
  const renderRitualState = () => {
    ritualPrev.disabled = ritualIndex === 0;
    ritualNext.disabled = ritualIndex === ritualCards.length - 1;
    ritualStatus.textContent = ritualCards[ritualIndex].querySelector('h3').textContent;
  };
  const selectRitual = (index, focus = false) => {
    ritualIndex = Math.min(ritualCards.length - 1, Math.max(0, index));
    ritualTrack.scrollTo({ left: ritualCards[ritualIndex].offsetLeft - ritualCards[0].offsetLeft, behavior: motion.matches ? 'instant' : 'smooth' });
    renderRitualState();
    if (focus) ritualCards[ritualIndex].focus({ preventScroll: true });
  };
  ritualPrev.addEventListener('click', () => selectRitual(ritualIndex - 1));
  ritualNext.addEventListener('click', () => selectRitual(ritualIndex + 1));
  ritualTrack.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      selectRitual(ritualIndex + (event.key === 'ArrowRight' ? 1 : -1), true);
    }
  });
  ritualTrack.addEventListener('scroll', () => {
    if (ritualScrollQueued) return;
    ritualScrollQueued = true;
    window.requestAnimationFrame(() => {
      ritualScrollQueued = false;
      const origin = ritualCards[0].offsetLeft;
      const distance = card => Math.abs(card.offsetLeft - origin - ritualTrack.scrollLeft);
      const closest = ritualCards.reduce((best, card, index) => distance(card) < distance(ritualCards[best]) ? index : best, 0);
      if (closest !== ritualIndex) { ritualIndex = closest; renderRitualState(); }
    });
  }, { passive: true });
  renderRitualState();

  document.querySelectorAll('.faq-list details').forEach((details, index) => {
    const summary = details.querySelector('summary');
    const answer = details.querySelector('p');
    answer.id = `faq-answer-${index + 1}`;
    summary.setAttribute('aria-controls', answer.id);
    const updateExpanded = () => summary.setAttribute('aria-expanded', String(Boolean(details.open)));
    details.addEventListener('toggle', updateExpanded);
    updateExpanded();
  });

  document.querySelectorAll('.gallery-thumb').forEach(button => {
    button.addEventListener('click', () => {
      const image = document.querySelector('#product-image');
      image.src = `assets/images/${button.dataset.image}.webp`;
      image.alt = button.dataset.alt;
      document.querySelectorAll('.gallery-thumb').forEach(item => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
    });
  });

  // Native dialogs provide focus containment, Escape handling and modal semantics.
  const lastTriggers = new WeakMap();
  document.querySelectorAll('[data-open]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const dialog = document.getElementById(trigger.dataset.open);
      if (!dialog || dialog.open) return;
      lastTriggers.set(dialog, trigger);
      dialog.showModal();
      dialog.scrollTop = 0;
      document.body.classList.add('dialog-open');
      dialog.querySelector('.dialog-close').focus({ preventScroll: true });
    });
  });
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('dialog-open');
      lastTriggers.get(dialog)?.focus({ preventScroll: true });
    });
    dialog.querySelectorAll('.dialog-anchor').forEach(link => link.addEventListener('click', event => {
      event.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      dialog.close();
      if (target) {
        history.replaceState(null, '', link.getAttribute('href'));
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.scrollIntoView({ behavior: motion.matches ? 'instant' : 'smooth', block: 'start' });
        target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
      }
    }));
  });
})();
