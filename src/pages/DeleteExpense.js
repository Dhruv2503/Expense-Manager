import React from 'react'
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { deleteDoc,doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const DeleteExpense = () => {
    const Navigate=useNavigate();
    const id=useParams();

    const handleNo=()=>{
        Navigate('/');
    }

const handleYes=async()=>{
    await deleteDoc(doc(db, "expenses", id.id));
    Navigate('/')
}

return (
    < div class="container d-flex align-items-center justify-content-center vh-90" style={{marginTop:"120px"}}>
    <div class="card " style={{width: '30rem',height:'10rem'}}>
    <div class="card-body">
      <h5 class="card-title">Delete Expense</h5>
      <p class="card-text">Are You Sure you want to delete this Expense</p>
      <button type="button" class="btn btn-primary card-link" onClick={handleNo}>No</button>
      <button type="button" class="btn btn-danger card-link" onClick={handleYes}>Yes,Delete</button>
    </div>
  </div>
  </div>
  )
}

export default DeleteExpense
