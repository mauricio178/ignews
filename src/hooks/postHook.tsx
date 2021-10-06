import React, { createContext, ReactNode, useContext, useState } from "react";
import { useContent } from "./useContentHook";

export type PostProps = {
    id?: number,
    title: string,
    date: any,
    baner: any,
    subtitle: string,
    tags: string
    content: any,
}

type AllPost = PostProps[]

type PostContextData = {
    post: AllPost
    addPost: (postInfo: PostProps) => void
    removePost: (id: number) => void
}

type PostProviderProps = {
    children: ReactNode;
}

export const PostContext = createContext({} as PostContextData);

function PostProvider({ children }: PostProviderProps) {

    const [post, setPost] = useState<AllPost>([] as AllPost)

    // var postInfo = JSON.parse(localStorage.getItem('dados'))

    //função removendo item
    function removePost(id: number) {
        setPost(oldValue => {
            var filtered = oldValue.filter((data) => {
                return data.id !== id

            });
            return filtered;
        })
    }

    //função adicionando item
    function addPost(postInfo: PostProps) {
        try {
            if (post.length === 0) {
                setPost([{
                    id: 1,
                    title: postInfo.title,
                    subtitle: postInfo.subtitle,
                    tags: postInfo.tags,
                    date: postInfo.date,
                    content: postInfo.content,
                    baner: postInfo.baner
                }])
                return;
            }
            setPost(OldValue => {
                let newId;
                let i = 0;

                OldValue.map((data) => {
                    i++;
                    if (i === OldValue.length) {
                        newId = data.id + 1;
                    }
                })
                let array = OldValue.concat([{
                    id: newId,
                    title: postInfo.title,
                    subtitle: postInfo.subtitle,
                    tags: postInfo.tags,
                    date: postInfo.date,
                    content: postInfo.content,
                    baner: postInfo.baner
                }])

                    console.log(array, 'array')
                localStorage.setItem('dados', JSON.stringify(array))

                return array;
            })

        } catch (err) {
            console.log("Erro ao enviar o post")
        }
    }

    return (
        <PostContext.Provider value={{ post, addPost, removePost }}>
            {children}
        </PostContext.Provider>
    )
}

function usePost() {
    return useContext(PostContext);
}

export {
    PostProvider,
    usePost
}
