import styled from 'styled-components';

export const Wrapper = styled('section') `
    background-color: #FFFFFF;
    box-shadow: 0px 10px 20px rgba(180, 186, 200, 0.3);
    border-radius: 12px;
`;

export const Title = styled('div')`
    display: flex;
    justify-content: space-between;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 32px;
    align-items: center;
    color: #626C82;
    padding-top: 24px;
`;

export const Date = styled('p')`    
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 21px;
    color: #B4BAC8;
`

export const Header = styled('div') `
    width: 100%;
`;

export const Body = styled('div') `
    width: 100%;
    height: 30px;
`;

export const EWrapper = styled('div') `
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`
