import React, { useState } from "react";
import { addDoc, collection, doc, Timestamp,getDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const categories = ["Health", "Electronics", "Travel","Education","Books","Others"];

const CreateExpense = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    date: "",
    category: "",
    description:"",
    amount:"",
    error:"",
    loading: false,
  });
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

    if(amount==="" || name ==="" || category==="" || description==="" ||date===""){
      setValues({...values,error:"All Fields are Required",loading:false})
      return;
    }

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

      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      const temp=docSnap.data().name;

      const result = await addDoc(collection(db, "expenses"), {
        name: name,
        description,
        category,
        amount: Number(amount),
        date:date,
        updatedAt: Timestamp.fromDate(new Date()),
        postedBy: auth.currentUser.uid,
        userName:temp
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
      <h3 className="text-center mb-3">Create New Expense</h3>


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
          className="form-control"
          name="description"
          value={description}
          onChange={handleChange}
        />
      </div>


      <div className="mb-3">
        <select name="category" className="form-select" placeholder="Select Category of Expense" onChange={handleChange}>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option value={category} key={category}>
              {category}
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
          Create
        </button>
      </div>
    </form>
  );
};

export default CreateExpense;
