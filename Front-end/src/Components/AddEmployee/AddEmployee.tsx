import "./AddEmployee.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { EmployeeModel } from "../../Employee";
import { addEmployeeApi } from "../../MainService";
import type { JSX } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Box,
} from "@mui/material";

export function AddEmployee(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<EmployeeModel>();
  const navigate = useNavigate();

  async function sendEmployee(newEmployee: EmployeeModel) {
    try {
      const res = await addEmployeeApi(newEmployee);
      alert("✅ Employee added successfully! Status: " + res.status);
      navigate("/");
    } catch (err: any) {
      alert(err.response?.data || "Failed to add employee.");
      console.log(err);
    }
  }

  return (
    <div className="AddEmployee">
      <Card className="AddEmployeeCard" elevation={4}>
        <CardContent>
          <Typography variant="h5" gutterBottom textAlign="center">
            ➕ Add New Employee
          </Typography>

          <form onSubmit={handleSubmit(sendEmployee)}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                marginTop: 2,
              }}
            >
              <TextField
                label="First Name"
                variant="outlined"
                {...register("first_name", { required: "First name is required" })}
                error={!!formState.errors.first_name}
                helperText={formState.errors.first_name?.message}
              />

              <TextField
                label="Last Name"
                variant="outlined"
                {...register("last_name", { required: "Last name is required" })}
                error={!!formState.errors.last_name}
                helperText={formState.errors.last_name?.message}
              />

              <TextField
                label="Nickname"
                variant="outlined"
                {...register("nickname")}
                error={!!formState.errors.nickname}
                helperText={formState.errors.nickname?.message}
              />


              <TextField
                label="Email"
                variant="outlined"
                type="email"
                {...register("email", { required: "Email is required" })}
                error={!!formState.errors.email}
                helperText={formState.errors.email?.message}
              />

              <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ width: "48%" }}
                >
                  Add Employee
                </Button>

                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ width: "48%" }}
                  onClick={() => navigate("/")}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
