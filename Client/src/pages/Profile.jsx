import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { getEnv } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showtoast'
import { useDispatch, useSelector } from 'react-redux'
import { Textarea } from "@/components/ui/textarea"
import { useFetch } from '@/hooks/useFeacth'
import Loading from '@/components/Loading'
import { IoCameraReverseOutline } from "react-icons/io5";
import Dropzone from 'react-dropzone'
import { setUser } from '@/redux/user/user.slice'


const Profile = () => {
    const [filePreview, setPreview] = useState()
    const [file, setFile] = useState()

    const user = useSelector((state) => state.user)

    const { data: userData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/user/get-user/${user.user._id}`,
        { method: 'get', credentials: 'include' },

    )
    console.log(userData);

    const dispatch = useDispatch()

    const formSchema = z.object({
        name: z.string().min(3, 'Name must be at least 3 character long'),
        email: z.string().email(),
        bio: z.string().min(3, "Bio must be at least 3 character long")
    })
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            bio: "",
            password: "",
        },
    })

    useEffect(() => {
        if (userData && userData.success) {
            form.reset({
                name: userData.user.name,
                email: userData.user.email,
                bio: userData.user.bio
            })
        }
    }, [userData])


    async function onSubmit(values) {
        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('data', JSON.stringify(values))
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/user/update-user/${userData.user._id}`, {
                method: 'put',
                credentials: 'include',
                body: formData
            })
            const data = await response.json()

            if (!response.ok) {
                return showToast('error', data.message)
            }
            dispatch(setUser(data.user))
            showToast('success', data.message)
        }
        catch (error) {
            showToast('error', error.message)
        }
    }

    const handleFileSelection = (files) => {
        const file = files[0]
        const preview = URL.createObjectURL(file)
        setFile(file)
        setPreview(preview)
    }

    if (loading) return <Loading />

    return (
        <Card className="max-w-screen-md mx-auto ">
            <CardContent>
                <div className='flex justify-center items-center mt-10'>
                    <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (

                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Avatar className="w-28 h-28 relative group">
                                    <AvatarImage src={filePreview ? filePreview : userData?.user.avatar} />
                                    <div className='absolute z-10 w-full h-full to-1/2 left-1/2 -translate-x-1/2  justify-center items-center bg-black opacity-50 border-2 border-violet-500 rounded-full group-hover:flex hidden cursor-pointer'>
                                        <IoCameraReverseOutline color='#8e51ff' />
                                    </div>
                                </Avatar>
                            </div>


                        )}
                    </Dropzone>

                </div>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Bio</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Enter your Bio" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Enter your password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit" className="w-full">Save changes</Button>
                        </form>

                    </Form>
                </div>
            </CardContent>
        </Card>
    )
}

export default Profile