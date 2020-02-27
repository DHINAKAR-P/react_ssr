import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useHistory } from "react-router-dom";

const StudentList = (props) => {
  const history = useHistory();
  console.log(props)
  const [stulist, setStulist] = useState(props.location.state.studentlistdata)

  const editStudent = (student, id) => {
    console.log('editStudent------------>', student)
    history.push('/' + id, student)
  }

  const deleteStudent = (name, index) => {
    setStulist(stulist.filter(s => s.name !== name));
    console.log('---------------spliced ---------->', stulist)
  }

  const cancelStudent = () => {
    console.log("canceled --------------> ")
    history.push('/');
  }

  return (
    <div>
      <Button
        style={{ float: "right", marginBottom: '20px' }}
        variant="contained"
        onClick={() => { cancelStudent() }}
      > Go Back</Button>

      <TableContainer component={Paper}>

        <Table aria-label="simple table">
          <TableHead style={{ backgroundColor: 'gray', color: 'yellow' }}>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Age</TableCell>
              <TableCell align="center">Mark&nbsp;</TableCell>
              <TableCell align="center">Address&nbsp;</TableCell>
              <TableCell align="center">Actions&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stulist.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index}</TableCell>
                <TableCell align="center" component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.age}</TableCell>
                <TableCell align="center">{row.mark}</TableCell>
                <TableCell align="center">{row.address}</TableCell>
                <TableCell align="center">

                  <ButtonGroup aria-label="contained primary button group">
                    <Button
                      color="primary"
                      style={{ marginRight: '30px' }}
                      variant="contained"
                      onClick={() => { editStudent(row, index) }}
                    >
                      Edit
                      </Button>

                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => { deleteStudent(row.name, index) }}
                    >
                      Delete
                      </Button>

                  </ButtonGroup>


                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

  );
}

export default StudentList;