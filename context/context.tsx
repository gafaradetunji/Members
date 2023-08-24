"use client"
import React, { createContext, useState, useEffect, useContext } from 'react';
import { MemberInfo, MemberContextType, MemberProviderProps } from '@/types';
import { manufacturerProduct } from '@/context/memberApi';
import axios from 'axios';

const api = 'https://jsonplaceholder.typicode.com/users';


const MemberContext = createContext({} as MemberContextType)
export const useMemberContext = () => useContext(MemberContext);


export const MemberProvider: React.FC<MemberProviderProps> = ({ children }: MemberProviderProps) => {
  const [members, setMembers] = useState<MemberInfo[]>([]);
  
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get(api);
      const data = response.data;
      setMembers(data);
    } catch (error) {
      console.error(error);
      setMembers(manufacturerProduct);
    }
  };

  const getMember = () => {
    return members;
  }
  const editMember = (id: number, updatedMember: Partial<MemberInfo>) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) => (member.id === id ? { ...member, ...updatedMember } : member))
    );
  };

  const deleteMember = (id: number) => {
    setMembers((prevMembers) => prevMembers.filter((member) => member.id !== id));
  };

  const searchMembers = async (query: string) => {
    if (query.trim() === '') {
        fetchMembers();
    } else {
      try {
        const response = await axios(`${api}?q=${query}`);
        if (!response.data) {
          throw new Error('Failed to fetch data from the API');
        }
        const data = await response.data;
        setMembers(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const contextValue: MemberContextType = {
    getMember,
    editMember,
    deleteMember,
    searchMembers
  };

  return <MemberContext.Provider value={contextValue}>{children}</MemberContext.Provider>;
};
