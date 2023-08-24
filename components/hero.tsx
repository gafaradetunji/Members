"use client"
import { useState } from "react";
import Image from "next/image"
import img from '../public/gafar.jpeg'
import { StarRating } from "./starRating";
import { ArrowDown } from 'iconsax-react'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useMemberContext } from "@/context/context";
import { DeleteModal } from "@/utils/delete";
import { Modal, Backdrop, Box, Fade, Typography } from '@mui/material'
import { MemberInfo } from "@/types";

const Hero = () => {
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const { getMember, deleteMember, editMember } = useMemberContext();
    const manufacturerProduct = getMember();
    const totalPages = Math.ceil(manufacturerProduct.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const [deleteItemId, setDeleteItemId] = useState<number | null>(null)
    const selectedItems = manufacturerProduct.slice(startIndex, startIndex + itemsPerPage);
    const [editOpen, setEditOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<MemberInfo | null>(null);

  const handleEditClose = () => {
    setEditOpen(false);
  };
  const handleEditMember = (member: MemberInfo) => {
    setEditingMember(member);
    setEditOpen(true);
};

    const handleOpen = (id: number) => {
        setDeleteItemId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDeleteItemId(null);
    };

    const handleRemoveMember = () => {
        if (deleteItemId !== null) {
            deleteMember(deleteItemId);
        }
        handleClose();
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        if (editingMember) {
          editMember(editingMember.id, {
            name: editingMember.name,
            username: editingMember.username,
            email: editingMember.email,
            city: editingMember.address?.city,
          });
          setEditOpen(false);
          setEditingMember(null);
        }
      }
      const handleRatingChange = (newRating: number) => {
        if (editingMember) {
          setEditingMember({ ...editingMember, rating: newRating });
        }
      };
    
    return (
        <main>

        <div className='w-[100%] m-auto overflow-x-auto lg:max-w-[1100px]'>
            <table className='lg:w-full  w-[1100px] table-auto'>
                <thead className='font-normal text-left text-[14px] bg-[#E4F4F3] text-[#707370] w-full text-[12px] font-semibold'>
                <tr>
                    <th className=''></th>
                    <th className=''><input type='checkbox' className='w-[15px] h-[20px] me-3'/>Name<ArrowDown className="inline"/></th>
                    <th>Status</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Rating</th>
                    <th></th>
                </tr>
                </thead>
                <tbody className='pl-8'>
                    {manufacturerProduct
                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                        .map((item, index) => (
                        <tr key={index} className='border items-center h-[70px] pl-8'>
                            <td className=''><input type='checkbox' /></td>
                            <td className='flex mt-4'>
                                <div className=''><Image src={img} alt='' className='h-[40px] w-[40px] rounded-full me-4'/></div>
                                <div className=''>
                                    <span className='block'>{item.name}</span>
                                    <span className='text-[14px] text-[#707370]'>{item.username}</span>
                                </div>
                            </td>
                            <td className='uppercase text-[12px]'><span className={`${item.status? 'text-[#004c00] bg-[#b2ffb2]' : 'text-[#df0000] bg-[#FF8A8A]' } font-bold px-2`}>{item.status ? 'Active' : 'inactive'}</span></td>
                            <td className=''>{item.email}</td>
                            <td className=''>{item.address?.city}</td>
                            <td className=''><StarRating rating={item.rating}/></td>
                            <td>
                                <button className="text-[#707370]" onClick={() => handleOpen(item.id)}><DeleteOutlineOutlinedIcon /></button>
                                <button className="text-[#707370]" onClick={() => {handleEditMember(item)}}><EditOutlinedIcon /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> 
            <DeleteModal
                open={open}
                onClose={handleClose}
                onConfirm={handleRemoveMember}
            />  
            {editingMember && (
                <Modal
                    aria-labelledby='transition-modal-title'
                    aria-describedby='transition-modal-description'
                    open={editOpen}
                    onClose={handleEditClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                        timeout: 500,
                        },
                }}
                >
                    <Fade in={editOpen}>
                        <Box className='bg-white lg:w-[400px] absolute md:top-[10%] lg:left-[30%] h-[500px] p-3'>
                        <Typography id='transition-modal-title' variant='h6' component='h2'>
                            Edit Member Details
                        </Typography>
                        <form onSubmit={handleFormSubmit}>
                            <div className='m-4'>
                                <label>Name:</label>
                                <input
                                    className='border rounded-md h-[40px] w-[350px] pl-4 flex'
                                    type='text'
                                    value={editingMember.name}
                                    onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                                />
                            </div>
                            <div className='m-4'>
                            <label>Username:</label>
                            <input
                                className='border rounded-md h-[40px] w-[350px] pl-4 flex'
                                type='text'
                                value={editingMember.username}
                                onChange={(e) => setEditingMember({ ...editingMember, username: e.target.value })}
                            />
                            </div>
                            <div className='m-4'>
                            <label>Email:</label>
                            <input
                                className='border rounded-md h-[40px] w-[350px] pl-4 flex'
                                type='text'
                                value={editingMember.email}
                                onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                            />
                            </div>
                            <div className='m-4'>
                            <label>Roles:</label>
                            <input
                                className='border rounded-md h-[40px] w-[350px] pl-4 flex'
                                type='text'
                                value={editingMember.city}
                                onChange={(e) => setEditingMember({ ...editingMember, city: e.target.value })}
                            />
                            </div>
                            <div>
                                <label>Rating:</label>
                                <StarRating rating={editingMember.rating} onChange={handleRatingChange} />
                            </div>
                            <div className='mt-5 text-center'>
                            <button type='submit' className='bg-[#df0000] hover:bg-[#df4040] text-white font-normal py-2 px-3 me-4 rounded-md'>Save</button>
                            <button type='button' className='hover:bg-[#E4F4F3] text-black font-normal py-2 px-3 me-4 rounded-md' onClick={handleEditClose}>
                                Cancel
                            </button>
                            </div>
                        </form>
                        </Box>
                    </Fade>
                </Modal>
            )}
        </div>
            <div className="flex h-[100px] items-center justify-between px-12">
                <p className="hidden md:block">Showing {Math.min(manufacturerProduct.length, currentPage * itemsPerPage)} of {manufacturerProduct.length}</p>
                <div className="w-[220px] flex justify-between">
                    <button 
                        className='bg-[#fff] text-black px-4 py-2 rounded-md border-[2px] ml-4 cursor-pointer'
                        onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}
                    >Previous</button>
                    <button 
                        className='bg-[#fff] text-black px-4 py-2 rounded-md border-[2px] mr-4 cursor-pointer'
                        onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}
                        >Next</button>
                </div>
            </div>
        </main>

    );
}
 
export default Hero;
