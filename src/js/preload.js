//FILE:           preload.js
//AUTHORS:        Otakar Kočí <xkocio00@stud.fit.vutbr.cz>
//                <>
//TEAM            KVM Switchers FIT BUT
//CREATED:        31/03/2024
//LAST MODIFIED:  31/03/2024
//DESCRIPTION:    File with scripts accessible at preload

window.addEventListener('DOMContentLoaded', () => {
    const welcomeSpan = document.getElementById("welcome");
    welcomeSpan.innerText = "1 + 2 = 3";
});