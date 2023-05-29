import { Avatar, ListItemAvatar, Typography } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

export default function JobItem({job, last}) {
  const navigate = useNavigate();
  
  function handleJobClick(id) {
    navigate({
      pathname: "/jobs",
      search: createSearchParams({
          id
      }).toString()
    })
  }
  return (
    <>
      <ListItem>
        <ListItemButton alignItems='flex-start' onClick={() => handleJobClick(job.NO_ID_FIELD)}>
          <ListItemAvatar>
            <Avatar alt="Company Logo" src="" />
          </ListItemAvatar>
          <ListItemText
            style={{
              borderBottom: !last? '1px solid lightGrey': '',
              paddingBottom: 16
            }}
            primary={job?.title}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {job.companyId}
                </Typography>
                {` — ${job.location} - ${job.type}`}
              </React.Fragment>
              }
            />
          </ListItemButton>
        </ListItem>
    </>
  );
}