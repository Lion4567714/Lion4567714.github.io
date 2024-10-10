let dark_mode = false;

const mode_button = document.getElementById("mode_button");
const style = document.getElementById("style");
const style2 = document.getElementById("style2");

mode_button.addEventListener("click", function() {
    if (dark_mode) {
        dark_mode = false;
        style.href = "/assets/css/light.css";
        style2.href = "/assets/css/light.css";
    } else {
        dark_mode = true;
        style.href = "/assets/css/dark.css";
        style2.href = "/assets/css/dark.css";
    }
});
