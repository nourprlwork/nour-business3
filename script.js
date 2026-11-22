
// =====================================
// NOUR BUSINESS SOLUTIONS
// WEBSITE JAVASCRIPT
// =====================================


// =====================================
// 1. GOOGLE COLAB API CONNECTION
// =====================================

const API_URL =
    "https://5000-m-s-usc1c13-3bl1dp767n90k-c.us-central1.prod.r.colab.dev";

function isValidApiUrl(url) {
    try {
        const parsed = new URL(url);

        return (
            parsed.protocol === "https:" &&
            parsed.hostname.endsWith(".colab.dev")
        );
    } catch {
        return false;
    }
}


// =====================================
// 2. MOBILE NAVIGATION
// =====================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        menuToggle.textContent = isOpen ? "✕" : "☰";
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}


// =====================================
// 3. TYPING ANIMATION
// =====================================

const typingText = document.getElementById("typingText");

const headingText =
    "Building Better Businesses Through Innovation";

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (typingText) {
    if (reducedMotion) {
        typingText.textContent = headingText;
    } else {
        let letterIndex = 0;

        function typeHeading() {
            if (letterIndex < headingText.length) {
                typingText.textContent +=
                    headingText.charAt(letterIndex);

                letterIndex++;

                setTimeout(typeHeading, 65);
            }
        }

        typeHeading();
    }
}


// =====================================
// 4. SCROLL REVEAL TRANSITIONS
// =====================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !reducedMotion) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });
} else {
    revealElements.forEach(element => {
        element.classList.add("show");
    });
}


// =====================================
// 5. SERVICE SEARCH
// =====================================

const serviceSearch = document.getElementById("serviceSearch");
const serviceCards = document.querySelectorAll(".service-card");
const noResults = document.getElementById("noResults");

if (serviceSearch) {
    serviceSearch.addEventListener("input", function () {
        const searchValue =
            serviceSearch.value.toLowerCase().trim();

        let visibleCards = 0;

        serviceCards.forEach(card => {
            const matches = card.textContent
                .toLowerCase()
                .includes(searchValue);

            card.style.display = matches ? "" : "none";

            if (matches) {
                visibleCards++;
            }
        });

        if (noResults) {
            noResults.style.display =
                visibleCards === 0 ? "block" : "none";
        }
    });
}


// =====================================
// 6. FAQ ACCORDION
// =====================================

document.querySelectorAll(".faq-question").forEach(question => {
    question.addEventListener("click", function () {
        const faqItem = question.closest(".faq-item");

        if (!faqItem) return;

        const wasOpen = faqItem.classList.contains("active");

        document.querySelectorAll(".faq-item").forEach(item => {
            item.classList.remove("active");

            const button = item.querySelector(".faq-question");

            if (button) {
                button.setAttribute("aria-expanded", "false");

                const symbol = button.querySelector(".faq-symbol");

                if (symbol) {
                    symbol.textContent = "+";
                }
            }
        });

        if (!wasOpen) {
            faqItem.classList.add("active");

            question.setAttribute("aria-expanded", "true");

            const symbol = question.querySelector(".faq-symbol");

            if (symbol) {
                symbol.textContent = "−";
            }
        }
    });
});


// =====================================
// 7. CONTACT FORM
// =====================================

const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const response = document.getElementById("response");
const charCount = document.getElementById("charCount");

if (messageInput && charCount) {
    messageInput.addEventListener("input", function () {
        charCount.textContent =
            messageInput.value.length + " / 500 characters";
    });
}

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (name.length < 2) {
            response.textContent = "Please enter a valid name.";
            response.style.color = "#b42318";
            nameInput.focus();
            return;
        }

        if (!emailPattern.test(email)) {
            response.textContent =
                "Please enter a valid email address.";

            response.style.color = "#b42318";
            emailInput.focus();
            return;
        }

        if (!message || message.length > 500) {
            response.textContent =
                "Please enter a message between 1 and 500 characters.";

            response.style.color = "#b42318";
            messageInput.focus();
            return;
        }

        // Frontend validation only.
        // This form does not send an email yet.

        response.textContent =
            "Thank you, " + name +
            "! Your details have been validated. Please contact NOUR directly to submit your enquiry.";

        response.style.color = "#245c3a";

        contactForm.reset();

        if (charCount) {
            charCount.textContent = "0 / 500 characters";
        }
    });
}


// =====================================
// 8. BACK TO TOP
// =====================================

const backToTop = document.getElementById("backToTop");

if (backToTop) {
    window.addEventListener("scroll", function () {
        backToTop.style.display =
            window.scrollY > 300 ? "block" : "none";
    });

    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: reducedMotion ? "auto" : "smooth"
        });
    });
}


// =====================================
// 9. CURRENT YEAR
// =====================================

const copyright = document.querySelector(".copyright");

if (copyright) {
    copyright.textContent =
        "© " + new Date().getFullYear() +
        " NOUR Business Solutions. All Rights Reserved.";
}


// =====================================
// 10. CHATBOT ELEMENTS
// =====================================

const chatToggle = document.getElementById("chat-toggle");
const chatContainer = document.getElementById("chatbotContainer");
const closeChat = document.getElementById("close-chat");

const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const chatMessages = document.getElementById("chat-messages");
const chatStatus = document.getElementById("chatStatus");


// =====================================
// 11. OPEN AND CLOSE CHATBOT
// =====================================

function openChat() {
    if (!chatContainer) return;

    chatContainer.style.display = "block";
    chatContainer.classList.remove("opening");

    // Restart opening animation
    void chatContainer.offsetWidth;

    chatContainer.classList.add("opening");

    if (chatToggle) {
        chatToggle.style.display = "none";
    }

    if (userInput) {
        userInput.focus();
    }
}

function closeChatWindow() {
    if (!chatContainer) return;

    chatContainer.style.display = "none";

    if (chatToggle) {
        chatToggle.style.display = "block";
    }
}

if (chatToggle) {
    chatToggle.addEventListener("click", openChat);
}

if (closeChat) {
    closeChat.addEventListener("click", closeChatWindow);
}


// =====================================
// 12. DISPLAY CHAT MESSAGES
// =====================================

function addMessage(message, className) {
    if (!chatMessages) return null;

    const messageElement = document.createElement("div");

    messageElement.className = className;
    messageElement.textContent = message;

    chatMessages.appendChild(messageElement);

    chatMessages.scrollTop = chatMessages.scrollHeight;

    return messageElement;
}


// =====================================
// 13. SEND MESSAGE TO NOUR BACKEND
// =====================================

async function sendMessage(message) {
    const cleanMessage = message.trim();

    if (!cleanMessage) return;

    if (cleanMessage.length > 1000) {
        addMessage(
            "Please keep your message under 1000 characters.",
            "bot-message"
        );
        return;
    }

    if (!isValidApiUrl(API_URL)) {
        addMessage(
            "The chatbot URL is invalid. Please check your API_URL.",
            "bot-message"
        );
        return;
    }

    addMessage(cleanMessage, "user-message");

    const loadingMessage = addMessage(
        "NOUR is typing...",
        "bot-message"
    );

    if (sendBtn) {
        sendBtn.disabled = true;
    }

    if (chatStatus) {
        chatStatus.textContent = "Connecting to NOUR...";
    }

    const controller = new AbortController();

    const timeout = setTimeout(() => {
        controller.abort();
    }, 30000);

    try {
        const response = await fetch(
            API_URL.replace(/\/+$/, "") + "/chat",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: cleanMessage
                }),
                signal: controller.signal
            }
        );

        if (!response.ok) {
            throw new Error("Server error: " + response.status);
        }

        const data = await response.json();

        const reply =
            data.reply ||
            data.response ||
            data.message;

        if (!reply) {
            throw new Error("The server returned no reply.");
        }

        if (loadingMessage) {
            loadingMessage.textContent = reply;
        }

        if (chatStatus) {
            chatStatus.textContent = "NOUR is online";
        }

    } catch (error) {
        console.error("NOUR Chatbot Error:", error);

        let errorMessage =
            "Sorry, I cannot connect to NOUR right now. Please try again.";

        if (error.name === "AbortError") {
            errorMessage =
                "NOUR is taking too long to respond. Please try again.";
        }

        if (loadingMessage) {
            loadingMessage.textContent = errorMessage;
        }

        if (chatStatus) {
            chatStatus.textContent = "Connection problem";
        }

    } finally {
        clearTimeout(timeout);

        if (sendBtn) {
            sendBtn.disabled = false;
        }

        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
}


// =====================================
// 14. SEND BUTTON AND ENTER KEY
// =====================================

if (sendBtn && userInput) {
    sendBtn.addEventListener("click", function () {
        const message = userInput.value.trim();

        if (!message) return;

        userInput.value = "";

        sendMessage(message);
    });

    userInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendBtn.click();
        }
    });
}
