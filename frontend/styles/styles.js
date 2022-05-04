import styled from 'styled-components'

export const Header = styled.div`
  display: block;
  min-height: 4rem;
  width: 100%;
  margin-bottom: 25px;
  & a {
    font-size: 15px;
    margin-right: 15px;
    text-decoration: none;
    :hover {
      color: #003bff;
    }
  }
`

export const SignedInStatus = styled.div`
  display: block;
  min-height: 4rem;
  width: 100%;
`
export const NotSignedInText = styled.span`
  padding-top: 0.8rem;
  left: 1rem;
  right: 6.5rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: inherit;
  z-index: 1;
  line-height: 1.3rem;
`

export const Avatar = styled.span`
  border-radius: 2rem;
  float: left;
  height: 2.8rem;
  width: 2.8rem;
  background-color: white;
  background-size: cover;
  background-repeat: no-repeat;
  margin-right: 0.6rem;
`

export const Abutton = styled.a`
  float: right;
  margin-right: -0.4rem;
  font-weight: 500;
  border-radius: 0.3rem;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1.4rem;
  position: relative;
  z-index: 10;
  background-color: transparent;
  color: #555;
}
`

export const PrimaryButton = styled(Abutton)`
  background-color: #346df1;
  border-color: #346df1;
  color: #fff;
  text-decoration: none;
  padding: 0.7rem 1.4rem;
`


export const NavItems = styled.nav`
  margin-bottom: 2rem;
  padding: 0;
  list-style: none;
  
  &.navItem {
    display: inline-block;
    margin-right: 1rem;
  }

  & a{
    display: inline-block;
    margin-right: 1rem;
  }

  .is-active {
    padding: 0.4rem;
    color: white;
    background-color: #1b9db7;
  }

  button {
    float: right;
    border-radius: 0.3rem 0.3rem 0.3rem 0.3rem;
  }

  button a {
    color: #a8ea75;
    cursor: pointer;
  }
  
`

export const Suggestions = styled.div`
    left: 0;
    right: 0;
    z-index: 10;
`
export const Footer = styled.span`
    .footer {
        margin-top: 2rem;
    }
    
    .navItems {
        margin-bottom: 1rem;
        padding: 0;
        list-style: none;
    }
    
    .navItem {
        display: inline-block;
        margin-right: 1rem;
    }
  `

export const Section = styled.section`
    padding-bottom: 20px;
    li {
          display: block;
          margin-bottom: 10px;
    }
    div {
        align-items: center;
        display: flex;
    }
    a {
        font-size: 14px;
        margin-right: 10px;
        text-decoration: none;
        padding-bottom: 0;
        border: 0;
    }
    span {
        font-size: 14px;
        margin-right: 5px;
    }
    ul {
        margin: 0;
        padding: 0;
    }
`

export const Button = styled.button`
    :before {
        align-self: center;
        border-style: solid;
        border-width: 6px 4px 0 4px;
        border-color: #ffffff transparent transparent transparent;
        content: '';
        height: 0;
        margin-right: 5px;
        width: 0;
    }   
`

export const ChapterList = styled.div`
    margin-top: 25px;
    max-height: 200px;
    overflow: scroll;
    width: 100%;
`

export const VoteButton = styled.button`
    background-color: transparent;
    border: 1px solid #e4e4e4;
    color: #000;
    :active {
        background-color: transparent;
    }
    :before {
        align-self: center;
        border-color: transparent transparent #000000 transparent;
        border-style: solid;
        border-width: 0 4px 6px 4px;
        content: '';
        height: 0;
        margin-right: 5px;
        width: 0;
    }
`
