import React from 'react'
import { Typography, Box, List, ListItem, Divider } from '@mui/material/'
import WbTwilightIcon from '@mui/icons-material/WbTwilight'
import BedtimeIcon from '@mui/icons-material/Bedtime'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import AdjustIcon from '@mui/icons-material/Adjust'

export const Legend = props => {
  const { allShifts, schedDate, rows } = props
  console.log('This is all shifts ', allShifts, 'scheddate ', schedDate, 'rows')

  const shiftTime =
    rows.length > 0 &&
    `${rows[0].position.start_datetime
      .split('T')[1]
      .slice(0, 5)}-${rows[0].position.end_datetime.split('T')[1].slice(0, 5)}`

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 1
      }}
    >
      <Typography variant='h6'>Current Schedule</Typography>
      <Divider variant='middle' flexItem />
      {schedDate.toDateString()}
      <List>
        {allShifts.reduce((accumulator, currentValue) => {
          if (currentValue.date !== schedDate.toISOString().split('T')[0])
            return accumulator
          accumulator.push(
            currentValue.shifts.map((shift, index) => (
              // can make the color change based on the index and set to the index of a color array ///////////
              <ListItem disablePadding key={index} sx={{ gap: 1.5 }}>
                {shift.shiftName === 'days' ? (
                  <WbSunnyIcon />
                ) : shift.shiftName === 'mids' ? (
                  <BedtimeIcon />
                ) : shift.shiftName === 'swings' ? (
                  <WbTwilightIcon />
                ) : (
                  <AdjustIcon />
                )}
                <Typography
                  sx={
                    shift.shiftName === 'days'
                      ? { color: '#ffa726' }
                      : shift.shiftName === 'mids'
                      ? { color: '#7A8AFF' }
                      : shift.shiftName === 'swings'
                      ? { color: '#4caf50' }
                      : { color: '#ee82ee' }
                  }
                >
                  {shift.shiftName && shift.shiftName.charAt(0).toUpperCase()}
                  {shift.shiftName && shift.shiftName.slice(1)}: [
                  {shift.shiftStartDateTime &&
                    shift.shiftStartDateTime.split('T')[1].slice(0, 5)}
                  -
                  {shift.shiftEndDateTime &&
                    shift.shiftEndDateTime.split('T')[1].slice(0, 5)}
                  ]
                </Typography>
              </ListItem>
            ))
          )
          return accumulator
        }, [])}
      </List>
    </Box>
  )
}
