import { useEffect } from "react";

declare global {
  interface HTMLElement {
    _handleScroll?: () => void;
    _timeout?: number;
  }
}

const useScrollEffect = () => {
  useEffect(() => {
    const observeScrollElements = () => {
      const elements =
        document.querySelectorAll<HTMLElement>(".scrollY, .scrollX");

      if (navigator.userAgent.toLowerCase().includes("firefox")) {
        elements.forEach((el) => el.classList.add("firefox"));
      }

      const handleScrollStyle = (container: HTMLElement) => {
        container.classList.add("scrolling");

        if (container._timeout) {
          clearTimeout(container._timeout);
        }

        container._timeout = window.setTimeout(() => {
          container.classList.remove("scrolling");
        }, 1000);
      };

      elements.forEach((el) => {
        if (!el._handleScroll) {
          el._handleScroll = () => handleScrollStyle(el);
          el.addEventListener("scroll", el._handleScroll);
        }
      });
    };

    const observer = new MutationObserver(observeScrollElements);
    observer.observe(document.body, { childList: true, subtree: true });

    observeScrollElements();

    return () => {
      observer.disconnect();
      document
        .querySelectorAll<HTMLElement>(".scrollY, .scrollX")
        .forEach((el) => {
          if (el._handleScroll) {
            el.removeEventListener("scroll", el._handleScroll);
            el._handleScroll = undefined;
          }
        });
    };
  }, []);
};

export default useScrollEffect;
