import React, { useState, useEffect } from "react";
import { CircularProgress, Grid, Typography, Box } from "@mui/material";
import JobCardItem from "./JobCardItem";
import { fetchJobs } from "../redux/slices/jobSlice";
import Filters from "./Filters";
import { useSelector, useDispatch } from "react-redux";

const JobCard = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.list);
  const loading = useSelector((state) => state.jobs.loading);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    dispatch(fetchJobs({ limit: 10, offset: 0 }));
  }, [dispatch]);

  useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);

  const handleFilteredJobs = (filtered) => {
    setFilteredJobs(filtered);
  };

  return (
    <>
      <Filters jdList={jobs} setFilteredJobs={handleFilteredJobs} />
      {loading && <CircularProgress />}
      {!loading && filteredJobs.length === 0 && (
        <Box sx={{ textAlign: "center", marginTop: 20 }}>
          <Typography variant="h6">No jobs found.</Typography>
        </Box>
      )}
      {!loading && filteredJobs.length > 0 && (
        <Grid container spacing={2}>
          {filteredJobs.map((job) => (
            <Grid item key={job.jdUid} xs={12} sm={6} md={4} lg={3}>
              <JobCardItem job={job} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default JobCard;
