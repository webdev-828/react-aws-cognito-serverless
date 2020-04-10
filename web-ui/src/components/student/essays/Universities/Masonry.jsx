import React, { Children } from "react";
import styled from 'styled-components';

Masonry.Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
    grid-gap: ${({ gridGap }) => gridGap};
`;

Masonry.Column = styled.div`
    display: grid;
    grid-gap: ${({ gridGap }) => gridGap};
    grid-auto-rows: max-content;
`;

export default function Masonry({
    columns = 3,
    gridGap = "1rem",
    isProvideLi = true,
    children
}) {
    const output = Children.toArray(children).reduce((acc, child, i) => {
        acc[i % columns] = [
        ...acc[i % columns],
        isProvideLi ? <div key={child.key}>{child}</div> : child
        ];
        return acc;
    }, new Array(columns).fill([]));

    return (
        <Masonry.Wrapper columns={columns} gridGap={gridGap}>
            {output.map((column, i) => (
                <Masonry.Column key={i} gridGap={gridGap}>
                {column}
                </Masonry.Column>
            ))}
        </Masonry.Wrapper>
    );
}
