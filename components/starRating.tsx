"use client"
import React from 'react'
import { Star1 } from 'iconsax-react'
import { StarProps } from '@/types'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';


export const StarRating: React.FC<StarProps> = ({ rating, style, onChange }) => {
  const maxRating = 5;

    return(
        <div className='flex'>
            {Array(maxRating)
              .fill(0, 0, maxRating)
              .map((_, i) => (
                <StarBorderOutlinedIcon key={i}
                  className={`${i < rating ? 'text-blue-500' : 'text-gray-300'}`}
                />
            ))}
        </div>

    )
}
