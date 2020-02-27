import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';

let studentlist = [];

const initialStudentState = {
    id: 0,
    name: "",
    age: 0,
    mark: 0,
    address: ""
}
const StudentManagement = (props) => {
    const history = useHistory();
    const { id } = useParams();
    const [student, setStudent] = useState(initialStudentState)

    useEffect(() => {
        if (id != undefined) {
            setStudent(props.history.location.state);
        } else {
            console.log('do nothing')
        }

    }, [props.history.location.state])

    const handleInputChange = event => {
        const { name, value } = event.target
        setStudent({ ...student, [name]: value })
    }


    const saveSutdent = student => {
        studentlist.push(student);
        console.log('studentlist--->', studentlist)
    }

    const updateSutdent = student => {
        for (let i = 0; i < studentlist.length; i++) {
            if (studentlist[i].name == student.name) {
                studentlist[i].name = student.name;
                studentlist[i].age = student.age;
                studentlist[i].mark = student.mark;
                studentlist[i].address = student.address
                break;
            } else {
                console.log("Don nothing ", i)
            }
            console.log(studentlist[i]);

        }
    }
    const goToListPage = () => {
        console.log('in route -->', studentlist)
        history.push('/student/list', { studentlistdata: studentlist });
    }

    return (
        <Container component="main" maxWidth="xs">
            <form noValidate>
                <h1>Student Registration </h1>
                <br></br>
                <Grid container>
                    {
                         id != undefined
                         ?  <TextField
                         variant="outlined"
                         required
                         disabled
                         fullWidth
                         value={student.name}
                         onChange={handleInputChange}
                         name="name"
                         label="Name"
                         type="input"
                         id="name"
                     />:
                     <TextField
                     variant="outlined"
                     required
                     fullWidth
                     value={student.name}
                     onChange={handleInputChange}
                     name="name"
                     label="Name"
                     type="input"
                     id="name"
                 />
                    }
                  
                </Grid>
                <br></br>
                <Grid  >
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        value={student.age}
                        onChange={handleInputChange}
                        name="age"
                        label="Age"
                        type="input"
                        id="age"
                    />
                </Grid>
                <br></br>
                <Grid  >
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        value={student.mark}
                        onChange={handleInputChange}
                        name="mark"
                        label="Mark"
                        type="input"
                        id="mark"
                    />
                </Grid>
                <br></br>
                <Grid  >
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        value={student.address}
                        onChange={handleInputChange}
                        name="address"
                        label="Address"
                        type="input"
                        id="address"
                    />
                </Grid>
                <br></br>
                {
                    id != undefined
                        ?
                        <Button
                            style={{ marginTop: '2px', marginRight: '30px' }}
                            variant="contained"
                            color="primary"
                            onClick={() => { updateSutdent(student) }}
                        >
                            Update
                </Button>

                        :
                        <Button
                            style={{ marginTop: '2px', marginRight: '30px' }}
                            variant="contained"
                            color="primary"
                            onClick={() => { saveSutdent(student) }}
                        >
                            Save
                </Button>
                }
                <Button
                    style={{ marginTop: '10px', marginRight: '30px' }}
                    variant="contained"
                    color="secondary"
                    onClick={() => { goToListPage() }}
                >
                    Go To List Page
      </Button>
            </form>
        </Container>
    )
}

export default StudentManagement;