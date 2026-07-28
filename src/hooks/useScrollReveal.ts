import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // --- Scroll Reveal Observer ---
    const revealElements = document.querySelectorAll(
      ".reveal, .reveal-scale, .reveal-left, .reveal-right, .reveal-clip, .reveal-words, .section-gradient-line"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((el) => observer.observe(el));

    // --- Scroll Progress Bar ---
    const progressBar = document.querySelector(".scroll-progress") as HTMLElement | null;
    const handleScroll = () => {
      if (progressBar) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${scrollPercent}%`;
      }
    };

    // --- Parallax for background blobs ---
    const blobs = document.querySelectorAll(".parallax-blob") as NodeListOf<HTMLElement>;
    const handleParallax = () => {
      const scrollY = window.scrollY;
      blobs.forEach((blob, i) => {
        const speed = i === 0 ? 0.08 : 0.05;
        blob.style.transform = `translateY(${scrollY * speed}px)`;
      });
    };

    // --- Card 3D Tilt on mousemove ---
    const tiltCards = document.querySelectorAll(".card-tilt") as NodeListOf<HTMLElement>;
    const handleMouseMove = (e: MouseEvent) => {
      const card = (e.currentTarget as HTMLElement);
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    };

    const handleMouseLeave = (e: Event) => {
      const card = e.currentTarget as HTMLElement;
      card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    };

    tiltCards.forEach((card) => {
      card.addEventListener("mousemove", handleMouseMove as EventListener);
      card.addEventListener("mouseleave", handleMouseLeave);
    });

    // Combined scroll handler
    const onScroll = () => {
      handleScroll();
      handleParallax();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      tiltCards.forEach((card) => {
        card.removeEventListener("mousemove", handleMouseMove as EventListener);
        card.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);
}
