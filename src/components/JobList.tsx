import { Avatar, ListItemAvatar, Typography } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';

export default function JobList() {
  return (
    <>
      <ListItem>
        <ListItemButton alignItems='flex-start'>
          <ListItemAvatar>
            <Avatar alt="Company Logo" src="" />
          </ListItemAvatar>
          <ListItemText
            style={{
              borderBottom: '1px solid lightGrey',
              paddingBottom: 16
            }}
            primary="Brunch this weekend? Brunch this weekend? Brunch this weekend?"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
              }
            />
          </ListItemButton>
        </ListItem>
    </>
  );
}