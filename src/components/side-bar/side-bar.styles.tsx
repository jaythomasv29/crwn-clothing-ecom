import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const SidebarLayout = styled.div`
display: flex;
height: 100vh;
position: absolute;
left: 0;
`

export const SidebarContainer = styled.div`
width: 200px;
// background: #f8f8f8;
padding: 16px;
`


export const SidebarContent = styled.div`
flex-grow: 1;
padding: 16px;
`

export const SidebarLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const SidebarLink = styled(Link)`
padding: 5px;
`
