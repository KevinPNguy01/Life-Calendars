import PersonIcon from '@mui/icons-material/Person';
import { Box } from '@mui/material';
import Button from "@mui/material/Button/Button";
import Dialog from "@mui/material/Dialog/Dialog";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import TextField from "@mui/material/TextField/TextField";
import { useContext, useState } from "react";
import ConnectWithStravaLogo from "../../assets/connect_with_strava.png";
import GitHubLogo from "../../assets/github_logo_small.webp";
import LeetCodeLogo from "../../assets/leetcode_logo_small.png";
import StravaLogo from "../../assets/strava_logo_small.webp";
import { defaultUser } from '../../constants/defaultUser';
import { UserContext } from '../../contexts/UserContext';
import { ViewContext } from '../../contexts/ViewContext';

const stravaLink = `
https://www.strava.com/oauth/authorize
    ?client_id=${import.meta.env.VITE_STRAVA_CLIENT_ID}
    &response_type=code
    &redirect_uri=${import.meta.env.VITE_STRAVA_CALLBACK_URL}
    &approval_prompt=force
    &scope=read,activity:read_all
`.replace(/\s/g, "");

const enableStrava = false;

const {defaultUsername, defaultStravaId, defaultLeetCodeUsername, defaultGitHubUsername} = defaultUser;

export function ConnectButton() {
    const {username, setUsername, leetcodeUsername, setLeetcodeUsername, githubUsername, setGithubUsername, setStravaId} = useContext(UserContext);
    const {setView} = useContext(ViewContext);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({username, leetcodeUsername, githubUsername});

    const handleOpen = () => {
        setOpen(true);
        setFormData({username, leetcodeUsername, githubUsername});
    }

    const handleSubmit = () => {
        if (!enableStrava) {
            setStravaId("");
            setView("strava", false);
        }
        setUsername(formData.username);
        setLeetcodeUsername(formData.leetcodeUsername);
        setGithubUsername(formData.githubUsername);
        handleClose();
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleReset = () => {
        if (!enableStrava) {
            setView("all", true);
        }
        setUsername(defaultUsername);
        setStravaId(defaultStravaId);
        setLeetcodeUsername(defaultLeetCodeUsername);
        setGithubUsername(defaultGitHubUsername);
        handleClose();
    }

    return (
        <>
            <Button
                className="!rounded-full"
                color="primary"
                variant="contained"
                onClick={handleOpen}
            >
                Connect
            </Button>
            <Dialog disableRestoreFocus open={open} onClose={handleClose}>
                <DialogTitle>
                    Connect Accounts
                </DialogTitle>
                <DialogContent>
                    <Box component="form" className="flex flex-col gap-4" onSubmit={(e) => {e.preventDefault(); handleSubmit()}}>
                        <div className="grid grid-cols-[auto,1fr] gap-4 place-items-center !py-4 2xl:!px-8">
                            <PersonIcon/>
                            <TextField value={formData.username} label="Name" onChange={(e) => setFormData({...formData, username: e.currentTarget.value})}/>
                            <img className="w-8" src={LeetCodeLogo}/>
                            <TextField value={formData.leetcodeUsername} label="LeetCode Username" onChange={(e) => setFormData({...formData, leetcodeUsername: e.currentTarget.value})}/>
                            <img className="w-8" src={GitHubLogo}/>
                            <TextField value={formData.githubUsername} label="GitHub Username" onChange={(e) => setFormData({...formData, githubUsername: e.currentTarget.value})}/>
                            <img className="w-8" src={StravaLogo}/>
                            {enableStrava ? (
                                <a onClick={() => {setStravaId(""); localStorage.setItem("connectWithStrava", "true")}} href={stravaLink}>
                                    <img className="h-14" src={ConnectWithStravaLogo}/>
                                </a>
                            ) : (
                                <TextField value="Coming soon..." label="Connect with Strava" disabled/>
                            )}
                        </div>
                        <div className="w-full justify-end flex gap-4">
                            <Button 
                                onClick={handleReset}
                                variant="outlined" 
                                color="error"
                            >
                                Reset
                            </Button>
                            <Button 
                                onClick={handleClose}
                                variant="outlined" 
                                sx={{borderColor: "#888", color: "white"}}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit"
                                variant="contained"
                            >
                                Save
                            </Button>
                        </div>
                    </Box>
                    
                </DialogContent>
            </Dialog>
        </>
    );
}