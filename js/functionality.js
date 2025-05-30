
let theList = [];
let windowH = window.innerHeight;
let windowW = window.innerWidth;
let email = "your@email.com";
let budgetData = [];
let currentMonth = timeStamp().substring(5, 7);

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//const monthsNum = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
let monthsHTML = "";

for (let i = 0; i < months.length; i++) {
    let monthNum = i + 1;
    let selectedMo = "";

    if (monthNum < 10) {
        monthNum = "0" + monthNum;
    }
    if (currentMonth === monthNum) {
        selectedMo = " selected "
    }
    monthsHTML = monthsHTML + "<option value='" + monthNum + "' " + selectedMo + ">" + months[i] + "</option>";
}

[].forEach.call(document.querySelectorAll("[name='month']"), (e) => {
    e.innerHTML = monthsHTML;
});
const theDate = new Date();
let theYear = theDate.getFullYear();
theYear = parseFloat(theYear);

let yearsHTML = "<option value='" + theYear + "'>" + theYear + "</option>";
for (let i = 0; i < 9; i++) {
    yearsHTML = yearsHTML + "<option value='" + (theYear - i) + "'>" + (theYear - i) + "</option>";

}

[].forEach.call(document.querySelectorAll("[name='year']"), (e) => {
    e.innerHTML = yearsHTML;
});

//let revenueList = [];
//let expenseList = [];
let hideShowBalance = true;
let series = [];
let categories = [];
let revenueLabels = [];
let expenseLabels = [];
let expenseAmounts = [];
let revenueAmounts = [];
let monthMenu = "January";
let yearMenu = "2022";
let dataLocation = "local";



const buildList = (data) => {/*BUILDS MAIN BUDGET LIST OF EXPENSES OR REVENUE*/
    document.getElementById("listATarget").innerHTML = "";
    document.getElementById("listBTarget").innerHTML = "";
    document.getElementById("analyzeTotal").innerHTML = 0;
    document.getElementById("listATotal").innerHTML = "$0";
    document.getElementById("listBTotal").innerHTML = "$0";

    Validate(["email"]);
    let prepObj = [];
    if (document.querySelector(".error")) {
        globalAlert("alert-warning", "Please fill out your email.");
        return false;
    }

    document.getElementById("expenseTarget").innerHTML = "";
    document.getElementById("revenueTarget").innerHTML = "";
    localStorage.setItem("lastBudgetTask", document.getElementById("taskTarget").value);

    if (!data) {
        let searchfor = localStorage.getItem(document.querySelector("[name='email']").value + ":BUDGET:" + document.getElementById("taskTarget").value);

        data = JSON.parse(searchfor);
    }

    revenueLabels = [];
    expenseLabels = [];
    expenseAmounts = [];
    revenueAmounts = [];
    let balance = 0;
    let analyzeTotalExpenses = 0;
    let expenseListHTML = "";
    let revenueListHTML = "";
    let whichMonth = document.querySelector("[name='month']").value;
    let whichYear = document.querySelector("[name='year']").value;

    if (data.length === undefined) {
        prepObj.push(data);
        data = prepObj;
    }
    try {
        let listATotal = 0;
        for (let i = 0; i < data.length; i++) {

            if (data[i].itemId.substring(0, 7) === whichYear + "-" + whichMonth) {
                if (data[i].itemAmount < 0) {
                    if (expenseLabels.indexOf(data[i].itemName) === -1) {
                        expenseAmounts.push(data[i].itemAmount);
                        expenseLabels.push(data[i].itemName);
                        expenseListHTML = expenseListHTML + `<li class="list-group-item list-group-item-danger"><button class="btn btn-danger btn-sm" onClick="removeItem('${i}')"><i class="far fa-trash-alt"></i></button> ${data[i].itemName}: $${data[i].itemAmount} </li>`;
                        let newExpense = data[i].itemAmount * 100

                        analyzeTotalExpenses = analyzeTotalExpenses * 100;
                        analyzeTotalExpenses = (newExpense + analyzeTotalExpenses) / 100;

                    }

                } else {
                    if (revenueLabels.indexOf(data[i].itemName) === -1) {
                        revenueAmounts.push(data[i].itemAmount);
                        revenueLabels.push(data[i].itemName);
                        revenueListHTML = revenueListHTML + `<li class="list-group-item list-group-item-success"><button class="btn btn-danger btn-sm"  onClick="removeItem('${i}')"><i class="far fa-trash-alt"></i></button> ${data[i].itemName}: $${data[i].itemAmount} </li>`;
                        //listA
                        let newRevenue = data[i].itemAmount * 100

                        listATotal = listATotal * 100;
                        listATotal = (newRevenue + listATotal) / 100;
                    }
                }
                let pennies = data[i].itemAmount * 100;
                let penniesBalance = balance * 100;
                balance = (pennies + penniesBalance) / 100;



            }
        }
        document.getElementById("analyzeTotalExpenses").innerHTML = analyzeTotalExpenses.toFixed(2);
        document.getElementById("analyzeTotal").innerHTML = listATotal.toFixed(2);
        document.getElementById("listATotal").innerHTML = listATotal.toFixed(2);

        updatePie([{ amounts: revenueAmounts, labels: revenueLabels }], [{ amounts: [], labels: [] }]);


    } catch (error) {
        console.log("No data yet: " + error);
    }
    document.getElementById("balanceTarget").innerHTML = parseFloat(balance).toFixed(2);
    document.getElementById("expenseTarget").innerHTML = expenseListHTML;
    document.getElementById("revenueTarget").innerHTML = revenueListHTML;


}


const removeItem = (whichItem) => {
    let tempBudgetData = [];
    let ticketData = JSON.parse(localStorage.getItem(document.querySelector("[name='email']").value + ":BUDGET:" + document.getElementById("taskTarget").value));

    for (let i = 0; i < ticketData.length; i++) {
        if (i !== Number(whichItem)) {
            tempBudgetData.push(ticketData[i]);
        }
    }

    budgetData = tempBudgetData;
    localStorage.setItem(document.querySelector("[name='email']").value + ":BUDGET:" + document.getElementById("taskTarget").value, JSON.stringify(tempBudgetData));
    buildList(tempBudgetData);
}





const appendToList = () => {
    Validate(["itemName", "itemAmount", "email"]);
    if (document.querySelector(".error")) {
        globalAlert("alert-warning", "Your form needs more information.");
        return false;
    }
    email = document.querySelector("[name='email']").value;
    localStorage.setItem("emailBudget", email);

    let taskAssigned = "default";
    if (document.getElementById("taskTarget").value !== "default") {
        taskAssigned = document.getElementById("taskTarget").value;
    }

    let entryDate = document.querySelector("[name='year']").value + "-" + document.querySelector("[name='month']").value + "-" + timeStamp().substring(8, 10);
    console.log("entryDate: " + entryDate)

    let itemId = entryDate + ":" + email + ":" + taskAssigned;/*miltiple items share itemId. this is how you know where they belong*/

    let itemName = document.querySelector("input[name='itemName']").value;
    let tempPlusMinus = "";

    if (document.querySelector("input[name='itemAmount']").dataset.plusminus === "minus") {/*place a negative symbol in front of expenses*/
        tempPlusMinus = "-";
    }

    let itemAmount = Number(tempPlusMinus + document.querySelector("input[name='itemAmount']").value);

    budgetData = [];
    let prepObj = [];
    if (localStorage.getItem(email + ":BUDGET:" + document.getElementById("taskTarget").value)) {
        budgetData = JSON.parse(localStorage.getItem(email + ":BUDGET:" + document.getElementById("taskTarget").value));
        if (budgetData.length === undefined) {
            prepObj.push(budgetData);
            budgetData = prepObj;
        }
    }

    budgetData.push({ itemId, itemName, itemAmount });
    // localStorage.setItem("budgetData", JSON.stringify(budgetData));
    localStorage.setItem(email + ":BUDGET:" + document.getElementById("taskTarget").value, JSON.stringify(budgetData));


    buildList(budgetData);
    document.querySelector("input[name='itemName']").value = "";
    document.querySelector("input[name='itemAmount']").value = "";

}



if (localStorage.getItem("emailBudget")) {/*see if there is a saved previuos email*/
    email = localStorage.getItem("emailBudget");
    document.querySelector("[name='email']").value = email;
    if (localStorage.getItem(localStorage.getItem("emailBudget") + ":BUDGET:" + document.getElementById("taskTarget").value)) {
        budgetData = JSON.parse(localStorage.getItem(localStorage.getItem("emailBudget") + ":BUDGET:" + document.getElementById("taskTarget").value));
        buildList(budgetData);
    }
}


const plusMinus = (which) => {
    document.querySelector("[name='itemAmount']").dataset.plusminus = which;
    let plusMinusMessage = "REVENUE: You're in adding mode.";
    if (which === 'minus') {
        plusMinusMessage = "EXPENSE: You're in subtracting mode.";
        document.querySelector("[data-button='minus']").classList.add("active");
        document.querySelector("[data-button='plus']").classList.remove("active");
    }
    document.querySelector("[ name='itemAmount']").setAttribute("placeholder", plusMinusMessage)
    if (which === "plus") {
        document.querySelector("[data-button='minus']").classList.remove("active");
        document.querySelector("[data-button='plus']").classList.add("active");
    }

}



const analyze = (analyzeWhich) => {
    if (analyzeWhich === "revenue") {
        updatePie([{ labels: revenueLabels, amounts: revenueAmounts }], [{ labels: [], amounts: [] }]);
        document.querySelector("button[data-analyze='revenue']").classList.add("active");
        document.querySelector("button[data-analyze='expenses']").classList.remove("active");
    } else {
        for (let i = 0; i < expenseAmounts.length; i++) {
            expenseAmounts[i] = expenseAmounts[i].toString();

            if (expenseAmounts[i][0] === "-") {
                expenseAmounts[i] = expenseAmounts[i].substring(1, expenseAmounts[i].length);
                console.log("new number: " + expenseAmounts[i])
            } expenseAmounts[i] = Number(expenseAmounts[i])
        }
        updatePie([{ labels: expenseLabels, amounts: expenseAmounts }], [{ labels: [], amounts: [] }]);
        document.querySelector("button[data-analyze='revenue']").classList.add("active");
        document.querySelector("button[data-analyze='expenses']").classList.remove("active");
    }
}

analyze("revenue");
buildTaskMenu();/*shared functinality from the task master for task menu population*/