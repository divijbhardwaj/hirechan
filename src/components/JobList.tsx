import List from '@mui/material/List';
import JobItem from './JobItem';
import { Data, Props } from '../interface'

export default function JobList(props: Props) {
  return (
    <List {...props}>
      {props.jobs.map((job: Data, i: number) => <JobItem key={i} job={job} last={i === props.jobs.length-1}/>)}
    </List>
  );
}