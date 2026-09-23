/* =========================================================
   ROMANDA & SUCI
   DIGITAL WEDDING INVITATION
   JAVASCRIPT
========================================================= */


/* =========================================================
   1. WAIT UNTIL PAGE IS READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Romanda & Suci Wedding Invitation loaded.");


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const openingScreen =
        document.getElementById("openingScreen");

    const openInvitation =
        document.getElementById("openInvitation");

    const mainContent =
        document.getElementById("mainContent");

    const weddingMusic =
        document.getElementById("weddingMusic");

    const musicButton =
        document.getElementById("musicButton");

    const guestName =
        document.getElementById("guestName");

    const countdownFinished =
        document.getElementById("countdownFinished");

    const copyAccount =
        document.getElementById("copyAccount");

    const accountNumber =
        document.getElementById("accountNumber");

    const copyMessage =
        document.getElementById("copyMessage");

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const closeLightbox =
        document.getElementById("closeLightbox");


    /* =====================================================
       2. GET GUEST NAME FROM URL
       
       Example:
       Romanda & Suci.html?to=Andi
    ====================================================== */

    function getGuestName() {

        const urlParams =
            new URLSearchParams(
                window.location.search
            );

        const guest =
            urlParams.get("to");

        if (
            guest &&
            guest.trim() !== ""
        ) {

            return guest
                .trim()
                .replace(/\+/g, " ");

        }

        return "Bapak/Ibu/Saudara/i";

    }


    const currentGuest =
        getGuestName();


    if (guestName) {

        guestName.textContent =
            currentGuest;

    }


    /* =====================================================
       3. OPEN INVITATION
    ====================================================== */

    if (openInvitation) {

        openInvitation.addEventListener(
            "click",
            () => {

                /*
                 * Hide opening screen
                 */

                openingScreen.classList.add(
                    "hide"
                );


                /*
                 * Allow scrolling
                 */

                document.body.classList.remove(
                    "no-scroll"
                );


                /*
                 * Start music
                 */

                playMusic();


                /*
                 * Small delay before scrolling
                 * to beginning of main page
                 */

                setTimeout(() => {

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }, 300);

            }
        );

    }


    /* =====================================================
       4. INITIAL BODY STATE
    ====================================================== */

    /*
     * Prevent user from scrolling behind
     * the opening cover.
     */

    if (
        openingScreen &&
        !openingScreen.classList.contains("hide")
    ) {

        document.body.classList.add(
            "no-scroll"
        );

    }


    /* =====================================================
       5. MUSIC
    ====================================================== */

    let musicPlaying = false;


    async function playMusic() {

        if (!weddingMusic) {
            return;
        }

        try {

            await weddingMusic.play();

            musicPlaying = true;

            updateMusicButton();

        } catch (error) {

            /*
             * Browser may block audio
             * until user interaction.
             */

            console.log(
                "Music playback waiting for user interaction."
            );

            musicPlaying = false;

            updateMusicButton();

        }

    }


    function pauseMusic() {

        if (!weddingMusic) {
            return;
        }

        weddingMusic.pause();

        musicPlaying = false;

        updateMusicButton();

    }


    function updateMusicButton() {

        if (!musicButton) {
            return;
        }


        if (musicPlaying) {

            musicButton.classList.add(
                "playing"
            );

            musicButton.textContent =
                "🎵";

            musicButton.setAttribute(
                "aria-label",
                "Matikan musik"
            );

        } else {

            musicButton.classList.remove(
                "playing"
            );

            musicButton.textContent =
                "🔇";

            musicButton.setAttribute(
                "aria-label",
                "Putar musik"
            );

        }

    }


    if (musicButton) {

        musicButton.addEventListener(
            "click",
            () => {

                if (musicPlaying) {

                    pauseMusic();

                } else {

                    playMusic();

                }

            }
        );

    }


    /*
     * Update state if browser pauses audio.
     */

    if (weddingMusic) {

        weddingMusic.addEventListener(
            "pause",
            () => {

                if (
                    !weddingMusic.ended
                ) {

                    musicPlaying = false;

                    updateMusicButton();

                }

            }
        );


        weddingMusic.addEventListener(
            "play",
            () => {

                musicPlaying = true;

                updateMusicButton();

            }
        );

    }


    /* =====================================================
       6. COUNTDOWN
       
       TARGET:
       12 December 2026
       08:00 WIB
       
       WIB = UTC+7
    ====================================================== */

    const weddingDate =
        new Date(
            "2026-12-12T08:00:00+07:00"
        );


    function updateCountdown() {

        const now =
            new Date();

        const difference =
            weddingDate.getTime()
            -
            now.getTime();


        /*
         * Wedding day has arrived
         */

        if (
            difference <= 0
        ) {

            showCountdownFinished();

            return;

        }


        /*
         * Calculate time
         */

        const days =
            Math.floor(
                difference /
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            );


        const hours =
            Math.floor(
                (
                    difference %
                    (
                        1000 *
                        60 *
                        60 *
                        24
                    )
                ) /
                (
                    1000 *
                    60 *
                    60
                )
            );


        const minutes =
            Math.floor(
                (
                    difference %
                    (
                        1000 *
                        60 *
                        60
                    )
                ) /
                (
                    1000 *
                    60
                )
            );


        const seconds =
            Math.floor(
                (
                    difference %
                    (
                        1000 *
                        60
                    )
                ) /
                1000
            );


        /*
         * Update HTML
         */

        const daysElement =
            document.getElementById(
                "days"
            );

        const hoursElement =
            document.getElementById(
                "hours"
            );

        const minutesElement =
            document.getElementById(
                "minutes"
            );

        const secondsElement =
            document.getElementById(
                "seconds"
            );


        if (daysElement) {

            daysElement.textContent =
                formatNumber(days);

        }


        if (hoursElement) {

            hoursElement.textContent =
                formatNumber(hours);

        }


        if (minutesElement) {

            minutesElement.textContent =
                formatNumber(minutes);

        }


        if (secondsElement) {

            secondsElement.textContent =
                formatNumber(seconds);

        }

    }


    function formatNumber(number) {

        return String(number)
            .padStart(2, "0");

    }


    function showCountdownFinished() {

        const countdown =
            document.getElementById(
                "countdown"
            );


        if (countdown) {

            countdown.style.display =
                "none";

        }


        if (countdownFinished) {

            countdownFinished.style.display =
                "block";

        }

    }


    /*
     * Run immediately
     */

    updateCountdown();


    /*
     * Update every second
     */

    setInterval(
        updateCountdown,
        1000
    );


    /* =====================================================
       7. COPY BANK ACCOUNT
    ====================================================== */

    if (
        copyAccount &&
        accountNumber
    ) {

        copyAccount.addEventListener(
            "click",
            async () => {

                const number =
                    accountNumber.textContent
                        .trim();


                try {

                    /*
                     * Modern browser
                     */

                    await navigator.clipboard.writeText(
                        number
                    );


                    showCopySuccess();

                } catch (error) {

                    /*
                     * Fallback for older browsers
                     */

                    fallbackCopy(
                        number
                    );

                }

            }
        );

    }


    function showCopySuccess() {

        if (!copyMessage) {
            return;
        }

        copyMessage.textContent =
            "✓ Nomor rekening berhasil disalin";


        setTimeout(() => {

            copyMessage.textContent =
                "";

        }, 2500);

    }


    function fallbackCopy(text) {

        const textarea =
            document.createElement(
                "textarea"
            );


        textarea.value =
            text;


        textarea.style.position =
            "fixed";

        textarea.style.opacity =
            "0";


        document.body.appendChild(
            textarea
        );


        textarea.focus();

        textarea.select();


        try {

            document.execCommand(
                "copy"
            );

            showCopySuccess();

        } catch (error) {

            if (copyMessage) {

                copyMessage.textContent =
                    "Silakan salin nomor rekening secara manual.";

            }

        }


        document.body.removeChild(
            textarea
        );

    }


    /* =====================================================
       8. GALLERY LIGHTBOX
    ====================================================== */

    const galleryImages =
        document.querySelectorAll(
            ".gallery-item img, .prewedding-image img"
        );


    galleryImages.forEach(
        (image) => {

            image.addEventListener(
                "click",
                () => {

                    openLightbox(
                        image.src,
                        image.alt
                    );

                }
            );

        }
    );


    function openLightbox(
        source,
        altText
    ) {

        if (
            !lightbox ||
            !lightboxImage
        ) {

            return;

        }


        lightboxImage.src =
            source;

        lightboxImage.alt =
            altText || "Foto";


        lightbox.classList.add(
            "active"
        );


        document.body.classList.add(
            "no-scroll"
        );

    }


    function closeLightboxFunction() {

        if (!lightbox) {
            return;
        }


        lightbox.classList.remove(
            "active"
        );


        document.body.classList.remove(
            "no-scroll"
        );


        /*
         * Clear image after animation
         */

        setTimeout(() => {

            if (lightboxImage) {

                lightboxImage.src =
                    "";

            }

        }, 300);

    }


    if (closeLightbox) {

        closeLightbox.addEventListener(
            "click",
            closeLightboxFunction
        );

    }


    /*
     * Close by clicking
     * outside image
     */

    if (lightbox) {

        lightbox.addEventListener(
            "click",
            (event) => {

                if (
                    event.target ===
                    lightbox
                ) {

                    closeLightboxFunction();

                }

            }
        );

    }


    /*
     * Close with ESC
     */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                lightbox &&
                lightbox.classList.contains(
                    "active"
                )
            ) {

                closeLightboxFunction();

            }

        }
    );


    /* =====================================================
       9. SCROLL REVEAL ANIMATION
    ====================================================== */

    const animatedElements =
        document.querySelectorAll(
            ".section > .container"
        );


    animatedElements.forEach(
        (element) => {

            element.classList.add(
                "fade-up"
            );

        }
    );


    /*
     * Intersection Observer
     */

    const observer =
        new IntersectionObserver(
            (
                entries,
                observer
            ) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    animatedElements.forEach(
        (element) => {

            observer.observe(
                element
            );

        }
    );


    /* =====================================================
       10. IMAGE ERROR HANDLING
    ====================================================== */

    const allImages =
        document.querySelectorAll(
            "img"
        );


    allImages.forEach(
        (image) => {

            image.addEventListener(
                "error",
                () => {

                    console.warn(
                        "Gambar tidak ditemukan:",
                        image.src
                    );

                    image.classList.add(
                        "image-error"
                    );

                }
            );

        }
    );


    /* =====================================================
       11. PREVENT EMPTY LINKS
    ====================================================== */

    const links =
        document.querySelectorAll(
            'a[href="#"]'
        );


    links.forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                }
            );

        }
    );


    /* =====================================================
       12. UPDATE PAGE TITLE WITH GUEST
    ====================================================== */

    if (
        currentGuest &&
        currentGuest !==
        "Bapak/Ibu/Saudara/i"
    ) {

        document.title =
            `Undangan Romanda & Suci | ${currentGuest}`;

    }


    /* =====================================================
       13. LOG INFORMATION
    ====================================================== */

    console.log(
        "Guest:",
        currentGuest
    );

    console.log(
        "Wedding date:",
        weddingDate
    );

});