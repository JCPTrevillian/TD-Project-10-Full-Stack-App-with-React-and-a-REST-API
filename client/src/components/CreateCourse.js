
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import Form from './Form';

const CreateCourse = (props) => {

    const history = useHistory();
    const [state, setState] = useState(
        {
            title: "",
            description: "",
            estimatedTime: "",
            materialsNeeded: "",
            errors: [],
        }
    );

    const { 
        title,
        description,
        estimatedTime,
        materialsNeeded,
        errors,
    } = state;

    // hook
    const cancel = () => {
        history.push({
            pathname: "/",
        });
    }

    const submit = () => {

        const { context } = props;
        // pass
        const userId = context.authenticatedUser.id;
        // authenticatedUser 
        const {email, password} = context.authenticatedUser;
       
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded
        } = state;
        
        const course = {
            title,
            description,
            userId,
            estimatedTime,
            materialsNeeded,
        };

        // createCourse
        context.data.createCourse(course, email, password)
        .then((errors) => {
            if(errors.length) {
                setState({errors});
            }
            else {
                console.log(`Course created`);
                history.push('/');
            }
        })
        .catch(err => {
            console.log(err);
            history.push('/error');
        })
    }

    // update state, prop
    const change = (event) => {
        const { name, value } = event.target;
        
        setState( prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const { context } = props;

    const {firstName, lastName} = context.authenticatedUser;

    return(
        <div className="bounds course-detail">
            <h1>Create Course</h1>
            <Form 
                cancel={cancel}
                errors={errors}
                submit={submit}
                submitButtonText="Create Course"
                elements={()=> (
                    <>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>
                                    <input 
                                        id="title"
                                        name="title"
                                        type="text"
                                        className="input-title course--title--input"
                                        placeholder="Course title "
                                        value={title || ''} 
                                        onChange={change} 
                                    />
                                </div>
                                <p>By {firstName} {lastName} </p>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea
                                        id="description"
                                        name="description"
                                        placeholder="Course description "
                                        value={description || ''}
                                        onChange={change}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <div>
                                            <input 
                                                id="estimatedTime"
                                                name="estimatedTime"
                                                type="text"
                                                className="course--time--input"
                                                placeholder="Hours"
                                                value={estimatedTime || ''} 
                                                onChange={change}
                                            />
                                        </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea
                                                id="materialsNeeded"
                                                name="materialsNeeded"
                                                placeholder="List Materials..."
                                                value={materialsNeeded || ''}
                                                onChange={change}
                                            ></textarea>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
            />
        </div>
    )
} 

export default CreateCourse;