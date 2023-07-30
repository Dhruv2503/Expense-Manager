import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { collection,  query, getDocs, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

import ExpenseCard from "../components/ExpenseCard"

const Home = () => {
  const Navigate=useNavigate();
  const handleCreateExpense=()=>{
    Navigate('/create-expense')
  }
  const [expenses, setExpenses] = useState([]);
  const [filters,setFilters]=useState({
    filterDate:"",
    filterName:""
  })

  const {
    filterDate,
    filterName
  }=filters


  const handleChange = (e) =>{
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }

  const getExpense= async()=>{
    const expenseRef = collection(db, "expenses");
    let local=[];

    if(filterDate==="" && filterName===""){
      const docsnap=await getDocs(expenseRef);
      docsnap.forEach(doc => {
          local.push({...doc.data(),id:doc.id})
      })
     setExpenses(local);
     return;
    }

    let q;

    if(filterDate!=="" && filterName===""){
      q = query(
        expenseRef,
        where("date", "==", filterDate),
      );
    }else if(filterName!=="" && filterDate===""){
      q=query(
        expenseRef,
        where("name","==",filterName)
      )
    }else{
      q=query(
        expenseRef,
        where("name","==",filterName),
        where("date","==",filterDate)
      )
    }
    const expensesDoc = await getDocs(q);
    expensesDoc.forEach((doc) => local.push({ ...doc.data() ,id:doc.id}));

    setExpenses(local);
  }

  useEffect(()=>{
    getExpense();
  },[filters])

  return (
    <>
      <h3 className="text-4xl font-bold text-center mt-10">
        My Expense Manager
      </h3>

      <div style={{marginLeft:"180px",marginTop:"20px"}}>
            <h4>Filters</h4>
      </div>

      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <input type="text" className="form-control mr-2" style={{marginLeft:"20px"}} placeholder="Search By Name"  name="filterName" value={filterName} onChange={handleChange}/>
          <input type="date" className="form-control"  style={{marginLeft:"20px"}} placeholder="Search By Date" name="filterDate" value={filterDate} onChange={handleChange}/>
        </div>
        <button className="btn btn-primary" style={{marginRight:"40px"}} onClick={handleCreateExpense}>Create New Expense</button>
      </div>
    


    <table className="table table-hover table-striped" style={{marginTop:"20px"}} >
    <thead>
    <tr>
      <th scope="col" style={{paddingLeft:"40px"}}>Name</th>
      <th scope="col">Category</th>
      <th scope="col">Date of Expense</th>
      <th scope="col">Amount</th>
      <th scope="col">Updated At</th>
      <th scope="col">Created By</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
    </thead>
    {expenses.map((expense)=>{
      return <tbody key={expense.id}><ExpenseCard expense={expense}/></tbody> 
    })}
    </table>

    </>
  )
}

export default Home