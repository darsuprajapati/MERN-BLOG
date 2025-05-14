import React, { useEffect, useState } from 'react'
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFeacth';
import { showToast } from '@/helpers/showtoast';

const LikeCount = ({ props }) => {
    const [likeCount, setLikeCount] = useState(0)
    const [hasLiked, setHasLiked] = useState(false)
    const user = useSelector(state => state.user)
    const userId = user?.isLoggedIn ? user.user._id : ''

    const { data: blogLikeCount, loading, error } = useFetch(
        `${getEnv('VITE_API_BASE_URL')}/blog-like/get-like/${props.blogid}?userid=${userId}`,
        {
            method: 'get',
            credentials: 'include',
        }
    )

    useEffect(() => {
        if (blogLikeCount) {
            setLikeCount(blogLikeCount.likecount)
            setHasLiked(blogLikeCount.isUserliked)
        }
    }, [blogLikeCount])

    const handleLike = async () => {
        try {
            if (!user.isLoggedIn) {
                return showToast('error', 'Please login into your account.')
            }

            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/blog-like/do-like`, {
                method: 'post',
                credentials: 'include',
                headers: { 'Content-type': "application/json" },
                body: JSON.stringify({ user: user.user._id, blogid: props.blogid })
            })

            if (!response.ok) {
                return showToast('error', response.statusText)
            }

            const responseData = await response.json()
            setLikeCount(responseData.likecount)
            setHasLiked(!hasLiked)

        } catch (error) {
            showToast('error', error.message)
        }
    }

    return (
        <button onClick={handleLike} type='button' className='flex justify-between items-center gap-1'>
            {hasLiked ? <FaHeart fill='red' /> : <FaRegHeart />}
            {likeCount}
        </button>
    )
}

export default LikeCount
