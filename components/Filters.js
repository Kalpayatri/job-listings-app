import React, { useState, useEffect } from "react";
import { TextField, Box, Grid, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";

const Filters = ({ jdList, setFilteredJobs }) => {
  const [filters, setFilters] = useState({
    minExp: "",
    maxExp: "",
    location: "",
    jobRole: "",
    minJdSalary: "",
    maxJdSalary: "",
    salaryCurrencyCode: "",
    companyName: "",
    remoteOnSite: "",
    techStack: "",
    minBasePay: "",
    uniqueLocations: [],
    uniqueRoles: [],
    uniqueCurrencyCodes: [],
    uniqueCompanyNames: [],
    uniqueRemoteOnSite: [],
    uniqueTechStacks: [],
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (jdList) {
      const uniqueLocations = [...new Set(jdList.map((jd) => jd.location))];
      const uniqueRoles = [...new Set(jdList.map((jd) => jd.jobRole))];
      const uniqueCurrencyCodes = [
        ...new Set(jdList.map((jd) => jd.salaryCurrencyCode)),
      ];
      const uniqueCompanyNames = [...new Set(jdList.map((jd) => jd.company))];
      const uniqueRemoteOnSite = [
        ...new Set(jdList.map((jd) => jd.remoteOnSite)),
      ];
      const uniqueTechStacks = [...new Set(jdList.map((jd) => jd.techStack))];
      setFilters((prevFilters) => ({
        ...prevFilters,
        location: prevFilters.location || "",
        jobRole: prevFilters.jobRole || "",
        salaryCurrencyCode: prevFilters.salaryCurrencyCode || "",
        companyName: prevFilters.companyName || "",
        remoteOnSite: prevFilters.remoteOnSite || "",
        techStack: prevFilters.techStack || "",
        uniqueLocations,
        uniqueRoles,
        uniqueCurrencyCodes,
        uniqueCompanyNames,
        uniqueRemoteOnSite,
        uniqueTechStacks,
      }));
    }
  }, [jdList]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    const filtered = jdList.filter((job) => {
      return (
        // Location filter
        ((job.location !== null && filters.location === "") ||
          job.location
            .toLowerCase()
            .includes(filters.location.toLowerCase())) &&
        // Job Role filter
        ((job.jobRole !== null && filters.jobRole === "") ||
          job.jobRole.toLowerCase().includes(filters.jobRole.toLowerCase())) &&
        // Minimum and Maximum Experience filter
        ((job.minExp !== null && filters.minExp === "") ||
          job.minExp >= parseInt(filters.minExp)) &&
        ((job.maxExp !== null && filters.maxExp === "") ||
          job.maxExp <= parseInt(filters.maxExp)) &&
        // Minimum and Maximum Salary filter
        ((job.minJdSalary !== null && filters.minJdSalary === "") ||
          job.minJdSalary >= parseFloat(filters.minJdSalary)) &&
        ((job.maxJdSalary !== null && filters.maxJdSalary === "") ||
          job.maxJdSalary <= parseFloat(filters.maxJdSalary)) &&
        // Salary Currency Code filter
        ((job.salaryCurrencyCode !== null &&
          filters.salaryCurrencyCode === "") ||
          job.salaryCurrencyCode.toLowerCase() ===
            filters.salaryCurrencyCode.toLowerCase()) &&
        // Company Name filter
        ((job.companyName !== null && filters.companyName === "") ||
          job.company
            .toLowerCase()
            .includes(filters.companyName.toLowerCase())) &&
        // Remote/On-site filter
        ((job.remoteOnSite !== null && filters.remoteOnSite === "") ||
          job.remoteOnSite
            .toLowerCase()
            .includes(filters.remoteOnSite.toLowerCase())) &&
        // Tech Stack filter
        ((job.techStack !== null && filters.techStack === "") ||
          job.techStack
            .toLowerCase()
            .includes(filters.techStack.toLowerCase())) &&
        // Minimum Base Pay filter
        ((job.minBasePay !== null && filters.minBasePay === "") ||
          job.minBasePay >= parseFloat(filters.minBasePay))
      );
    });
    setFilteredJobs(filtered);
  }, [filters, jdList, setFilteredJobs]);

  return (
    <Box
      sx={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}
    >
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={6} sm={2}>
          <TextField
            select
            name="location"
            label="Location"
            value={filters.location}
            onChange={handleFilterChange}
            size="small"
            fullWidth
          >
            <MenuItem value="">Select</MenuItem>
            {filters.uniqueLocations.map((location) => (
              <MenuItem key={location} value={location}>
                {location}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField
            select
            name="jobRole"
            label="Job Role"
            value={filters.jobRole}
            onChange={handleFilterChange}
            size="small"
            fullWidth
          >
            <MenuItem value="">Select</MenuItem>
            {filters.uniqueRoles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField
            select
            name="salaryCurrencyCode"
            label="Currency Code"
            value={filters.salaryCurrencyCode}
            onChange={handleFilterChange}
            size="small"
            fullWidth
          >
            <MenuItem value="">Select</MenuItem>
            {filters.uniqueCurrencyCodes.map((currencyCode) => (
              <MenuItem key={currencyCode} value={currencyCode}>
                {currencyCode}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField
            name="companyName"
            label="Company Name"
            value={filters.companyName}
            onChange={handleFilterChange}
            size="small"
            fullWidth
            select
          >
            <MenuItem value="">Select</MenuItem>
            {filters.uniqueCompanyNames.map((companyName) => (
              <MenuItem key={companyName} value={companyName}>
                {companyName}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={6} sm={2}>
          <TextField
            select
            name="remoteOnSite"
            label="Remote/On-site"
            value={filters.remoteOnSite}
            onChange={handleFilterChange}
            size="small"
            fullWidth
          >
            <MenuItem value="">Select</MenuItem>
            {filters.uniqueRemoteOnSite.map((remoteOnSite) => (
              <MenuItem key={remoteOnSite} value={remoteOnSite}>
                {remoteOnSite}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField
            select
            name="techStack"
            label="Tech Stack"
            value={filters.techStack}
            onChange={handleFilterChange}
            size="small"
            fullWidth
          >
            <MenuItem value="">Select</MenuItem>
            {filters.uniqueTechStacks.map((techStack) => (
              <MenuItem key={techStack} value={techStack}>
                {techStack}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField
            name="minExp"
            label="Min Experience"
            value={filters.minExp}
            onChange={handleFilterChange}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField
            name="maxExp"
            label="Max Experience"
            value={filters.maxExp}
            onChange={handleFilterChange}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField
            name="minJdSalary"
            label="Min Base Pay"
            value={filters.minJdSalary}
            onChange={handleFilterChange}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField
            name="maxJdSalary"
            label="Max Base Pay"
            value={filters.maxJdSalary}
            onChange={handleFilterChange}
            size="small"
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Filters;
