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
    content: AllContent
    addC: () => void
    removeC: (id: number) => void
    switchType: (id: number, type: any) => void
    switchContent: (id: number, content: any) => void

}

type ContentProviderProps = {
    children: ReactNode;
}

export const ContentContext = createContext({} as ContentContextData);

function ContentProvider({ children }: ContentProviderProps) {

    const [content, setContent] = useState<AllContent>([] as AllContent)

    //função removendo item
    function removeC(id: number) {
        setContent(oldValue => {
            var filtered = oldValue.filter((data) => {
                return data.id !== id
                
            });
            return filtered;
        })
    }
    
    //função adicionando item
    function addC() {
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
                    console.log("console content > ", data)
                    data.content = content
                }
                return data
            });
            return filtered;
        })
    }


  

    return (
        <ContentContext.Provider value={{ content, addC, removeC, switchType, switchContent }}>
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
