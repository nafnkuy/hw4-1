document.addEventListener("DOMContentLoaded", loadExpenses);

function addExpense(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;

    if (!title || !amount || !date) {
        alert("กรุณากรอกข้อมูลให้ครบ");
        return;
    }

    const expense = {
        id: Date.now(),
        title,
        amount,
        category,
        date
    };

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    document.getElementById("expenseForm").reset();
    loadExpenses();
}

function loadExpenses() {
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const expenseList = document.getElementById("expenseList");
    const totalByCategory = document.getElementById("totalByCategory");

    expenseList.innerHTML = "";
    totalByCategory.innerHTML = "";

    let categoryTotals = {};

    expenses.forEach(expense => {
        const li = document.createElement("li");
        li.textContent = `${expense.title} - ${expense.amount} บาท (${expense.category}) [${expense.date}]`;
        li.className = "p-2 border rounded bg-gray-200";
        expenseList.appendChild(li);

        if (!categoryTotals[expense.category]) {
            categoryTotals[expense.category] = 0;
        }
        categoryTotals[expense.category] += expense.amount;
    });

    Object.keys(categoryTotals).forEach(category => {
        const li = document.createElement("li");
        li.textContent = `${category}: ${categoryTotals[category]} บาท`;
        li.className = "p-2 border rounded bg-blue-100";
        totalByCategory.appendChild(li);
    });
}

function clearExpenses() {
    localStorage.removeItem("expenses");
    loadExpenses();
}

document.getElementById("expenseForm").addEventListener("submit", addExpense);