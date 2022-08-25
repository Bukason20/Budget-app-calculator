const budgetForm = document.querySelector("#budget-form");
const budgetValue = document.querySelector("#budget-value");
const expenseForm = document.querySelector("#expense-form");
const expenseValue = document.querySelector("#expenses-value");
const expenseList = document.querySelector("#expense-list")
const expenseTitle = document.querySelector("#expense-title");
const expense = document.querySelector("#expense");
const balance = document.querySelector("#balance-value")
const balancePrice = document.querySelector(".balance-price")

loadAllEventListener()

function loadAllEventListener(){
    budgetForm.addEventListener("submit", calculateBudget);

    expenseForm.addEventListener("submit", addExpense);

    expenseList.addEventListener("click", deleteExpense)
}


//Calculate Budget
function calculateBudget(e){

    const budget = document.querySelector("#budget")

    if(budget.value === ""){
        showAlert("Please Enter a Budget", "error")
    }else {
        budgetValue.innerHTML = budget.value

        showAlert("Budget Added", "success")

        // console.log("budget calculated")

        calculateResult()

    }
    
    
    //Clear input Field
    budget.value = ""
    
    e.preventDefault()
}

//Calculate Expense
function addExpense(e){
    
    const expenseList = document.querySelector("#expense-list");
    const expenseAmounts = document.querySelectorAll(".expense-amount");
    let table = document.querySelector(".expense-details");

    // let expenseArr = Array.from(expenseAmounts)
    let sumVal = 0;

    if(expenseTitle.value === "" || expense.value === ""){
        showAlert("Plear Fill in the Expense Form", "error")
    }else {
        //Create the Row
        const row = document.createElement("tr")

        //Create row data
        row.innerHTML =`
            <td>-  ${expenseTitle.value.toUpperCase()}</td>
            <td class = "expense-price">₦ <span class = "expense-amount"> ${expense.value}</span></td>
         <td> <img src = "icons/garbage.png" class = "delete"></td>
        `
        
        //Appepnd row to Table
        expenseList.appendChild(row)

        // showAlert("Expense Added", "success")

        // Total of the Expense Amoumt
        const expenseAmounts = document.querySelectorAll(".expense-amount");
        // console.log(expenseAmounts)
        
        for (let i = 0; i < expenseAmounts.length; i++){
            sumVal = sumVal + parseFloat(expenseAmounts[i].innerHTML)
            
            
        }
        // console.log(sumVal)
        expenseValue.innerHTML = sumVal


        expenseTitle.value = ""
        expense.value = ""
    }

    calculateResult()
   
    e.preventDefault()
}


//Function Delete Expense
function deleteExpense(e){
    if (e.target.className === "delete"){
        // console.log("delete")
        e.target.parentElement.parentElement.remove();

        let diff = e.target.parentElement.previousElementSibling.children[0].innerHTML

        let ans = parseFloat(expenseValue.innerHTML) - parseFloat(diff)

        expenseValue.innerHTML = ans

        showAlert("Expense removed", "success")

        calculateResult()
    }
}

// Calculate Balance
function calculateResult(){
    const result = (parseFloat(budgetValue.innerHTML) - parseFloat(expenseValue.innerHTML))

    balance.innerHTML = result

    if(balance.innerHTML > 0){
        balancePrice.style.color = "green"
    }else if(balance.innerHTML < 0){
        balancePrice.style.color = "red"
    }else {
        balancePrice.style.color = "black"
    }

}

// Show Alert
function showAlert(message, className){
    //Create div
    const div = document.createElement("div")

    div.className = `alert ${className}`

    div.innerHTML = `${message}`

    const container = document.querySelector(".container");

    const upperPart = document.querySelector(".upper-part");

    container.insertBefore(div, upperPart)

    setTimeout(function(){
        document.querySelector(".alert").remove()
    }, 2000)
}






