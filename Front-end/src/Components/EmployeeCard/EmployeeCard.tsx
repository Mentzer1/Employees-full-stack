import type { JSX } from "react";
import "./EmployeeCard.css";
import type { EmployeeModel } from "../../Employee";
import { useNavigate } from "react-router-dom";
import { deleteEmployeeApi } from "../../MainService";
import { Card, CardContent, CardActions, Typography, Button } from "@mui/material";

interface EmployeeProps {
  employee: EmployeeModel;
  setEmployees: React.Dispatch<React.SetStateAction<any>>;
}

export function EmployeeCard(props: EmployeeProps): JSX.Element {
  const navigate = useNavigate();

  async function handleDeleteEmployee(employeeId: number) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${props.employee.first_name} ${props.employee.last_name}?`
    );

    if (!confirmed) return;

    try {
      await deleteEmployeeApi(employeeId);
      props.setEmployees((prevEmployees: EmployeeModel[]) =>
        prevEmployees.filter((employee) => employee.id !== employeeId)
      );
      alert("Employee deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete employee.");
    }
  }

  function handleEditEmployee() {
    navigate("/update_employee/" + props.employee.id);
  }

  return (
    <Card className="EmployeeCard" elevation={3}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {props.employee.first_name} {props.employee.last_name}
        </Typography>
        <Typography color="text.secondary">ID: {props.employee.id}</Typography>
        <Typography color="text.secondary">
          Email: {props.employee.email}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between", paddingX: 2 }}>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleDeleteEmployee(props.employee.id)}
        >
          ❌ Delete
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleEditEmployee}
        >
          ✏️ Edit
        </Button>
      </CardActions>
    </Card>
  );
}
