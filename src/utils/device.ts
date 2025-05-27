export const isMobile = () => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    // Checks for mobile keywords in user agent
    const isMobileUserAgent = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
    // Checks for touch capabilities
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    // Optionally, keep a width check as a fallback or additional condition
    const isNarrowScreen = window.innerWidth < 950;

    return isMobileUserAgent || hasTouch || isNarrowScreen;
};

export const isSmallDevice = () => window.innerWidth < 512;
