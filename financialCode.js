document.addEventListener('DOMContentLoaded', () => {
        // Show the finance section by default
        document.getElementById('finance').style.display = 'block';
    });

    function goToWelcome() {
        window.location.href = 'welcome.html';
    }

    function showSubsection(sectionId, subsectionId) {
        const section = document.getElementById(sectionId);
        const subsections = section.querySelectorAll('.finance-subsection');
        subsections.forEach(subsection => {
            subsection.classList.remove('active');
        });
        document.getElementById(subsectionId).classList.add('active');
    }

    function goToBankingInstitution() {
        showSubsection('finance', 'finance-banking-institution-screen');
    }

    function goToCreditBureau() {
        showSubsection('finance', 'finance-credit-bureau-screen');
    }

    function goToBrokerageFirm() {
        showSubsection('finance', 'finance-brokerage-firm-screen');
    }

    function goToFinanceApps() {
        showSubsection('finance', 'finance-finance-apps-screen');
    }

    function transferFunds() {
        const sourceAccount = document.getElementById('finance-source-account').value;
        const destinationAccount = document.getElementById('finance-destination-account').value;
        const amount = document.getElementById('finance-transfer-amount').value;
        // Placeholder for transfer logic
        document.getElementById('finance-transfer-confirmation').innerText = `Transferred $${amount} from ${sourceAccount} to ${destinationAccount}.`;
    }

    function disputeCreditReport() {
        // Placeholder for dispute logic
        alert('Dispute submitted.');
    }

    function newTrade() {
        // Placeholder for new trade logic
        alert('New trade initiated.');
    }

    function addExpense() {
        // Placeholder for add expense logic
        alert('Expense added.');
    }

    function adjustBudget() {
        const budgetAmounts = document.getElementById('finance-budget-amounts').value;
        // Placeholder for adjust budget logic
        alert(`Budget adjusted to $${budgetAmounts}.`);
    }

    // Expandable sections for Credit Report
    document.querySelectorAll('.finance-expandable-section h3').forEach(header => {
        header.addEventListener('click', () => {
            const section = header.parentElement;
            section.classList.toggle('active');
        });
    });