import List from '@mui/material/List';
import JobItem from './JobItem';

export default function JobList(props) {
  return (
    <List {...props}>
      {props.jobs.map((job, i) => <JobItem key={i} job={job} last={i === props.jobs.length-1}/>)}
    </List>
  );
}