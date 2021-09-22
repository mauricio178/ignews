//add by id
//excluir by id
// transform to JSON

import React, { useState } from 'react';

type ContentProps = {
    id: number,
}

type AllContent = ContentProps[]

export default function useContentHook() { // create hook of content 22/09

    const [content, setContent] = useState<AllContent>([] as AllContent)

    return {

        content,
        
        adcContent: () => {
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
                    console.log(data)
                })
                return OldValue.concat({ id: newId })
            })
        },

        removeContent: () => {
            setContent(OldValue => {
                let filtered = OldValue.filter((data, id) => {
                    console.log(data.id, 'ta aq')
                })
                return filtered;
            })
        }

    }
}