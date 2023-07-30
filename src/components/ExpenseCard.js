import React from 'react'
import Moment from "react-moment";
import { auth } from '../firebaseConfig';
import {FaTrashAlt} from "react-icons/fa";
import {MdOutlineEdit} from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom';

const ExpenseCard = (props) => {
  const Navigate=useNavigate()
  const {
    name,
    category,
    date,
    amount,
    updatedAt,
    postedBy,
    userName
  }=props.expense
  const deleteLink=`/delete-expense/${props.expense.id}`;
  const editLink=`/edit-expense/${props.expense.id}`;

  return (
    <tr>
          <td style={{paddingLeft:"40px"}}>{name}</td>
          <td>{category}</td>
          <td>{date}</td>
          <td>{amount}</td>
          <td><Moment fromNow>{updatedAt.toDate()}</Moment></td>
          <td>{postedBy===auth.currentUser.uid?"ME":userName}</td>
          <td>
          {postedBy === auth.currentUser?.uid && (
            <Link to={deleteLink}>
                <FaTrashAlt
                    size={30}
                    className="text-danger"
                />
            </Link>
            )}
          </td>
          <td>
           {postedBy === auth.currentUser?.uid && (
            <Link to={editLink}>
                <MdOutlineEdit
                    size={30}
                    className="text-danger"
                />
            </Link>
            )}
          </td>

    </tr>  
  )
}

export default ExpenseCard
