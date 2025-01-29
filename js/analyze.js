
let theList = [];
let windowH = window.innerHeight;
let windowW = window.innerWidth;
let email = "your@email.com";
let budgetData = [];

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//const monthsNum = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
let monthsHTML = "";
for (let i = 0; i < months.length; i++) {
    let monthNum = i + 1;
    if (monthNum < 10) {
        monthNum = "0" + monthNum;
    }
    monthsHTML = monthsHTML + "<option value='" + monthNum + "'>" + months[i] + "</option>";
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

const buildList = (data) => {
    Validate(["email"]);
    if (document.querySelector(".error")) {
        globalAlert("alert-warning", "Please fill out your email.");
        return false;
    }
    document.getElementById("expenseTarget").innerHTML = "";
    document.getElementById("revenueTarget").innerHTML = "";
    localStorage.setItem("lastBudgetTask", document.getElementById("taskTarget").value);
    console.log("data: " + JSON.stringify(data))
    if (!data) {
        let searchfor = localStorage.getItem(document.querySelector("[name='email']").value + ":BUDGET:" + document.getElementById("taskTarget").value);
        console.log("searchfor: " + searchfor)
        data = JSON.parse(searchfor);
    }
    console.log("after: " + JSON.stringify(data))

    let balance = 0;
    let expenseListHTML = "";
    let revenueListHTML = "";
    let whichMonth = document.querySelector("[name='month']").value;
    let whichYear = document.querySelector("[name='year']").value;
    try {


        for (let i = 0; i < data.length; i++) {

            if (data[i].itemId.substring(0, 7) === whichYear + "-" + whichMonth) {



                if (data[i].itemAmount < 0) {

                    expenseAmounts.push(data[i].itemAmount);
                    expenseLabels.push(data[i].itemName);
                    //revenueTarget
                    expenseListHTML = expenseListHTML + `<li class="list-group-item list-group-item-danger"><button class="btn btn-danger btn-sm" onClick="removeItem('${i}')"><i class="far fa-trash-alt"></i></button> ${data[i].itemName}: $${data[i].itemAmount} </li>`;


                } else {
                    revenueAmounts.push(data[i].itemAmount);
                    revenueLabels.push(data[i].itemName);
                    revenueListHTML = revenueListHTML + `<li class="list-group-item list-group-item-success"><button class="btn btn-danger btn-sm"  onClick="removeItem('${i}')"><i class="far fa-trash-alt"></i></button> ${data[i].itemName}: $${data[i].itemAmount} </li>`;


                }
                let pennies = data[i].itemAmount * 100;
                let penniesBalance = balance * 100;
                balance = (pennies + penniesBalance) / 100;
            }
        }
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
    let itemId = timeStamp() + ":" + email + ":" + taskAssigned;

    let itemName = document.querySelector("input[name='itemName']").value;
    let tempPlusMinus = "";
    console.log("document.querySelector(input[name = 'itemAmount']).dataset.plusminus: " + document.querySelector("input[name='itemAmount']").dataset.plusminus)
    if (document.querySelector("input[name='itemAmount']").dataset.plusminus === "minus") {
        tempPlusMinus = "-";
    }

    let itemAmount = Number(tempPlusMinus + document.querySelector("input[name='itemAmount']").value);

    budgetData = [];
    if (localStorage.getItem(email + ":BUDGET:" + document.getElementById("taskTarget").value)) {
        budgetData = JSON.parse(localStorage.getItem(email + ":BUDGET:" + document.getElementById("taskTarget").value));
    }

    budgetData = [...budgetData, { itemId, itemName, itemAmount }];
    // localStorage.setItem("budgetData", JSON.stringify(budgetData));
    localStorage.setItem(email + ":BUDGET:" + document.getElementById("taskTarget").value, JSON.stringify(budgetData));
    buildList(budgetData);
    document.querySelector("input[name='itemName']").value = "";
    document.querySelector("input[name='itemAmount']").value = "";

}

if (localStorage.getItem("emailBudget")) {
    email = localStorage.getItem("emailBudget");
    document.querySelector("[name='email']").value = email;
    if (localStorage.getItem(localStorage.getItem("emailBudget") + ":BUDGET:" + document.getElementById("taskTarget").value)) {
        budgetData = JSON.parse(localStorage.getItem(localStorage.getItem("emailBudget") + ":BUDGET:" + document.getElementById("taskTarget").value));
        buildList(budgetData);
    }
}


const plusMinus = (which) => {
    document.querySelector("[name='itemAmount']").dataset.plusminus = which;
    let plusMinusMessage = "REVENUE: Your in adding mode. ";
    if (which === 'minus') {
        plusMinusMessage = "EXPENSE: Your in subtracting mode.";
    }
    document.querySelector("[ name='itemAmount']").setAttribute("placeholder", plusMinusMessage)
    if (which === "plus") {
        document.querySelector("[data-button='minus']").classList.remove("active");
        document.querySelector("[data-button='plus']").classList.add("active");
    } else {
        document.querySelector("[data-button='minus']").classList.add("active");
        document.querySelector("[data-button='plus']").classList.remove("active");
    }
}

buildTaskMenu();