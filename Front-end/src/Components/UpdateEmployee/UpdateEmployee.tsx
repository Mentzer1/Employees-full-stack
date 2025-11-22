import "./UpdateEmployee.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, type JSX } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Box,
  Paper,
} from "@mui/material";
import type { EmployeeModel } from "../../Employee";
import { getOneEmployeeApi, updateEmployeeApi } from "../../MainService";

export function UpdateEmployee(): JSX.Element {
  const { register, handleSubmit, setValue } = useForm<EmployeeModel>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getOneEmployeeApi(Number(id))
        .then((employee) => {
          setValue("first_name", employee.first_name);
          setValue("last_name", employee.last_name);
          setValue("nickname", employee.nickname);
          setValue("email", employee.email);
          
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [id, setValue]);

  function sendEmployee(updatedEmployee: EmployeeModel) {
    updatedEmployee.id = Number(id);
    updateEmployeeApi(updatedEmployee)
      .then((res) => {
        alert("Employee updated! The status is: " + res.status);
        navigate("/");
      })
      .catch((err) => {
      alert(err.response?.data || "Failed to update employee.");
        console.log(err);
      });
  }

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", marginTop: 10 }}>
        <CircularProgress />
        <Typography sx={{ marginTop: 2 }}>Loading employee data...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
      <Paper
        elevation={4}
        sx={{
          padding: 5,
          borderRadius: 4,
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Update Employee
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(sendEmployee)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
            marginTop: 3,
          }}
        >
          <TextField
            label="First Name"
            variant="outlined"
            {...register("first_name", { required: "First name is required" })}
            fullWidth
          />

          <TextField
            label="Last Name"
            variant="outlined"
            {...register("last_name", { required: "Last name is required" })}
            fullWidth
          />

          <TextField
            label="Nickname"
            variant="outlined"
            {...register("nickname")}
            fullWidth
          />


          <TextField
            label="Email"
            type="email"
            variant="outlined"
            {...register("email", { required: "Email is required" })}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ marginTop: 2 }}
          >
            Update Employee
          </Button>

          <Button
            variant="outlined"
            color="inherit"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
