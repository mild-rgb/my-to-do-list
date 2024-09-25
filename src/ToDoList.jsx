import React, { useEffect, useState } from "react";
//import { TailSpin } from "react-loader-spinner";
import { TypeAnimation } from 'react-type-animation';

function ToDoList() {
    console.log("this is a test to see if updating")
    const [tasks, setTasks] = useState([]); // just an array of strings
    const [newTask, setNewTask] = useState("");
    const [loading, setLoading] = useState(true)

    function handleTaskChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks((t) => [...t, newTask]);
            setNewTask("");
        }
    }

    function removeTask(index) {
        //__ represents element 
        const updatedTasks = tasks.filter((__, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = 
            [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = 
            [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    // save list to backend
    async function saveList() {
        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tasks),
            };

            const response = await fetch('https://to-do-backend-ssey.onrender.com/upload', options);
            if (!response.ok) {
                throw new Error('Failed to save tasks');
            }
            console.log("Tasks saved successfully.");
        } catch (error) {
            console.error("Error saving tasks:", error);
        }
    }

    async function fetchTasks() {
        try {   
            console.log(loading)         
            const response = await fetch("https://to-do-backend-ssey.onrender.com/download");
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const data = await response.json();
            setTasks(data.message || []); // Ensure tasks is an array
            console.log("Fetched tasks:", data.message);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
        finally
        {
            setLoading(false)
        }
    }

    // get data from backend on reload  
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className='ToDoList'>
            <h1>list of things for me to do</h1>
            <div>
                <textarea
                    id="newTask"
                    placeholder='enter a task...'
                    value={newTask}
                    onChange={handleTaskChange}
                    rows="1"
                />
                <br />
                <button
                    className="add-button"
                    onClick={addTask}
                >
                    add task
                </button>
                <button
                    className="add-button"
                    onClick={saveList}
                >
                    save tasks
                </button>
                <br />
            </div>

            {loading ? (
                <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed once, initially
                  'tasks',
                  1500,
                  'tasks are',
                  1500,
                  'tasks are loading',
                  1500,
                  '',
                  1500,
                ]}
                speed={70}
                style={{ fontSize: '2em' }}
                repeat={Infinity}
              />
            ) : 
            (
            <ol>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <span className='text'>{task}</span>
                        <button
                            className="delete-button"
                            onClick={() => removeTask(index)}
                        >
                            delete task
                        </button>
                        <button
                            className="move-button"
                            onClick={() => moveTaskUp(index)}
                        >
                            move up
                        </button>
                        <button
                            className="move-button"
                            onClick={() => moveTaskDown(index)}
                        >
                            move down
                        </button>
                    </li>
                ))}
            </ol>
            )}
        </div>
    );
}

export default ToDoList;
          