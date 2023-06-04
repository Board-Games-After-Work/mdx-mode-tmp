import FlagIcon from "@mui/icons-material/Flag";
import { Tooltip } from "@mui/material";

export default () => (
    <Tooltip
        title={
            <>
                这个
                <FlagIcon />
                标志意味着如果PC在当日死亡会经历这一阶段并于招待所复活
            </>
        }
    >
        <FlagIcon fontSize="small" />
    </Tooltip>
);
