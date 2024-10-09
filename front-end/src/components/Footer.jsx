import React from "react";

function Footer() {
  const date = new Date().getFullYear();
  return (
    <div className="footer">
      <p>ProDash @ All rights reserved {date}</p>
    </div>
  );
}

export default Footer;
