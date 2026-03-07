(() => {
  const THEME_KEY = 'oscar-theme';
  const root = document.documentElement;

  const readStoredTheme = () => {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (err) {
      return null;
    }
  };

  const saveTheme = (theme) => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (err) {
      // Ignore storage errors.
    }
  };

  const getInitialTheme = () => {
    const stored = readStoredTheme();
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  };

  const applyTheme = (theme) => {
    const button = document.getElementById('theme-toggle');
    const isLight = theme === 'light';

    root.setAttribute('data-theme', theme);

    if (button) {
      button.setAttribute('aria-pressed', isLight ? 'true' : 'false');
      button.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
      button.classList.toggle('is-light', isLight);
    }
  };

  // Apply ASAP to keep a consistent initial render.
  applyTheme(getInitialTheme());

  const initToggle = () => {
    const button = document.getElementById('theme-toggle');
    if (!button) return;

    button.addEventListener('click', (event) => {
      event.preventDefault();
      const currentTheme = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
      saveTheme(nextTheme);
      applyTheme(nextTheme);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initToggle);
  } else {
    initToggle();
  }
})();
