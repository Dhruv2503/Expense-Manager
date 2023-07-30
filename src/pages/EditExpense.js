import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
  Timestamp
} from "firebase/firestore";
import { db} from "../firebaseConfig";

const categories = ["Health", "Electronics", "Travel","Education","Books","Others"];

const EditExpense = () => {
  const navigate = useNavigate();
  const {id}=useParams();
  
  const [values, setValues] = useState({
    name: "",
    date: "",
    category: "",
    description: "",
    amount:"",
    error:"",
    loading: "",
  });

  const getExpense=async ()=>{
    const docRef = doc(db, "expenses", id);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        setValues({ ...values,
        error: "",
        name:docSnap.data().name,
        date:docSnap.data().date,
        category:docSnap.data().category,
        description:docSnap.data().description,
        amount:docSnap.data().amount,
        publishedAt: Timestamp.fromDate(new Date()),
        });
    }
}
  useEffect(()=>{
    getExpense();
   // eslint-disable-next-line
   // eslint-disable-next-line
  },[])

  const {
    error,
    name,
    date,
    category,
    description,
    amount,
    loading,
  } = values;

  const handleChange = (e) =>{
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(amount<0){
      setValues({...values,error:"Amount cannot be negative",loading:false})
      return;
    }
    if(name.length>140){
        setValues({...values,error:"Name of Expense cannot be more then 140 characters",loading:false})
        return;
    }

    setValues({ ...values, error: "", loading: true });

    try {
    await updateDoc(doc(db, "expenses", id), {
        name:name,
        description,
        category,
        amount:Number(amount),
        date:date,
        updatedAt: Timestamp.fromDate(new Date()),
      });

      setValues({
        name: "",
        category: "",
        amount: "",
        description: "",
        date: "",
        loading: false,
      });
      navigate("/");
    } catch (error) {
      setValues({ ...values, error: error.message, loading: false });
    }
  };
  return (
    <form className="form shadow rounded p-3 mt-5" onSubmit={handleSubmit}>
      <h3 className="text-center mb-3">Edit Expense</h3>


      <div className="mb-3">
        <label className="form-label" placeholder="Expense Name">Name</label>
        <textarea
          name="name"
          cols="30"
          rows="3"
          className="form-control"
          value={name}
          onChange={handleChange}
        ></textarea>
      </div>


      <div className="mb-3">
        <label className="form-label" placeholder="Description of Expense">Description</label>
        <input
          type="text"
          className="form-control gray-input"
          name="description"
          value={description}
          onChange={handleChange}
        />
      </div>


      <div className="mb-3">
        <select name="category" className="form-select" placeholder="Select Category of Expense"  value={category} onChange={handleChange}>
          <option >Select Category</option>
          {categories.map((cur) => (
            <option value={cur} key={cur} >
              {cur}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label" placeholder="Date of Expense">Date</label>
        <input
          type="date"
          className="form-control"
          name="date"
          value={date}
          onChange={handleChange}
        />
      </div>


      <div className="mb-3">
        <label className="form-label" placeholder="Expense Amount">Amount</label>
        <input
          type="number"
          className="form-control"
          name="amount"
          value={amount}
          onChange={handleChange}
        />
      </div>


      {error ? <p className="text-center text-danger">{error}</p> : null}


      <div className="mb-3 text-center">
        <button className="btn btn-secondary btn-sm" disabled={loading}>
          Update 
        </button>
      </div>
    </form>
  );
};

export default EditExpense;
