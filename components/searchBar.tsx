"use client"
import React, { useState, useEffect } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useMemberContext } from '@/context/context';


const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { searchMembers } = useMemberContext()

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        searchMembers(event.target.value);
    };

    return (
        <form className='mt-5'>
            <SearchOutlinedIcon className="absolute text-[#707370] mt-[10px] ml-[10px]"/>
            <input type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-[300px] h-[40px] border border-[#707370] rounded-md pl-12 focus:outline-none py-2"
              />
        </form>
    );
}
 
export default SearchBar;
