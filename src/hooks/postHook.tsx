import React, { createContext, ReactNode, useContext, useState } from "react";
import api from "../services/api";
// import { api } from "../services/api";

export type PostProps = {
    id?: number,
    title: string,
    date: any,
    baner: any,
    subtitle: string,
    tagsArray: string[],
    content: any,
}

type AllPost = PostProps[]

type PostContextData = {
    post: PostProps
    postList: AllPost
    addPost: (postInfo: PostProps) => void
    removePost: (id: number) => void
    editPost: (data: PostProps) => void
    editPostInfo: (atribute: string, value: string) => void
    updatePost: (data: PostProps) => void

}

type PostProviderProps = {
    children: ReactNode;
}

export const PostContext = createContext({} as PostContextData);

function PostProvider({ children }: PostProviderProps) {

    const [post, setPost] = useState<PostProps>()
    const [postList, setPostList] = useState<AllPost>([] as AllPost)

    //função removendo Item
    function removePost(id: number) {
        var resultado = confirm(`Deletar Item Nº${id} da Lista?`);
        if (resultado == true) {
            var data = JSON.parse(localStorage.getItem("dados")) || {};
            var filteredData = data.filter(item => item.id !== id)
            localStorage.setItem("dados", JSON.stringify(filteredData));
            setPostList(filteredData)
            alert(`Item ${id} Excluído da Lista!`);
        } else {
            alert(`Ação cancelada!`);

        }
    }

    //função passando as informações para o Formulário
    function editPostInfo(atribute: string, value: string) {
        setPost({
            ...post,
            [atribute]: value,
        })
    }


    //função editando Post
    function editPost(data: PostProps) {
        setPost(data)
    }

    function updatePost(postData: PostProps) {
        const posts = JSON.parse(localStorage.dados)
            .map((item) => {
                if (item.id === postData.id) {
                    return postData
                } else {
                    return item
                }
            })
        localStorage.setItem('dados', JSON.stringify(posts))
    }

    //função adicionando item
    async function addPost(postInfo: PostProps) {
        try {
            if (postList.length === 0) {
                var array = ([{
                    id: 1,
                    title: postInfo.title,
                    subtitle: postInfo.subtitle,
                    tagsArray: postInfo.tagsArray,
                    date: postInfo.date,
                    content: postInfo.content,
                    baner: postInfo.baner
                }])

                // Send
                // api.post('blog/post', array)
                // .then((res) => {
                //         console.log(res.data)
                //     }).catch((err) => {
                //         console.log(err)
                //     })


                localStorage.setItem('dados', JSON.stringify(array))
                
                setPostList(array)
                return;
            }
            setPostList(OldValue => {
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
                    tagsArray: postInfo.tagsArray,
                    date: postInfo.date,
                    content: postInfo.content,
                    baner: postInfo.baner
                }])

                // Send

                api.post('blog/post', array)
                    .then((res) => {
                        console.log(res)
                    }).catch((err) => {
                        console.log(err)
                    })

                localStorage.setItem('dados', JSON.stringify(array))
                console.log(array)
                
                return array;
            })

        } catch (err) {
            console.log("Erro ao enviar o post")
        }
    }

    return (
        <PostContext.Provider value={{ post, postList, addPost, removePost, editPost, editPostInfo, updatePost }}>
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
