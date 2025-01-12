import PersonIcon from '@mui/icons-material/Person';
import Button from "@mui/material/Button/Button";
import Dialog from "@mui/material/Dialog/Dialog";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import TextField from "@mui/material/TextField/TextField";
import { useContext, useState } from "react";
import GitHubLogo from "../../assets/github_logo_small.webp";
import LeetCodeLogo from "../../assets/leetcode_logo_small.png";
import { UserContext } from '../../contexts/UserContext';

export function ConnectButton() {
    const {username, setUsername, leetcodeUsername, setLeetcodeUsername, githubUsername, setGithubUsername} = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({username, leetcodeUsername, githubUsername});

    const handleOpen = () => {
        setOpen(true);
        setFormData({username, leetcodeUsername, githubUsername});
    }

    const handleSubmit = () => {
        setUsername(formData.username);
        setLeetcodeUsername(formData.leetcodeUsername);
        setGithubUsername(formData.githubUsername);
        setOpen(false);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Button
                color="primary"
                variant="contained"
                onClick={handleOpen}
            >
                Connect
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Connect Accounts
                </DialogTitle>
                <DialogContent className="flex flex-col gap-8">
                    <form className="grid grid-cols-[auto,1fr] gap-4 place-items-center !py-4">
                        <PersonIcon/>
                        <TextField value={formData.username} label="Name" onChange={(e) => setFormData({...formData, username: e.currentTarget.value})}/>
                        <img className="w-8" src={LeetCodeLogo}/>
                        <TextField value={formData.leetcodeUsername} label="LeetCode Username" onChange={(e) => setFormData({...formData, leetcodeUsername: e.currentTarget.value})}/>
                        <img className="w-8" src={GitHubLogo}/>
                        <TextField value={formData.githubUsername} label="GitHub Username" onChange={(e) => setFormData({...formData, githubUsername: e.currentTarget.value})}/>
                    </form>
                    <div className="w-full justify-end flex gap-4">
                        <Button 
                            onClick={handleSubmit}
                            variant="contained"
                        >
                            Save
                        </Button>
                        <Button 
                            onClick={handleClose}
                            variant="outlined" 
                            sx={{borderColor: "#888", color: "white"}}
                        >
                            Cancel
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}