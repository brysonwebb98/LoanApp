document.addEventListener("DOMContentLoaded", () => {
    const debtRadios = document.querySelectorAll('input[name="has_debt"]');
    const debtSection = document.getElementById("debt-section");

    debtRadios.forEach(radio => {
        radio.addEventListener("change", function () {
            if (this.value === "yes") {
                debtSection.style.display = "block";
            } else {
                debtSection.style.display = "none";
            }
        });
    });
});