import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const AlertPost = () => {
  const [openItem, setOpenItem] = React.useState(false);

  const handleItemClickOpen = () => {
    setOpenItem(true);
  };

  const handleItemClose = () => {
    setOpenItem(false);
  };

  return (
    <div>
      <Button
        variant='contained'
        sx={{ borderRadius: '30px', backgroundColor: '#8B0000', mr: 2 }}
        onClick={handleItemClickOpen}
      >
        Delete
      </Button>
      <Dialog
        open={openItem}
        onClose={handleItemClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Are You Sure You Want to Delete?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Once the Post is Deleted, it cannot be recovered. Are you sure you
            want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleItemClose}>Cancel</Button>
          <Button onClick={handleItemClose} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

{
  /* <Button
onClick={() => {
  <AlertPost />;
  // const confirmation = window.confirm(
  //   'Are you sure you want to delete post? It will delete post for every user.'
  // );
  // if (confirmation) {
  //   handleDelete(post.id);
  // } else {
  //   handleClose();
  // }
}}
variant='contained'
sx={{ borderRadius: '30px', backgroundColor: '#8B0000', mr: 2 }}
>
Delete Post
</Button> */
}
