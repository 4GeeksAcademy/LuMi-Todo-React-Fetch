import React from "react"

function AddTaskForm({user, toggleChange, toggleAdd}){



    return <>
        <h1 className="text-center">User logged: {user}</h1>
        <div className="d-flex justify-content-center align-items-center mt-3 gap-1"> 
            <input className="rounded border border-black py-1 px-2" style={{width:"300px"}} name="label" onChange={toggleChange}></input>
            <button className="btn btn-light" onClick={toggleAdd}>Add task</button>
        </div>
    </>
}

export default AddTaskForm