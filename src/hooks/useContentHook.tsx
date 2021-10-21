//add by id
//excluir by id
// transform to JSON
import React, { createContext, ReactNode, useContext, useState } from "react";

export type ContentProps = {
    id: number,
    type?: string,
    content?: any,
}

type AllContent = ContentProps[]

type ContentContextData = {
    content: AllContent,
    // contentSection: AllContent,
    addContent: () => void
    // addContentSection: () => void
    removeContent: (id: number) => void
    // removeContentSection: (id: number) => void
    switchType: (id: number, type: any) => void
    // switchTypeSection: (id: number, type: any) => void
    switchContent: (id: number, content: any) => void
    // switchContentSection: (id: number, content: any) => void
}

type ContentProviderProps = {
    children: ReactNode;
}

export const ContentContext = createContext({} as ContentContextData);

function ContentProvider({ children }: ContentProviderProps) {

    const [content, setContent] = useState<AllContent>([] as AllContent)
    // const [contentSection, setContentSection] = useState<AllContent>([] as AllContent)

    //função removendo item
    function removeContent(id: number) {
        setContent(oldValue => {
            var filtered = oldValue.filter((data) => {
                return data.id !== id

            });
            return filtered;
        })
    }

    //função adicionando conteúdo no Post
    function addContent() {
        if (content.length === 0) {
            setContent([{ id: 1 }])
            return;
        }
        setContent(OldValue => {
            let newId;
            let i = 0;

            OldValue.map((data) => {
                i++;
                if (i === OldValue.length) {
                    newId = data.id + 1;
                }
            })
            return content.concat([{ id: newId }])
        })
    }

    //função alterando o tipo do item
    function switchType(id: number, type: string) {
        console.log(type, id)
        setContent(oldValue => {
            var filtered = oldValue.filter((data) => {
                if (data.id === id) {
                    data.type = type
                }
                return data
            });
            return filtered;
        })
    }

    //função alterando o conteúdo do item
    function switchContent(id: number, content: any) {
        setContent(oldValue => {
            var filtered = oldValue.filter((data) => {
                if (data.id === id) {
                    data.content = content
                }
                return data
            });
            return filtered;
        })
    }


    return (
        <ContentContext.Provider value={{
            content,
            addContent,
            removeContent,
            switchType,
            switchContent,
        }}>
            {children}
        </ContentContext.Provider>
    )
}

function useContent() {
    return useContext(ContentContext);
}

export {
    ContentProvider,
    useContent
}
