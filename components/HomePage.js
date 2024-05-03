import React,{useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import JobCard from './JobCard';
import { fetchJobs } from '../redux/slices/jobSlice';

const HomePage = ({job}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobs({ limit: 10, offset: 0 }));
  }, [dispatch]);

  return (
    <div>
      <JobCard job={job}/>
    </div>
  );
};

export default HomePage;
