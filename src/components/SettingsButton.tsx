import SettingsIcon from '@mui/icons-material/Settings';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import Dialog from "@mui/material/Dialog/Dialog";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import IconButton from "@mui/material/IconButton/IconButton";
import ListItemText from '@mui/material/ListItemText/ListItemText';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import { useContext, useState } from "react";
import { ViewContext } from '../contexts/ViewContext';

export function SettingsButton() {
    const {views, setView} = useContext(ViewContext);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <IconButton
                onClick={handleOpen}
            >
                <SettingsIcon/>
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Show Calendars
                </DialogTitle>
                <DialogContent>
                <div className='w-[12rem]'></div>

                    {["Strava", "LeetCode", "GitHub"].map(
                        (name) => {
                            const key = name.toLowerCase() as "strava" | "leetcode" | "github";
                            return (
                                <MenuItem key={key} onClick={() => setView(key, !views[key])}>
                                    <Checkbox checked={views[key]} />
                                    <ListItemText primary={name}/>
                                </MenuItem>
                            );
                        }
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}