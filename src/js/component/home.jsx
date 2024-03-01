import React, {useEffect, useState} from "react";
import AddTaskForm from "./AddTaskForm";

//create your first component
const Home = () => {
	const [login, setLogin] = useState(false)
	const [user, setUser] = useState("")
	const [todos, setTodos] = useState([])
	const [task, setTask] = useState({label: "", done: false})
	const [error, setError] = useState({errorMsg: "", error:false})

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
				setError(prevError => prevError.error = false)
				setTodos(data)
			}catch(error){
				setError({errorMsg: "User doesn't exist", error: true})
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
				setError(prevError => prevError.error = false)
			}catch(error){
				setError({errorMsg: "User already exist", error:true})
			}	
	
			try{
				const res = await fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`)
				if(!res.ok) throw error
				const data = await res.json()
				console.log(data)
				setTodos(data)
			}catch(error){
				setError({errorMsg: "User doesn't exist", error: true})
			}
		}
	}

	const userEnter = ({target}) =>{
		setUser(target.value)
	}

	const toggleChange = ({target}) =>{
		setTask(prevTask => {
			return {
				...prevTask,
				[target.name]: target.value
			}
		})
	}

	const addTask = async () => {
		if(task !== ""){
			setTodos(prevTodo => [...prevTodo, task])
		}
	}

	const deleteTask = (id) =>{
		let newTodos = todos.filter((todo, i)=> i !== id)
		setTodos(newTodos)
	}

	const styles={
		height: !login && "100vh",
		display: "flex",
		flexDirection:"column",
		justifyContent:"center",
		alignItems:"center",
		background:"#000000"
	}

	return <>
		<div style={styles}>
			<div 
				className="border-primary lumo-primary d-flex flex-column justify-content-evenly align-items-center mt-1 border rounded p-3"
				style={{height:!login && "400px", width: !login && "500px"}}
			>
				{!login && <h2 className="text-center text-white fw-1">Enter Your User or <br/>Register One</h2>}
				<div>
					<label htmlFor="loginResgister"></label>
					{!login ? <input 
						className="text-center rounded border border-black py-1 px-2" 
						name="user" 
						value={user}
						onChange={userEnter}
						>
						</input>
						:
						<input 
						className="text-center rounded border border-black py-1 px-2" 
						name="user" 
						value={user}
						onChange={userEnter}
						disabled
						>
						</input>
					}
				</div>
				{error.error && <small className="text-white">{error.errorMsg}</small>}
				{!login ?
					<div className="mt-2">
						<button name="register" className="backG-primary text-white border border-0 px-3 mx-1 btn btn-light" onClick={toggleRegister}>Register</button>
						<button name="login" className="backG-primary text-white border border-0 px-3 mx-1 btn btn-light" onClick={toggleLogin}>Login</button>
					</div>
					:
					<button className="mt-2 btn btn-light">Change User</button>
				}
			</div>
		</div>
		{ login && 
			<div className="mt-5 d-flex justify-content-center flex-column align-items-center">
				<AddTaskForm user={user} toggleChange={toggleChange} toggleAdd={addTask}/>
				<div className="border border-light rounded bg-light mt-3" style={{width: "60%"}}>
					{todos.length > 1 ?
						todos.map((todo, index)=> index > 0 &&
							<div key={index} className="d-flex justify-content-between align-items-center mb-2">
								<div>
									<p className="m-0">{todo.label}</p>
									<p className="m-0 text-">{todo.done ? "Hecho" : "Not done"}</p>
								</div>
								<button className="btn" onClick={()=>deleteTask(index)}>🗑️</button>
							</div>
						)
						:
						<h3 className="text-center">No Tasks Yet</h3>
					}
				</div>
			</div>
		}
	
	</>
};

export default Home;
