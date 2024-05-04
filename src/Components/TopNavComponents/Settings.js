import { Button } from "@mui/material";
import React from "react";
import { useOnlyIcon } from "../../Components/Layout/NavContext";

const Settings = () => {
  const { onlyIcon, setOnlyIcon, setHovering } = useOnlyIcon();
  const set = () => {
    setOnlyIcon(true);
    setHovering(true); 
  };
  const out = () => {
    setOnlyIcon(false);
    setHovering(false); 
  };

  return (
    <div>
      <Button onClick={set}>hh</Button>
      <Button onClick={out}>gg</Button>
    </div>
  );
};

export default Settings;
