import styled from 'styled-components';

export const Container = styled.div`
    width: ${props => props.width};
    max-width: ${props => props.maxWidth};
    min-width: ${props => props.minWidth};
    height: ${props => props.height};
    min-height: ${props => props.minHeight};
    padding: ${props => props.padding};
    margin: ${props => props.margin};
    border: ${props => props.border};
    border-radius: ${props => props.borderRadius};
    background-color: ${props => props.backgroundColor};
    opacity: ${props => props.opacity};
    display: ${props => props.display};
    justify-content: ${props => props.justifyContent};
    align-items: ${props => props.alignItems};
    flex-direction: ${props => props.flexDirection};
    overflow-x: ${props => props.overflowX};
    overflow: ${props => props.overflow};
    color: ${props => props.color};
`

export default Container
