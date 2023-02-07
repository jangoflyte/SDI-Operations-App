import React, { useState } from 'react';
import { Typography, Box, List, ListItem, Divider } from '@mui/material/';

export const Legend = props => {
  // const [legend, setLegend] = useState([]);
  const { allShifts, schedDate } = props;

  // const getLegend = async () => {};

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 1,
      }}
    >
      <Typography variant='h6'>Current Schedule</Typography>
      <Divider variant='middle' flexItem />
      <List>
        {schedDate.toDateString()}

        {allShifts.map((index, shift) => (
          <ListItem disablePadding key={index}>
            <Typography>{shift}</Typography>
          </ListItem>
        ))}

        {/* {allShifts.reduce((accumulator, currentValue) => {
          if (currentValue.date !== date.toISOString().split('T')[0])
            return accumulator;
          accumulator.push(
            currentValue.shifts.map((buttonShift, index) => (
              // can make the color change based on the index and set to the index of a color array ///////////
              <Button
                key={index}
                fullWidth={true}
                color={
                  buttonShift === 'days'
                    ? 'warning'
                    : buttonShift === 'mids'
                    ? 'info'
                    : 'success'
                }
                sx={
                  shift === 'days' &&
                  buttonShift === 'days' &&
                  schedDate.toDateString() === date.toDateString()
                    ? {
                        backgroundColor: 'rgba(229, 115, 115, 0.2)',
                        borderRadius: 0,
                      }
                    : shift === 'mids' &&
                      buttonShift === 'mids' &&
                      schedDate.toDateString() === date.toDateString()
                    ? {
                        backgroundColor: 'rgba(66, 135, 245, 0.2)',
                        borderRadius: 0,
                      }
                    : shift === 'swings' &&
                      buttonShift === 'swings' &&
                      schedDate.toDateString() === date.toDateString()
                    ? {
                        backgroundColor: 'rgba(76, 175, 80, 0.2)',
                        borderRadius: 0,
                      }
                    : { borderRadius: 0 }
                }
              >
                {buttonShift}
              </Button>
            ))
          );
          return accumulator;
        }, [])} */}
      </List>
    </Box>
  );
};
