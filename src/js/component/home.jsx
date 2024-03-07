import React, {useEffect, useState} from "react";
import AddTaskForm from "./AddTaskForm";

//create your first component
const Home = () => {
	const [login, setLogin] = useState(false)
	const [user, setUser] = useState("")
	const [todos, setTodos] = useState([])
	const [task, setTask] = useState({label: "", done: false})
	const [error, setError] = useState({msg:"", let:false})

	useEffect(()=>{
		const fetchData = async ()=>{
			try{const res = await fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`,{
					method: "PUT",
					headers:{
						"Content-type": "application/json"
					},
					body: JSON.stringify(todos)
				})
				if(!res.ok) throw error
			}catch(error){}
		}
		fetchData()
	},[todos])

	const toggleLogin = async ()=>{
		if(user !== ""){
			try{
				const res = await fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`)
				if(!res.ok) throw error
				const data = await res.json()
				console.log(data)
				setLogin(true)
				setError({msg:"", let:false})
				setTodos(data)
			}catch(error){
				setError({msg:"User doesn't exist", let:true})
				setLogin(false)
			}
		}
	}

	const toggleRegister = async ()=>{
		if(user !== ""){
			try{const res = await fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`,{
				method: "POST",
				headers:{
					"Content-type": "application/json"
				},
				body: JSON.stringify([])
			})
				if(!res.ok) throw error
				const data = await res.json()
				console.log(data.msg)
				setLogin(true)
				setError({msg:"", let:false})
			}catch(error){
				setError({msg:"User already exist", let:true})
				setLogin(false)
			}	
	
			try{
				const res = await fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`)
				const data = await res.json()
				console.log(data)
				setTodos(data)
			}catch(error){}
		}
	}

	const userEnter = ({target}) =>{
		setUser(target.value)
	}

	const changeUser = () =>{
		setLogin(false)
	}

	const deleteUser = async () =>{
		try{const res = await fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`,{
			method: "DELETE",
			headers:{
				"Content-type": "application/json"
			},
		})
			setLogin(false)
		}catch(error){}
	}

	const toggleChange = ({target}) =>{
		setTask(prevTask => {
			return {
				...prevTask,
				[target.name]: target.value
			}
		})
	}

	const addTask = () => {
		if (task.label !== "") {
			setTodos(prevTodo => [...prevTodo, task]);
			setTask({ label: "", done: false });
		}
	}

	const toggleAdd = (event) =>{
		if(event.key == "Enter"){
			return addTask()
		}
	}
	
	const deleteAllTasks = () =>{
		const filteredTodos = todos.filter((todo,index) => index === 0)
		setTodos(filteredTodos)
	}

	const deleteTask = (id) =>{
		let newTodos = todos.filter((todo, i)=> i !== id)
		setTodos(newTodos)
	}

	const stylesLogin={
		height: !login && "100vh",
		display: "flex",
		flexDirection:"column",
		justifyContent:"center",
		alignItems:"center",
		background:"#294B29"
	}

	const styleForm={
		height:!login &&"20rem",
		width:!login && "33rem",
		borderColor:!login && "#789461",
		borderRadius:!login &&  "1rem",
		color:!login &&  "#d7fdfb",
		background: !login && "#789461"
	}

	return <>
		<div style={stylesLogin}>
			<div 
				className="d-flex flex-column justify-content-evenly align-items-center mt-1"
				style={styleForm}
			>
				{!login && <h2 className="text-center color-1 text-shine fw-1">Enter Your User or <br/>Register One</h2>}
				<div className="w-100 text-center">
					{!login ? <input 
						className="text-center rounded border border-black py-1 px-2 w-wide-5" 
						name="user" 
						value={user}
						onChange={userEnter}
						placeholder="User123"
						>
						</input>
						:
						<>
							<h5 className="text-center color-1">User logged: {user}</h5>
							<input 
							className="text-center color-1 rounded border border-0 py-1 px-2 w-100" 
							name="user" 
							value={user}
							onChange={userEnter}
							disabled
							>
							</input>
						</>
					}
				{error.let && <small className="text-white"><br/>{error.msg}</small>}
				</div>
				{!login ?
					<div className="mt-2">
						<button name="register" className="hoverPrim bg-1 border border-0 px-3 mx-1 btn btn-light" onClick={toggleRegister}>Register</button>
						<button name="login" className="hoverPrim bg-1 border border-0 px-3 mx-1 btn btn-light" onClick={toggleLogin}>Login</button>
					</div>
					:
					<div>
						<button className="mt-2 btn me-1 bg-1 border border-0 hoverPrim" onClick={changeUser}>Change User</button>
						<button className="mt-2 btn ms-1 bg-1 border border-0 hoverDanger" onClick={deleteUser}>Delete User</button>
					</div>
				}
			</div>
		</div>
		{ login && 
			<div className="mt-5 d-flex justify-content-center flex-column align-items-center w-wide-1 mx-automatic p-4 border-round-1 bg-1">
				<AddTaskForm 
					content={task.label}
					toggleChange={toggleChange}
					toggleAdd={addTask}
					toggleDeleteAll={deleteAllTasks}
					toggleKey={toggleAdd}
				/>
				<div className="border border-0 rounded bg-1 mt-3" style={{width: "100%"}}>
					{todos.length > 1 ?
						todos.map((todo, index)=> index > 0 &&
							<div 
								key={index} 
								className="d-flex justify-content-between align-items-center mb-2 trashDisplay"
								>
								<div className="py-2">
									<p className="m-0">{todo.label}</p>
									{/* <p className="m-0 text-">{todo.done ? "Hecho" : "Not done"}</p> */}
								</div>
								<button 
									className="btn p-1 trash"
									onClick={()=>deleteTask(index)}
								>
									🗑️
								</button>
							</div>
						)
						:
						<h3 className="text-center m-0 py-2">No Tasks Yet</h3>
					}
				</div>
			</div>
		}
	
	</>
};

export default Home;
