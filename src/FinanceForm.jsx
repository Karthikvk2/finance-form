import React, { useState, useEffect } from "react";
import {
  TextField,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Slider,
  Button,
  Typography,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function FinanceForm() {
  const initialFormState = {
    fullName: "",
    dob: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    income: 50000,
    expenses: 20000,
    loanRequired: false,
    loanAmount: "",
    loanPurpose: "",
    assets: "",
    liabilities: "",
    employmentType: "",
    employerName: "",
    dependents: 0,
    maritalStatus: "",
    riskTolerance: "medium",
    feedback: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [storedData, setStoredData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);


  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("financeData")) || [];
    setStoredData(savedData);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSliderChange = (e, newValue, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = editingIndex !== null ? 
      storedData.map((data, index) =>
        index === editingIndex ? { ...formData } : data
      ) : [...storedData, formData];
    
    setStoredData(newData);
    localStorage.setItem("financeData", JSON.stringify(newData));

    setFormData(initialFormState);
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(storedData[index]);
  };

  const handleDelete = (index) => {
    const newData = storedData.filter((_, i) => i !== index);
    setStoredData(newData);
    localStorage.setItem("financeData", JSON.stringify(newData));
  };

  const handleDownload = () => {
    const textData = JSON.stringify(storedData, null, 2);
    const blob = new Blob([textData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "finance_data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Submit Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 700,
          mx: "auto",
          mt: 5,
          p: 3,
          border: "1px solid #ccc",
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Finance Client Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              multiline
              rows={2}
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Typography gutterBottom>Monthly Income (USD)</Typography>
            <Slider
              value={formData.income}
              onChange={(e, newValue) =>
                handleSliderChange(e, newValue, "income")
              }
              min={0}
              max={100000}
              step={1000}
              valueLabelDisplay="auto"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography gutterBottom>Monthly Expenses (USD)</Typography>
            <Slider
              value={formData.expenses}
              onChange={(e, newValue) =>
                handleSliderChange(e, newValue, "expenses")
              }
              min={0}
              max={50000}
              step={500}
              valueLabelDisplay="auto"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.loanRequired}
                  onChange={handleChange}
                  name="loanRequired"
                />
              }
              label="Do you require a loan?"
            />
          </Grid>

          {formData.loanRequired && (
            <>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Loan Amount (USD)"
                  name="loanAmount"
                  type="number"
                  value={formData.loanAmount}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Purpose of Loan"
                  name="loanPurpose"
                  value={formData.loanPurpose}
                  onChange={handleChange}
                />
              </Grid>
            </>
          )}

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Total Assets (USD)"
              name="assets"
              type="number"
              value={formData.assets}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Total Liabilities (USD)"
              name="liabilities"
              type="number"
              value={formData.liabilities}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Employment Type"
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              placeholder="e.g., Salaried, Self-Employed"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Employer Name"
              name="employerName"
              value={formData.employerName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Number of Dependents"
              name="dependents"
              type="number"
              value={formData.dependents}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Marital Status"
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              placeholder="e.g., Single, Married"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl>
              <FormLabel>Risk Tolerance</FormLabel>
              <RadioGroup
                name="riskTolerance"
                value={formData.riskTolerance}
                onChange={handleChange}
              >
                <FormControlLabel value="low" control={<Radio />} label="Low" />
                <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                <FormControlLabel value="high" control={<Radio />} label="High" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Feedback"
              name="feedback"
              multiline
              rows={3}
              value={formData.feedback}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {editingIndex !== null ? "Update Data" : "Submit"}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Display Submitted Data */}
      {storedData.length > 0 && (
        <Box
          mt={5}
          p={3}
          maxWidth={1000}
          mx="auto"
          border="1px solid #ccc"
          borderRadius={2}
          boxShadow={3}
          bgcolor="background.paper"
        >
          <Typography variant="h5" gutterBottom>
            Submitted Data
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Date of Birth</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Income</TableCell>
                  <TableCell>Expenses</TableCell>
                  <TableCell>Loan Required</TableCell>
                  <TableCell>Loan Amount</TableCell>
                  <TableCell>Loan Purpose</TableCell>
                  <TableCell>Assets</TableCell>
                  <TableCell>Liabilities</TableCell>
                  <TableCell>Employment Type</TableCell>
                  <TableCell>Employer Name</TableCell>
                  <TableCell>Dependents</TableCell>
                  <TableCell>Marital Status</TableCell>
                  <TableCell>Risk Tolerance</TableCell>
                  <TableCell>Feedback</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {storedData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.fullName}</TableCell>
                    <TableCell>{data.dob}</TableCell>
                    <TableCell>{data.email}</TableCell>
                    <TableCell>{data.phone}</TableCell>
                    <TableCell>{data.address}</TableCell>
                    <TableCell>{data.country}</TableCell>
                    <TableCell>{data.income}</TableCell>
                    <TableCell>{data.expenses}</TableCell>
                    <TableCell>{data.loanRequired ? "Yes" : "No"}</TableCell>
                    <TableCell>{data.loanAmount}</TableCell>
                    <TableCell>{data.loanPurpose}</TableCell>
                    <TableCell>{data.assets}</TableCell>
                    <TableCell>{data.liabilities}</TableCell>
                    <TableCell>{data.employmentType}</TableCell>
                    <TableCell>{data.employerName}</TableCell>
                    <TableCell>{data.dependents}</TableCell>
                    <TableCell>{data.maritalStatus}</TableCell>
                    <TableCell>{data.riskTolerance}</TableCell>
                    <TableCell>{data.feedback}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(index)}
                        title="Edit"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDelete(index)}
                        title="Delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box mt={2}>
            <Button
              variant="contained"
              color="success"
              onClick={handleDownload}
              fullWidth
            >
              Download Data as JSON
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}
