import React, { useState } from "react";
import { AppBar, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Toolbar } from "@mui/material";
import { MdOutlineMenu } from 'react-icons/md'
import { IoHome } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import type { JSX } from "react";
import { IoPeople } from "react-icons/io5";





export function Header(): JSX.Element {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  function handleClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function nav(url: string){
      navigate(url);
      handleClose();
  }


  return (
    <div className="Header">
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}  onClick={handleClick}>
                    <MdOutlineMenu />
                </IconButton>
                <IoPeople style={{ fontSize: "40px", marginRight: "8px" }} />
                <h1>Employee System</h1>
                <Paper sx={{ width: 320, maxWidth: '100%' }}>
                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                        <MenuItem onClick={()=>nav("/")}>
                            <ListItemIcon>
                                <IoHome/>
                            </ListItemIcon>
                            <ListItemText>Home</ListItemText>
                        </MenuItem>

                    </Menu>
                </Paper>
            </Toolbar>
        </AppBar>

    </div>
);
}
