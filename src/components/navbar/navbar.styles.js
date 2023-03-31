import styled from "styled-components";

import { Link } from "react-router-dom";

export const NavigationContainer = styled.div`
  padding-right: 20px;
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
`;

export const BrandName = styled.span`
  margin-left: 5px;
`

export const NavLinksContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;


export const AppContainer = styled.div`
  padding: 20px;
`
// .navigation {
//   padding-right: 20px;
//   height: 70px;
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 25px;

//   .logo-container {
//     height: 100%;
//     width: 70px;
//     padding: 25px;
//   }

//   .nav-links-container {
// width: 50%;
// height: 100%;
// display: flex;
// align-items: center;
// justify-content: flex-end;

//     .nav-link {
// padding: 10px 15px;
// cursor: pointer;
//     }
//   }
// }
// .app-container {
//   padding: 20px;
// }
