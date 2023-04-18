import React from 'react'
import { SidebarContainer, SidebarContent, SidebarLayout, SidebarLink, SidebarLinksContainer } from './side-bar.styles'
import { Outlet } from 'react-router-dom'


const Sidebar = ({ titles }: { titles: string[] }) => {
  return (
    <SidebarLayout>
      <SidebarContainer>
        <h3>Store</h3>
        <p>Categories</p>
        <SidebarLinksContainer>
          {
            titles.map(title => {
              return <div key={title}><SidebarLink to={`/admin/${title}`}>{title[0].toUpperCase() + title.slice(1)}</SidebarLink></div>
            })
          }
        </SidebarLinksContainer>
      </SidebarContainer>
      <SidebarContent>

      </SidebarContent>
      <Outlet />
    </SidebarLayout>
  )
}

export default Sidebar