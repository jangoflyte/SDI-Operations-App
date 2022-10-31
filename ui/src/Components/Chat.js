import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Avatar,
  Stack,
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContactlessIcon from '@mui/icons-material/Contactless';
import FacebookIcon from '@mui/icons-material/Facebook';

export const Chat = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography
        variant='h3'
        ml={10}
        pb={4}
        sx={{ fontWeight: 'bold', width: 500 }}
      >
        Chat
      </Typography>
      <Card sx={{ width: 350, m: 2, p: 2 }}>
        <CardActionArea>
          <CardContent>
            <a
              href='https://web.whatsapp.com/'
              rel='noreferrer'
              target='_blank'
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <Stack direction='row'>
                <Avatar sx={{ bgcolor: '#25D366' }}>{<WhatsAppIcon />} </Avatar>
                &nbsp;<Typography variant='h4'>WhatsApp</Typography>
              </Stack>
            </a>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card sx={{ width: 350, m: 2, p: 2 }}>
        <CardActionArea>
          <CardContent>
            <a
              href='https://signal.org/download/'
              rel='noreferrer'
              target='_blank'
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <Stack direction='row'>
                <Avatar sx={{ bgcolor: '#006AFF' }}>
                  {<ContactlessIcon />}{' '}
                </Avatar>
                &nbsp;<Typography variant='h4'>Signal</Typography>
              </Stack>
            </a>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card sx={{ width: 350, m: 2, p: 2 }}>
        <CardActionArea>
          <CardContent>
            <a
              href='https://www.messenger.com/'
              rel='noreferrer'
              target='_blank'
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <Stack direction='row'>
                <Avatar sx={{ bgcolor: '#4267B2' }}>{<FacebookIcon />}</Avatar>
                &nbsp;<Typography variant='h4'>Facebook Messenger</Typography>
              </Stack>
            </a>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};
