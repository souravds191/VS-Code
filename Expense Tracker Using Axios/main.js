function saveToAxios(event){
    event.preventDefault();
    const expense = event.target.expense.value;
    const amount = event.target.amount.value;
    const obj={
        expense,
        amount
    }
    axios.post("https://crudcrud.com/api/f36041ad6fe24a2dbf440f0d0883ba56/expenseData", obj)
    .then(response=>{
        showOnScreen(response.data)
        console.log(response)
    })
    .catch(err=>{
        document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>"
        console.log(err)
    })
}
window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/f36041ad6fe24a2dbf440f0d0883ba56/expenseData")
    .then(response=>{
        for(var i=0;i<response.data.length;i++){
            showOnScreen(response.data[i])
        }

    })
    .catch(err=>{
        document.body.innerHTML=document.body.innerHTML+"<h4>Something Wrong</h4>";
    })
})

function showOnScreen(user){
    // const user1={
    //     _id:'',
    //     expense:'',
    //     amount:''
    // }
    document.getElementById('expense').value='';
    document.getElementById('amount').value='';
    parentNode=document.getElementById('expenseList');
    childHTML=`<li id=${user._id}> ${user.expense}--${user.amount}
                <button onclick=deleteExpense('${user._id}')>Delete</button>
                <button onclick=editExpense('${user.expense}','${user.amount}','${user._id}')>Edit</button>
                </li>`
    parentNode.innerHTML=parentNode.innerHTML+childHTML;
}

function editExpense(expense,amount,userId){
    document.getElementById('expense').value=expense;
    document.getElementById('amount').value=amount;
    deleteExpense(userId)
}

function deleteExpense(userId){
    axios.delete(`https://crudcrud.com/api/f36041ad6fe24a2dbf440f0d0883ba56/expenseData/${userId}`)
    .then(()=>{

        removeFromScreen(userId)
        
    })
    .catch((err)=>{
        console.log(err);
    })
}

function removeFromScreen(userId){
    const parentNode =document.getElementById('expenseList');
    const childNodeToBeDeleted =document.getElementById(userId);
    if(childNodeToBeDeleted){
        parentNode.removeChild(childNodeToBeDeleted);
    }
}