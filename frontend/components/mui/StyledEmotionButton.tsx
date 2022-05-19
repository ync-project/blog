import styled from '@emotion/styled'

interface IButtonProps { 
    backgroundColor: string;
}

const StyledButton = styled.button<IButtonProps>`
    padding: 32px;
    background-color: ${(props) => props.backgroundColor};
    font-size: '24px';
    border-radius: '4px';
    color: black;
    font-weight: bold;
    &:hover {
        color: white;
    },
`

const StyledEmotionButton = () => {
    return (
        <StyledButton backgroundColor='green'>
            This is my button component.
        </StyledButton>
    )
}

export default StyledEmotionButton