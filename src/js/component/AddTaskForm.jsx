import React from "react"

function AddTaskForm({toggleChange, toggleAdd, toggleDeleteAll, content}){

    

    return <>
        <div className="d-flex justify-content-center align-items-center mt-3 gap-1 w-100"> 
            <input className="rounded border border-black py-1 px-2" style={{flexGrow:"0.8"}} name="label" value={content} onChange={toggleChange}></input>
            <button className="btn bg-2 border border-0 hoverPrim" style={{flexGrow:"0.1"}} onClick={toggleAdd}>Add task</button>
            <button className="btn bg-2 border border-0 hoverDanger" style={{flexGrow:"0.1"}} onClick={toggleDeleteAll}>Delete All</button>
        </div>
    </>
}

export default AddTaskForm