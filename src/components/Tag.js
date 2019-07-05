import React from "react";
import { Link } from "react-router-dom";

import "../styles/Global.scss";

const Tag = ({ tag }) => {
  return (
    <Link to={`songography/tag/${tag}`}>
      <div className="Tag" tag={tag}>
        {tag}
      </div>
    </Link>
  );
};

export default Tag;
