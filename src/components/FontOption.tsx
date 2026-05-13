import React from 'react';

interface FontOptionProps {
    props: React.HTMLAttributes<HTMLLIElement>;
    option: string;
}

export const FontOption: React.FC<FontOptionProps> = ({ props, option }) => {
    return (
        <li {...props} style={{ ...props.style, fontFamily: option, fontSize: '0.9rem' }}>
            {option}
        </li>
    );
}
