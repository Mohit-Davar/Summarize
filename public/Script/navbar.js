const getStarted = document.querySelector(".getStarted")
getStarted.addEventListener("mouseenter", () => {
    gsap.to(".getStarted div", {
        duration: 0.5,
        top: "0%",
        stagger: 0.1,
        scale: 1.5,
        ease: "ease.in",
    });
})
getStarted.addEventListener("mouseleave", () => {
    gsap.to(".getStarted div", {
        top: "100%",
        scale: 1,
        stagger: -0.1,
        duration: 0.5,
    });
})
