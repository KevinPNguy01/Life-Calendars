import MenuItem from "@mui/material/MenuItem/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select/Select";
import { useContext, useState } from "react";
import { TimeContext } from "../App";
import { pastYearEnd, pastYearStart } from "../utils/time";

const currentYear = new Date().getFullYear();
const yearItems = Array.from({ length: currentYear - 2018}, (_, i) => currentYear - i);
const menuItems = yearItems.map(year => <MenuItem key={year} value={year}>{year}</MenuItem>);

export function TimeSelect() {
    const {setTimePeriod} = useContext(TimeContext);
    const [value, setValue] = useState(-1);

    const handleChange = (e: SelectChangeEvent<number>) => {
        const year = e.target.value as number;
        setTimePeriod(year === -1 ? [pastYearStart, pastYearEnd] : [new Date(Date.UTC(year)), new Date(Date.UTC(year+1))]);
    };
    
    return (
        <div className="flex items-center gap-2">
            <span className="text-dim-white text-lg pb-[3px]">Kevin's Life Stats in</span>
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