import { createGlobalStyle } from './styled-components'

// tslint:disable-next-line variable-name
export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSize.xxs};
  }
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 300;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
  
  .main-container {
    display: flex;
  }
  
  .logo-section {
    display: flex;
    align-items: center;
    padding: 15px;
    
    img {
      height: 25px;
      margin: 0 auto;
    }
  }
  
  .user-details {
    background: linear-gradient(45deg,#007b88 30%,#00dcc8 90%);
    display: flex;
    align-items: center;
    padding: 25px;
    
    .user-img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 20px;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    .user-name {
      text-transform: uppercase;
      color: white;
      margin: 0;
      
      span {
        font-weight: 700;
      }
    }
    
    .user-designation {
      color: #adc5d2;
      text-transform: uppercase;
      font-size: 12px;
    }
  }
  
  .cust-drawer {
    transition: width 0.5s;
    
    &.menu-open {
      width: 200px !important;
    }
    
    &.menu-close {
      width: 0 !important;
    }
    
    .cust-drawer-child {
      transition: width 0.5s;
      overflow-x: hidden;

      &.menu-open {
        width: 200px !important;
      }
    
      &.menu-close {
        width: 0 !important;
      }
    }

    > div {
        background-color: #1a2226;
        color: #90a4ae;
        border: none;
        flex-shrink: 0;
        flex: 0 0 auto;
    }
    
    svg {
      fill: #90a4ae;
    }
  }
  
  .cust-list {
    padding: 0 !important;
  }
  
  .cust-list-item {
    padding-left: 20px !important;
    padding-top: 12px !important;
    padding-bottom: 12px !important;
    
    .cust-list-item-icon {
      min-width: 45px !important;
    }
    
    .cust-list-item-text span {
      text-transform: uppercase;
      font-size: 12px;
      font-weight: 500;
    }
    
    &.cust-list-item-sub {
      padding-left: 30px !important;
      background-color: #232d33 !important;
      
      &.sub-menu-active {
        background-color: #094352 !important;
        color: white !important;
        
        svg {
          fill: white !important;
        }
      }
    }
    
    &:hover {
      background-color: #9EC0E6 !important;
      color: #2b2b2b !important;
          
      svg {
        fill: #2b2b2b !important;
      }
    }

    &.menu-active {
      background-color: #36c1e6 !important;
      color: white !important;

      svg {
        fill: white !important;
      }
    }
  }
  
  .main-content {
    flex-grow: 1;
    padding: 20px;
    transition: width 0.5s;

    .content-page-layout {
      &.extend-width {
        width: 79vw;
      }

      &.content-page-max {
        width: 100vw
      }

      &.content-page-normal {
        width: calc(100vw - 200px);
      }

      transition: width 0.5s !important;
    }

    &.main-full-width {
      margin-left: 0 !important;
      width: 100vw !important;
    }

    &.fixed-body {
      position: fixed;
      margin-top: 56px;
      margin-left: 200px;
      width: calc(100vw - 200px);
      padding: 0 !important;
      overflow: scroll;
      height: calc(100vh - 56px);
      transition: margin 0.5s, width 0.5s !important;

      .content-page-layout {
        width: 100%;
      }
    }

    &.main-full-height {
      height: 100vh;

      > .content-page-layout {
        height: calc(100% - 64px);

        .content-page-layout, .post-content {
          height: 100%;
        }
      }
    }
  }
  
  .cust-iframe {
    width: 100%;
    height: 727px;
    overflow: hidden;
  }
  
  .content-screen {
    width: 100%;
  }
  
  .content-spacer {
    min-height: 64px;
  }
  
  .cust-appbar {
    background-color: #2d3b42 !important;
    transition: width 0.5s !important;

    .header-logo {
      height: 50px;
      vertical-align: middle;
      opacity: 0;
      display: inline;
      transition: .5s ease !important;
    }

    &.header-normal {
      width: calc(100% - 200px) !important;
    }
    
    &.header-max {
      width: 100% !important;

      .header-logo {
        opacity: 1;
      }
    }
  }
  
  .cust-toolbar {
    min-height: 56px !important;
    display: flex;
    justify-content: space-between;
    
    .toolbar-title {
      font-size: 18px;
      font-weight: 500;
    }
  }
  
  .drawer-bottom-text {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 25px;
    background-color: #151c1f;
    text-align: center;
    font-size: 12px;
    
    img {
      width: 75px;
    }
  }
  
  .coming-soon-section {
    display: flex;
    align-items: center;
    
    .coming-soon-icon {
      font-size: 7rem;
    }
    
    .coming-soon-msgs {
      margin-left: 15px;
    }
  }
  
  .cust-card-content {
    padding: 40px !important;
  }
    
  .toolbar-user-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #36c1e6;
    cursor: pointer;

    span {
      font-weight: 700;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .internship-content {
    .page-welcome {
      padding-left: 10px;
    }
  }
  
  .internship-list {
    display: flex;
    flex-flow: row wrap;
    transition: 1s ease;

    .internship-item-container {
      min-height: 200px;
      flex: 0 1 50%;
      margin-bottom: 20px;
      padding: 0 10px;
    }

    .internship-item {
      height: 100%;

      .intern-content {
        height: 100%;
        padding: 0 !important;
        display: flex;
      }
    }
  }

  .internship-item {
    .intern-content {
      .int-heading {
        border-right: 0;
      }

      .int-img {
        width: 150px;
        height: 100%;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    
    .int-details {
      display: flex;
      flex-flow: column;

      .int-sub-details {
        flex: 1;
        padding: 20px 15px;
      }

      .int-name {
        span {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 500;
        }
      }
      
      .int-available {
        margin-bottom: 15px;
        font-size: 14px;
        font-style: italic;

        .int-more-info {
          margin-left: 5px;

          svg {
            font-size: 16px;
            vertical-align: sub;
          };
        }
      }

      .int-desc {
        margin-bottom: 10px;
      }

      .int-desc {
        font-size: 14px;
        line-height: 16px;
      }
    }
    
    .int-apply-btn {
      align-items: flex-end;
      width: 100%;

      button {
        width: 100%;
        border-radius: 0;
        padding: 8px;

        span {
          font-weight: 500;
        }
      }
    }
    
    .int-apply-btn:not(.disabled) button {
        color: white;
        background-color: #35c1e6;
        
        &:hover {
          background-color: #0097a7;
        }
      }
  }
  
  .margin-top-25 {
    margin-top: 25px;
  }
  
  .cust-mine-btn {
    background-color: #3fb543 !important;
  }
    
  .content-show {
    opacity: 1;
  }
  
  .content-hide {
    opacity: 0 !important;
  }
  
  .non-padded-content {
    .main-content {
      padding-left: 0;
      padding-right: 0;
    }
    
    .content-spacer {
      min-height: 36px;
    }
    
    .loader-container {
      margin-top: 40px !important;
    }
  }
  
  .loader-container {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
  }

  .clickable-link {
    cursor: pointer;
  }

  .page-back-btn {
    display: flex;
    align-items: center;

    span {
      padding-left: 5px;
    }
  }

  .toolbar-user-menu {
    margin-top: 5px;
  }

  .menu-item-has-progress {
    padding-right: 5px;
  }

  // LOGIN PAGE
  .login-page-container {
    height: 100vh;
    display: flex;

    .login-page-section {
      display: flex;
      flex: 1 50% !important;
      align-items: center;
      justify-content: center;

      &.info-section {
        background: linear-gradient(45deg,#007b88 30%,#36c1e6 90%);
        display: flex;
        justify-content: flex-start;

        .section-msg {
          padding-left: 50px;
          color: white;

          .section-title {
            font-size: 3rem;
            line-height: 3rem;
            font-weight: 700;
            
            &:first-child {
              margin-bottom: 5px;
            }
            
            &:nth-child(2) {
              margin-bottom: 20px;
              
              img {
                width: 175px;
              }
            }
          }
        }
      }

      &.form-section {
        flex-direction: column;

        .section-header {
          font-size: 2rem;
          line-height: 2rem;
          font-weight: 700;
        }
      }
    }

    .login-fld > div {
      border: 1px solid lightgray;
      border-radius: 5px;
      padding: 5px 10px;
    }

    .login-btn {
      width: 100%;
      color: white;
      background-color: #36c1e6;
      border: none;
      border-radius: 4px;
      padding: 7px 25px;
    }
  }

  // WORDPRESS CONTENT STUFF
  .wp-block-embed-wordpress {

    .wp-block-embed__wrapper {
      blockquote {
        display: none;
        margin: 1em 0;
      }

      iframe {
        position: relative !important;
        height: 260px !important;
      }
    }
  }

  .wp-block-embed {
    margin: 0;
  }
  
  .dark-tooltip {
    background-color: black !important;
  }

  .page-content {
    transition: 1s ease;

    .page-welcome {
      margin-bottom: 10px;
      span {
        font-size: 3rem;
        line-height: 3rem;
      }
    }

    .page-caption {
      margin-bottom: 20px;

      span {
        font-style: italic;
      }
    }

    .page-body {}
  }

  .projects-content {
    .projects-list {
      display: flex;
      flex-flow: row wrap;

      .item-container {
        flex: 0 1 33.33%;
        padding: 10px;
        margin-bottom: 10px;

        .item-card {
          min-height: 200px;
          border: 1px solid #35c1e6;

          .item-content {
            padding: 0;
          }
        }
      }

      .content-heading {
        min-height: 75px;
        padding: 15px;
        background: #35c1e6;
        color: white;
        display: flex;
        align-items: flex-end;

        span {
          font-weight: 700;
        }
      }

      .content-details {
        padding: 24px;

        .proj-desc {
          margin-bottom: 10px;
        }

        .proj-action a {
          text-decoration: none;
          font-weight: 700;
          color: #0091b7;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
  
  .curriculum-iframe {
    transition: .5s ease;
  }

  .labaccess-box-container{
    display: flex;
    flex-wrap: wrap;
  }

  .labaccess-box1{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 20vw;
    padding: 1em;
    background: #E4E5E6;
    margin: 2em;
    color: #bc0588;
    -webkit-box-shadow: 0px 3px 5px -3px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 3px 5px -3px rgba(0,0,0,0.75);
    box-shadow: 0px 3px 5px -3px rgba(0,0,0,0.75);

  }
  .labaccess-box2{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 20vw;
    padding: 1em;
    background: #E4E5E6;
    margin: 2em;
    color: #1783ef;
    -webkit-box-shadow: 0px 3px 5px -3px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 3px 5px -3px rgba(0,0,0,0.75);
    box-shadow: 0px 3px 5px -3px rgba(0,0,0,0.75);

  }
  .labaccess-box-inside {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }
  .labaccess-content-container {
    
  }
  .labaccess-content-container-head {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`
