const getStarted = document.querySelector(".getStarted");
const startAnimation = () => {
    gsap.to(".getStarted div", {
        duration: 0.5,
        top: "0%",
        stagger: 0.1,
        scale: 1.5,
        ease: "ease.in",
    });
};
const endAnimation = () => {
    gsap.to(".getStarted div", {
        top: "100%",
        scale: 1,
        stagger: -0.1,
        duration: 0.5,
    });
};

['focus', 'mouseenter'].forEach(evt =>
    getStarted.addEventListener(evt, startAnimation, false)
);
['mouseleave', 'blur'].forEach(evt =>
    getStarted.addEventListener(evt, endAnimation, false)
);