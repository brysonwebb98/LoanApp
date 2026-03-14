document.addEventListener("DOMContentLoaded", () => {
    const debtRadios = document.querySelectorAll('input[name="has_debt"]');
    const debtSection = document.getElementById("debt-section");
    const addDebtBtn = document.getElementById("add-debt");
    const debtContainer = document.getElementById("debt-container");

    debtRadios.forEach(radio => {
        radio.addEventListener("change", function () {
            if (this.value === "yes") {
                debtSection.style.display = "block";
            } else {
                debtSection.style.display = "none";
            }
        });
    });

    if (addDebtBtn) {
        addDebtBtn.addEventListener("click", () => {
            const newDebt = document.createElement("div");
            newDebt.classList.add("debt-entry");

            newDebt.innerHTML = `
                <hr>
                <div class="form-group">
                    <label>Debt Type</label>
                    <select name="debt_type">
                        <option value="">Select</option>
                        <option value="credit_card">Credit Card</option>
                        <option value="auto_loan">Auto Loan</option>
                        <option value="student_loan">Student Loan</option>
                        <option value="mortgage">Mortgage</option>
                        <option value="personal_loan">Personal Loan</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Creditor Name</label>
                    <input type="text" name="creditor_name">
                </div>

                <div class="form-group">
                    <label>Monthly Payment</label>
                    <input type="number" name="monthly_payment" step="0.01">
                </div>

                <div class="form-group">
                    <label>Balance Outstanding</label>
                    <input type="number" name="balance_outstanding" step="0.01">
                </div>
            `;

            debtContainer.appendChild(newDebt);
        });
    }
});