import { getEnv } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFeacth'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'
import usericon from '@/assets/images/user.png'

const CommentList = ({ props }) => {
    const user = useSelector(state => state.user)
    const { data, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/comment/get/${props.blogid}`, {
        method: 'get',
        credentials: 'include',
    })
    console.log(data);
    
    if (loading) return <div>Loading...</div>
    return (
         <div>
            <h4 className='text-2xl font-bold'>
                {
                    props.newComment ?

                        <span className='me-2'> {data && data.comments.length + 1}</span>
                        :
                        <span className='me-2'>{data && data.comments.length}</span>
                }
                Comments</h4>
            <div className='mt-5'>

                {props.newComment
                    &&
                    <div className='flex gap-2 mb-3'>
                        <Avatar>
                            <AvatarImage src={user?.user?.avatar || usericon} className='w-10 h-10 rounded-full' />
                        </Avatar>

                        <div>
                            <p className='font-bold'>{user?.user.name}</p>
                            <p>{moment(props.newComment?.createdAt).format('DD-MM-YYYY')}</p>
                            <div className='pt-3'>
                                {props.newComment?.comment}
                            </div>
                        </div>
                    </div>
                }


                {data && data.comments.length > 0
                    &&
                    data.comments.map(comment => {
                        return (
                            <div key={comment._id} className='flex gap-2 mb-3'>
                                <Avatar>
                                    <AvatarImage src={comment?.user.avatar || usericon} className='w-10 h-10 rounded-full' />
                                </Avatar>

                                <div>
                                    <p className='font-bold'>{comment?.user.name}</p>
                                    <p>{moment(comment?.createdAt).format('DD-MM-YYYY')}</p>
                                    <div className='pt-3'>
                                        {comment?.comment}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default CommentList