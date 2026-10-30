import React from 'react'

const Footer = () => {


  return (
  <> 
     <footer className="content-footer footer bg-footer-theme">
  <div className="d-flex flex-wrap justify-content-center py-2 flex-md-row flex-column">
    <div className="mb-2 mb-md-0">
    Copyright © 2023
      <a
        href="https://themeselection.co"
        target="_blank"
        className="footer-link fw-medium"
      >
      All Rights Reserved by 
      </a>
    </div>
    <div className="d-none d-lg-inline-block">
      <a 
        href="https://www.scorpioinfotech.com/"
        className="footer-link me-4 text-primary"
        target="_blank"
      >
   scorpioinfotech.com
      </a>

    </div>
  </div>
</footer>
  </>
  )
}

export default Footer