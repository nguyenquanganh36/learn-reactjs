import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks : [],
            isDisplayForm : false,
            taskEditing : ''
        }
    }

    componentDidMount(){
       
        if(localStorage && localStorage.getItem('tasks')){
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks : tasks
            });
        }
    }

    onToggleForm = () => {
        this.setState({
            isDisplayForm : !this.state.isDisplayForm
        });
    }

    onCloseForm = () => {
        this.setState({
            isDisplayForm : false
        });
    }

    onShowForm = () => {
        this.setState({
            isDisplayForm : true
        });
    }

    // onGenerateData = () => {
    //     var tasks =  [
    //         {
    //             id : this.generateID(),
    //             name : 'Học lập trình',
    //             status: true
    //         },
    //         {
    //             id : this.generateID(),
    //             name : 'Xem đá bóng',
    //             status: false
    //         },
    //         {
    //             id : this.generateID(),
    //             name : 'Đi bơi',
    //             status: true
    //         }

    //     ]
    //     this.setState ({
    //         tasks : tasks
    //     });
    //     localStorage.setItem('tasks', JSON.stringify(tasks));
    // }

    s4() {
        return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
    }

    generateID(){
        return this.s4() + this.s4() + '-' +this.s4() + '-' +this.s4() + '-' + this.s4() + '-' +this.s4() + '-' + this.s4() + '-' + this.s4()+ '-' + this.s4();
    }

    onSubmit = (data) => {
        var {tasks} = this.state;
        if(data.id==='') {
            data.id = this.generateID();
            tasks.push(data);
            this.setState({
                tasks : tasks
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }else{
            var newTasks = tasks.map(task => {
                if(task.id===data.id){
                    task = data;
                }
                return task;
            });
            this.setState({
                tasks : newTasks,
                taskEditing : null
            });
            localStorage.setItem('tasks', JSON.stringify(newTasks));
        }
        
        
    }

    onUpdateStatus = (id) => {
        var {tasks} = this.state;
        var newTasks = tasks.map(task => {
            if(task.id===id){
                task.status =!task.status
            }
            return task;
        });
        this.setState({
            tasks : newTasks
        });
        localStorage.setItem('tasks', JSON.stringify(newTasks));
    }

    onDelete = (id) => {
        var {tasks} = this.state;
        var tasksFilter = tasks.filter(task => {
            return task.id!==id;
        });
        this.setState({
            tasks : tasksFilter
        });
        localStorage.setItem('tasks', JSON.stringify(tasksFilter));
        this.onCloseForm(); 
    }

    onUpdate = (id) => {
        var {tasks} = this.state;
        var taskEdits = tasks.filter(task => {
            return task.id===id;
        });
        var taskEditing = taskEdits[0];
        this.setState({
            taskEditing : taskEditing
        });
        this.onShowForm();
    }

    render() {
        var {tasks, isDisplayForm,taskEditing} = this.state;
        var elementTaskForm = isDisplayForm===true? <TaskForm 
                                                        onSubmit = {this.onSubmit}
                                                        onCloseForm = {this.onCloseForm}
                                                        taskEditing = {taskEditing}
                                                        /> : '';
    return (
    <div className="container" >
    <div className="text-center">
        <h1>Quản Lý Công Việc</h1>
        <hr/>
    </div>
    <div className="row">
        <div className={isDisplayForm===true? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
            {/* Form */}
            {elementTaskForm}
        </div>
        <div className={isDisplayForm===true? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button 
                type="button" 
                className="btn btn-primary"
                onClick = {this.onToggleForm}
                >
                <span className="fa fa-plus mr-5"></span>Thêm Công Việc
            </button>&nbsp;
            {/* Search - Sort */}
                <Control />
                {/* List */}
            <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    < TaskList 
                        tasks = {tasks} 
                        onUpdateStatus = {this.onUpdateStatus}
                        onDelete = {this.onDelete}
                        onUpdate = {this.onUpdate}
                        />
                </div>
            </div>
        </div>
    </div>
</div> 
  );
}
}

export default App;
