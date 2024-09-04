
import React, { useEffect, useState } from "react";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
if (process.env.NODE_EVN === 'production') disableReactDevTools()
//according to this https://muffinman.io/uploading-files-using-fetch-multipart-form-data it works in different way, at least for me it works as well.

//const fileInput = document.querySelector('#your-file-input') ;
//const formData = new FormData();
//
//formData.append('file', fileInput.files[0]);
//
//    const options = {
//      method: 'POST',
//      body: formData,
      // If you add this, upload won't work
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // }
  //  };
    
  //  fetch('your-upload-url', options);

//You should remove the 'Content-Type': 'multipart/form-data' and it started to work.
function ToDoList()
{
    const [tasks, setTasks] = useState([]); //just an array of strings
    const [newTask, setNewTask] = useState("")
    const [headers, setHeaders] = useState([])
    const [newHeader, setNewHeader] = useState("")
    
    
    function handleTaskChange(event){
        setNewTask(event.target.value)
    }

    function handleHeaderChange(event){
        setNewHeader(event.target.value)
    }

    function addTaskHeader()
    {
        if(newTask.trim() !== ""){
        setTasks(t => [...t, newTask])
        setNewTask("")
        }

        if(newHeader.trim() !== "")
        {
            setHeaders(h => [...h, newHeader])
            setNewHeader("")
        }
    }
    function removeTask(index)
    {//__ represents element 
        const updatedTasks = tasks.filter((__, i) => i !== index)
        setTasks(updatedTasks)
    }
    //function moveTaskUp(index){
    //    if(index > 0){
    //        const updatedTasks = [...tasks];
    //        [updatedTasks[index], updatedTasks[index - 1]] = 
    //        [updatedTasks[index - 1], updatedTasks[index]];
    //        setTasks(updatedTasks);
    //    }
    //}
    //function moveTaskDown(index){
    //    if(index < tasks.length - 1){
    //        const updatedTasks = [...tasks];
    //        [updatedTasks[index], updatedTasks[index + 1]] = 
    //        [updatedTasks[index + 1], updatedTasks[index]];
    //        setTasks(updatedTasks);
    //    }
    //}

    //save last to local 
    async function saveList()
    {
        console.log(tasks)
        console.log(JSON.stringify(tasks))
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tasks), 
        };


        fetch('https://to-do-backend-ssey.onrender.com/upload', options);

//fetch("http://localhost:3000/api")
 //           .then((res) => res.json())
 //           .then((data) => setData(data.message));
 //       console.log(data)
    }

    function moveTaskUp(index){



        if(index > 0){

            const updatedTasks = [...tasks];

            [updatedTasks[index], updatedTasks[index - 1]] = 

            [updatedTasks[index - 1], updatedTasks[index]];

            setTasks(updatedTasks);

        }

    }



    function moveTaskDown(index){



        if(index < tasks.length - 1){

            const updatedTasks = [...tasks];

            [updatedTasks[index], updatedTasks[index + 1]] = 

            [updatedTasks[index + 1], updatedTasks[index]];

            setTasks(updatedTasks);

        }

    }



    //get data from computer 
    useEffect(() => {
        fetch("https://to-do-backend-ssey.onrender.com/api")
          .then((res) => res.json())
          .then((data) => setTasks(data.message));
    }, []);
    
    
    return(
        <div className='ToDoList'>
            <h1>to do list</h1>
            <div>
                <textarea
                placeholder='enter a task...'
                value = {newTask}
                onChange={handleTaskChange}
                />
                <br/>
                <button
                className="add-button"
                onClick={addTaskHeader}
                >
                    make task
                </button>
                <br/>
                <button
                className = "save-button"
                onClick={saveList}>
                    save tasks

                </button>
            </div>


            <ol>
                {tasks.map((task, index) => 
                <li key={index}>
                    <span className='text'>{task}</span>
                    <button 
                    className = "delete-button"
                    onClick = {() => removeTask(index)}
                    >
                    delete task
                    </button>
                    <button
                    className="move-button"
                    onClick={() => moveTaskUp(index)}>
                    move task priority up
                    </button>

                    <button
                    className="move-button"
                    onClick={() => moveTaskDown(index)}>
                    move task priority down
                    </button>
                </li>
                )}
            </ol>
        </div>
    )

}
export default ToDoList;            