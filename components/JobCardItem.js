import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Divider, Box, IconButton, Grid } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Business as BusinessIcon } from '@mui/icons-material'; 

const JobCardItem = ({ job }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 390, marginBottom: '20px', mt: 5 ,borderRadius: 5, boxShadow: 1,m:2}}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={3} sm={2}>
            {/* Assuming job.officeIcon is a URL pointing to an image */}
             {job.officeIcon ? (
              <IconButton>
                <img src={job.officeIcon} alt="Office Icon" style={{ width: '40px', height: '40px' }} />
              </IconButton>
            ) : (
              <IconButton>
                <BusinessIcon style={{ width: '40px', height: '40px' }} />
              </IconButton>
            )}
          </Grid>
          <Grid item xs={9} sm={10}>
            <Typography variant="h6">{job.company}</Typography>
            <Typography variant="subtitle1">{job.jobRole}</Typography>
            <Typography variant="body2" color="textSecondary">{job.location}</Typography>
          </Grid>
        </Grid>
        <Divider />
        <Box mt={2}>
          <Typography variant="body2" color="textSecondary">Estimated Salary - $ {job.minJdSalary} - {job.maxJdSalary} LPA</Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="h6">About the Company:</Typography>
          <Typography variant="subtitle1">About us</Typography>
          <Typography variant="body2" color="textSecondary">{job.jobDetailsFromCompany}</Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="body2" color="textSecondary">
          {expanded ? (job.description ? job.description : '') : (job.description ? `${job.description.substring(0, 10)}...` : '')}
          </Typography>
        </Box>
        <Box mt={2}>
          <Button
            variant="text"
            sx={{color:'#0288d1',textTransform:'capitalize' }}
            onClick={handleExpandClick}
            startIcon={<ExpandMoreIcon />}
            fullWidth
          >
            {expanded ? 'Hide Description' : 'Show Description'}
          </Button>
        </Box>
        <Box mt={2}>
          <Typography variant="h6">Minimum Experience</Typography>
          <Typography variant="body2" color="textSecondary">{job.minExp} - {job.maxExp} years</Typography>
        </Box>
        <Box mt={2}>
          <Button variant="contained" color="warning" sx={{background:'#4aedc4',color:'#212121' }} fullWidth>
            Apply
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobCardItem;
