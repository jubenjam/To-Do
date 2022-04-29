import React, {useState} from 'react';

function Form(props) {
    const [person, setPerson] = useState(
        {
            task: "",
            date: "",
            category: "",
        }
    );
    function handleChange(event) {
        const { name, value } = event.target;
        if(name === "date")
            setPerson(
                {task: person['task'], date: value, category: person['category']}
            );
        else if(name === "category")
            setPerson(
                {task: person['task'], date: person['date'], category: value}
            );
        else
            setPerson(
                {task: value, date: person['date'], category: person['category']}
            );
    }
    function submitForm() {
        props.handleSubmit(person);
        setPerson({task: '', date: '', category: ''});
    }
    return (
        <form>
            <label htmlFor="task">Task</label>
            <input
                type="text"
                name="task"
                id="task"
                value={person.task}
                onChange={handleChange} />
            <label htmlFor="date">Date</label>
            <input
                type="text"
                name="date"
                id="date"
                value={person.date}
                onChange={handleChange} />
            <label htmlFor="category">Category</label>
            <input
                type="text"
                name="category"
                id="category"
                value={person.category}
                onChange={handleChange} />
            <input type="button" value="Submit" onClick={submitForm} />
        </form>
    );
}

export default Form;