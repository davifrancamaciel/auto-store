import styled from 'styled-components'

export const Main = styled.main`
    flex: 1;
    ul {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        list-style: none;
    }

    @media (max-width:720px) {
        ul {
            grid-template-columns: 1fr;
        }
    }
`