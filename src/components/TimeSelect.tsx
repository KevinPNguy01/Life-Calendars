import MenuItem from "@mui/material/MenuItem/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select/Select";
import { useContext, useState } from "react";
import { pastYearEnd, pastYearStart } from "../constants/time";
import { TimeContext } from "../contexts/TimeContext";
import { UserContext } from "../contexts/UserContext";

const currentYear = new Date().getFullYear();
const yearItems = Array.from({ length: currentYear - 2018}, (_, i) => currentYear - i);
const menuItems = yearItems.map(year => <MenuItem key={year} value={year}>{year}</MenuItem>);

export function TimeSelect() {
    const {username} = useContext(UserContext);
    const {setTimePeriod} = useContext(TimeContext);
    const [value, setValue] = useState(-1);

    const handleChange = (e: SelectChangeEvent<number>) => {
        const year = e.target.value as number;
        setTimePeriod(year === -1 ? [pastYearStart, pastYearEnd] : [new Date(Date.UTC(year)), new Date(Date.UTC(year+1))]);
    };
    
    return (
        <div className="flex flex-wrap justify-center items-center w-full gap-2">
            <span className="text-dim-white text-nowrap text-lg leading-normal">{username}'s Life Calendars in</span>
            <Select
                onChange={(e) => {handleChange(e); setValue(e.target.value as number)}}
                className="!bg-tertiary rounded"
                sx={{
                    '& .MuiSelect-select': {
                        paddingX: 1,
                        paddingY: 0.5
                    }
                }}
                variant="standard"
                disableUnderline
                value={value}
            >
                <MenuItem value={-1}>the past year</MenuItem>
                {menuItems}
            </Select>
        </div>
    );
}