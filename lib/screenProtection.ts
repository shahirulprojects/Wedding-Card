// utility functions for screenshot and screen recording protection

// detect if the user is trying to take a screenshot
export const detectScreenCapture = (): boolean => {
  // check for unusual window dimensions (might indicate dev tools or screen recording software)
  const hasUnusualDimensions =
    window.outerHeight - window.innerHeight > 200 ||
    window.outerWidth - window.innerWidth > 200;

  return hasUnusualDimensions;
};

// prevent common screenshot keyboard shortcuts
export const preventScreenshotShortcuts = (
  onScreenshotAttempt?: () => void
): void => {
  document.addEventListener(
    "keydown",
    (e) => {
      // Windows: PrintScreen, Win+Shift+S
      // Mac: Cmd+Shift+3, Cmd+Shift+4, Cmd+Shift+5
      const isPrintScreen = e.key === "PrintScreen";
      const isWindowsSnip =
        (e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "s";
      const isMacScreenshot =
        (e.metaKey || e.ctrlKey) &&
        e.shiftKey &&
        (e.key === "3" || e.key === "4" || e.key === "5");

      if (isPrintScreen || isWindowsSnip || isMacScreenshot) {
        e.preventDefault();
        e.stopPropagation();
        alert("Screenshots are not allowed on this website.");
        if (onScreenshotAttempt) onScreenshotAttempt();
        return false;
      }
    },
    { capture: true }
  );
};

// prevent right-click context menu
export const preventContextMenu = (): void => {
  document.addEventListener(
    "contextmenu",
    (e) => {
      e.preventDefault();
      return false;
    },
    { capture: true }
  );
};

// prevent text selection
export const preventTextSelection = (): void => {
  const style = document.createElement("style");
  style.innerHTML = `
    * {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  `;
  document.head.appendChild(style);
};

// prevent drag and drop (sometimes used to capture content)
export const preventDragAndDrop = (): void => {
  document.addEventListener(
    "dragstart",
    (e) => {
      e.preventDefault();
      return false;
    },
    { capture: true }
  );
};

// detect if the page is being embedded in an iframe (could be for recording)
export const preventIframeEmbedding = (): void => {
  if (window.self !== window.top && window.top) {
    // page is in an iframe and window.top exists
    window.top.location.href = window.self.location.href;
  }
};

// detect browser developer tools (which can be used to disable protections)
export const detectDevTools = (onDevToolsOpen?: () => void): void => {
  const devToolsCheck = () => {
    const widthThreshold = window.outerWidth - window.innerWidth > 160;
    const heightThreshold = window.outerHeight - window.innerHeight > 160;

    if (widthThreshold || heightThreshold) {
      if (onDevToolsOpen) onDevToolsOpen();
      document.body.innerHTML =
        '<div style="text-align:center;padding:50px;">Developer tools are not allowed on this website.</div>';
    }
  };

  // check periodically
  setInterval(devToolsCheck, 1000);

  // also check on resize
  window.addEventListener("resize", devToolsCheck);
};

// add a watermark to the page
export const addWatermark = (text: string = "© Protected Content"): void => {
  // Skip adding watermark if text is empty
  if (!text || text.trim() === "") return;

  const watermarkStyle = document.createElement("style");
  watermarkStyle.innerHTML = `
    body::before {
      content: "${text}";
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(0, 0, 0, 0.1);
      font-size: 5rem;
      transform: rotate(-45deg);
      pointer-events: none;
      z-index: 1000;
    }
  `;
  document.head.appendChild(watermarkStyle);
};

// detect clipboard operations which might be used for screenshots
export const detectClipboardOperations = (
  onClipboardAttempt?: () => void
): void => {
  // Listen for copy events
  document.addEventListener(
    "copy",
    (e) => {
      if (onClipboardAttempt) onClipboardAttempt();
      e.preventDefault();
      return false;
    },
    { capture: true }
  );

  // Listen for cut events
  document.addEventListener(
    "cut",
    (e) => {
      if (onClipboardAttempt) onClipboardAttempt();
      e.preventDefault();
      return false;
    },
    { capture: true }
  );

  // Listen for paste events
  document.addEventListener(
    "paste",
    (e) => {
      if (onClipboardAttempt) onClipboardAttempt();
      e.preventDefault();
      return false;
    },
    { capture: true }
  );
};

// detect focus/blur events which might indicate screenshot attempts
export const detectFocusEvents = (onFocusChange?: () => void): void => {
  window.addEventListener("blur", () => {
    if (onFocusChange) onFocusChange();
  });

  window.addEventListener("focus", () => {
    // When focus returns, check if a screenshot was taken
    setTimeout(() => {
      // This timeout helps detect screenshots that happen during the blur event
      if (onFocusChange) onFocusChange();
    }, 300);
  });
};

// initialize all protections
export const initializeScreenProtection = (
  options: {
    watermarkText?: string;
    preventSelection?: boolean;
    preventRightClick?: boolean;
    preventKeyboardShortcuts?: boolean;
    preventDrag?: boolean;
    detectTools?: boolean;
    preventIframe?: boolean;
    onScreenshotAttempt?: () => void;
  } = {}
): void => {
  // Set default values
  const defaultOptions = {
    watermarkText: "",
    preventSelection: true,
    preventRightClick: true,
    preventKeyboardShortcuts: true,
    preventDrag: true,
    detectTools: true,
    preventIframe: true,
    onScreenshotAttempt: undefined as (() => void) | undefined,
  };

  // Merge with provided options
  const mergedOptions = { ...defaultOptions, ...options };

  if (typeof window === "undefined") return; // skip on server-side

  // add watermark only if text is provided
  if (
    mergedOptions.watermarkText &&
    mergedOptions.watermarkText.trim() !== ""
  ) {
    addWatermark(mergedOptions.watermarkText);
  }

  // prevent text selection
  if (mergedOptions.preventSelection) {
    preventTextSelection();
  }

  // prevent right-click
  if (mergedOptions.preventRightClick) {
    preventContextMenu();
  }

  // prevent screenshot shortcuts
  if (mergedOptions.preventKeyboardShortcuts) {
    preventScreenshotShortcuts(mergedOptions.onScreenshotAttempt);
  }

  // prevent drag and drop
  if (mergedOptions.preventDrag) {
    preventDragAndDrop();
  }

  // detect developer tools
  if (mergedOptions.detectTools) {
    detectDevTools(mergedOptions.onScreenshotAttempt);
  }

  // prevent iframe embedding
  if (mergedOptions.preventIframe) {
    preventIframeEmbedding();
  }

  // detect clipboard operations
  detectClipboardOperations(mergedOptions.onScreenshotAttempt);

  // detect focus/blur events
  detectFocusEvents(mergedOptions.onScreenshotAttempt);

  // Add additional event listeners for more immediate detection
  document.addEventListener("keyup", (e) => {
    // Some screenshot tools trigger after keyup
    if (e.key === "PrintScreen") {
      if (mergedOptions.onScreenshotAttempt)
        mergedOptions.onScreenshotAttempt();
    }
  });

  // Listen for mousedown events that might indicate screenshot attempts
  document.addEventListener("mousedown", (e) => {
    // Check if it's a special click that might be used for screenshots
    if (e.button === 2 || e.ctrlKey || e.metaKey) {
      // This could be a screenshot attempt with right-click or modifier keys
      setTimeout(() => {
        if (mergedOptions.onScreenshotAttempt)
          mergedOptions.onScreenshotAttempt();
      }, 100);
    }
  });
};
