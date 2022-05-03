import styled from 'styled-components';

export const Suggestions = styled.div`
    left: 0;
    right: 0;
    z-index: 10;
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

export const ChapterList = styled.div`
    margin-top: 15px;
    max-height: 200px;
    overflow: scroll;
`
export const Aside = styled.div`
          padding: 1.5em;
          font-size: 14px;
          color: white;
          background-color: red;
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

export const Header = styled.section`
    margin-bottom: 25px;
    .signedInStatus {
        display: block;
        min-height: 4rem;
        width: 100%;
    }
    
    .loading,
    .loaded {
        position: relative;
        top: 0;
        opacity: 1;
        overflow: hidden;
        border-radius: 0 0 0.6rem 0.6rem;
        padding: 0.6rem 1rem;
        margin: 0;
        background-color: rgba(0, 0, 0, 0.05);
        transition: all 0.2s ease-in;
    }
    
    .loading {
        top: -2rem;
        opacity: 0;
    }
    
    .signedInText,
    .notSignedInText {
        position: absolute;
        padding-top: 0.8rem;
        left: 1rem;
        right: 6.5rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        display: inherit;
        z-index: 1;
        line-height: 1.3rem;
    }
    
    .signedInText {
        padding-top: 0rem;
        left: 4.6rem;
    }
    
    .avatar {
        border-radius: 2rem;
        float: left;
        height: 2.8rem;
        width: 2.8rem;
        background-color: white;
        background-size: cover;
        background-repeat: no-repeat;
    }
    
    .button,
    .buttonPrimary {
        float: right;
        margin-right: -0.4rem;
        font-weight: 500;
        border-radius: 0.3rem;
        cursor: pointer;
        font-size: 1rem;
        line-height: 1.4rem;
        padding: 0.7rem 0.8rem;
        position: relative;
        z-index: 10;
        background-color: transparent;
        color: #555;
    }
    
    .buttonPrimary {
        background-color: #346df1;
        border-color: #346df1;
        color: #fff;
        text-decoration: none;
        padding: 0.7rem 1.4rem;
    }
    
    .buttonPrimary:hover {
        box-shadow: inset 0 0 5rem rgba(0, 0, 0, 0.2);
    }
    
    .navItems {
        margin-bottom: 2rem;
        padding: 0;
        list-style: none;
    }
    
    .navItem {
        display: inline-block;
        margin-right: 1rem;
    }
    a {
            font-size: 14px;
            margin-right: 15px;
            text-decoration: none;
          }
          button {
            float: right;
          }
          button a {
            text-color: yellow;
            color: yellow;
          }
  `  