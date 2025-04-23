import React from "react";
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

function RTE({
    name,
    control,
    label,
    defaultValue = ''
}) {
    return (
        <div className="m-4 text-start space-y-2">

            {label && <label className="text-xl m-1">{label}</label>}

            <Controller
                name={name || "Content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey="q16eqs4xqkwl0hlk65q8jmn0ny6bx1s45050qw8cq9yxfr7y"
                        initialValue={defaultValue}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic underline forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />

        </div>
    )
}

export default RTE