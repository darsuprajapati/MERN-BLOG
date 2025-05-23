import React from 'react'
import { Card, CardContent } from './ui/card'
import usericon from '@/assets/images/user.png'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Badge } from "@/components/ui/badge"
import { useSelector } from 'react-redux'
import { FaRegCalendarAlt } from 'react-icons/fa'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { RouteBlogDetails } from '@/helpers/RouteName'


const BlogCard = ({ props }) => {
    const user = useSelector((state) => state.user)
    console.log(props);

    return (
        <Link to={RouteBlogDetails(props.category.slug, props.slug)}>
            <Card className="pt-5">
                <CardContent>
                    <div className='flex items-center justify-between'>
                        <div className='flex justify-between items-center gap-2'>
                            <Avatar>
                                <AvatarImage src={props.author.avatar || usericon} width={30} height={30} />
                            </Avatar>
                            <span>{props.author.name}</span>
                        </div>
                        {props.author.role === 'admin' &&
                            <Badge variant="outline" className="bg-violet-500">Admin</Badge>
                        }
                    </div>

                    <div className='my-2'>
                        <img src={props.featuredImage} className='rounded aspect-square object-cover' />
                    </div>
                    <div>
                        <p className='flex items-center gap-2 mb-2'>
                            <FaRegCalendarAlt />
                            <span>{moment(props.createdAt).format('DD-MM-YYYY')}</span>
                        </p>
                        <h2 className='text-2xl font-bold line-clamp-1'>{props.title}</h2>
                    </div>

                </CardContent>
            </Card>
        </Link> 
    )
}

export default BlogCard