import { useNavigate } from "react-router-dom";
import "./Home.css";
import {
  Button,
  Container,
  Typography,
  Grid,
  TextField,
  Box,
} from "@mui/material";
import { useEffect, useState, type JSX } from "react";
import type { EmployeeModel } from "../../Employee";
import { getAllEmployeesApi, getOneEmployeeApi } from "../../MainService";
import { EmployeeCard } from "../EmployeeCard/EmployeeCard";

export function Home(): JSX.Element {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState<EmployeeModel[]>([]);
  const [searchId, setSearchId] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    getAllEmployeesApi()
      .then((res) => setEmployees(res))
      .catch((e) => console.log(e));
  }, []);

  function goToAddEmployee() {
    navigate("/employee_add");
  }

  async function handleSearch() {
    if (!searchId.trim()) {
      // Reset to full list
      setIsSearching(false);
      getAllEmployeesApi().then((res) => setEmployees(res));
      return;
    }

    try {
      const employee = await getOneEmployeeApi(Number(searchId));
      setEmployees(employee ? [employee] : []);
      setIsSearching(true);
    } catch (error) {
      console.error(error);
      setEmployees([]);
      setIsSearching(true);
    }
  }

  function handleClearSearch() {
    setSearchId("");
    setIsSearching(false);
    getAllEmployeesApi().then((res) => setEmployees(res));
  }

  return (
    <div className="Home">
      <Container sx={{ textAlign: "center", marginTop: 6 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Employees Manager
        </Typography>
        <Button
          onClick={goToAddEmployee}
          variant="contained"
          color="primary"
          size="large"
          sx={{ marginTop: 3, marginBottom: 4 }}
        >
          Add New Employee
        </Button>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            marginBottom: 4,
          }}
        >
          <TextField
            label="Find Employee by ID"
            variant="outlined"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            type="number"
            sx={{ width: 200 }}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSearch}
          >
            🔍 Search
          </Button>
          {isSearching && (
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleClearSearch}
            >
              Clear
            </Button>
          )}
        </Box>
      </Container>

      <Container sx={{ marginTop: 4 }}>
        {employees.length > 0 ? (
          <Grid container spacing={3} justifyContent="center">
            {employees.map((employee) => (
              <Grid item key={employee.id} xs={12} sm={6} md={4} lg={3}>
                <EmployeeCard
                  employee={employee}
                  setEmployees={setEmployees}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography
            variant="h6"
            color="text.secondary"
            align="center"
            sx={{ marginTop: 4 }}
          >
            {isSearching
              ? "No employee found with that ID"
              : "No employees available"}
          </Typography>
        )}
      </Container>
    </div>
  );
}
