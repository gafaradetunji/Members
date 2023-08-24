import React from 'react';
import { Modal, Backdrop, Box, Fade, Typography } from '@mui/material';
import { DeleteModalProps } from '@/types';

export const DeleteModal: React.FC<DeleteModalProps> = ({ open, onClose, onConfirm,style }) => {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box
                  style={{backgroundColor: 'white',position: 'absolute',top: '200px',left: '30px',width: '80%',paddingTop: '8px',borderRadius: '4px',height: '150px'}} 
                  className='absolute w-[80%] top-[200px] left-[30px] md:top-[30%] md:left-[30%] text-center md:pt-8 rounded-md md:w-[600px] md:h-[150px] bg-white'>
                    <Typography id="transition-modal-title" className='text-[10px]'>
                        Are you sure you want to delete this member?
                    </Typography>
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                        <button 
                          style={{ backgroundColor: '#df0000', padding: '8px 12px', borderRadius: '4px', color: 'white', marginRight: '8px'}}
                          className='bg-[#df0000] hover:bg-[#df4040] text-white font-normal py-2 px-3 me-4 rounded-md' onClick={onConfirm}>Yes</button>
                        <button
                          style={{ padding: '8px 12px', borderRadius: '4px', border: 'none'}} 
                          className='border py-2 px-3 hover:bg-[#E4F4F3] rounded-md' onClick={onClose}>No</button>
                    </Typography>
                </Box>
            </Fade>
        </Modal>
    );
}