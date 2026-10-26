const themeButton = document.getElementById("theme");
const body = document.body;

// Check whether the visitor has previously selected a theme.
const savedTheme = localStorage.getItem("webdev-theme");

// Check the operating system's preferred theme.
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

// Choose the saved theme, or fall back to the system preference.
const initialTheme =
    savedTheme || (prefersDark.matches ? "dark" : "light");

// Apply the selected theme.
function applyTheme(theme, savePreference = false) {
    const isDark = theme === "dark";

    body.classList.toggle("dark", isDark);

    // Update the button to describe the action it will perform.
    themeButton.textContent = isDark
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";

    // Improve accessibility for screen-reader users.
    themeButton.setAttribute(
        "aria-label",
        `Switch to ${isDark ? "light" : "dark"} mode`
    );

    themeButton.setAttribute("aria-pressed", String(isDark));

    // Save the user's explicit choice.
    if (savePreference) {
        localStorage.setItem("webdev-theme", theme);
    }
}

// Set the initial theme when the page loads.
applyTheme(initialTheme);

// Toggle the theme when the button is clicked.
themeButton.addEventListener("click", () => {
    const nextTheme = body.classList.contains("dark")
        ? "light"
        : "dark";

    applyTheme(nextTheme, true);
});