import { Tooltip } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export default () => (
    <Tooltip title="分支结束, 继续进行接下来的流程" sx={{ marginTop: 1 }}>
        <ExitToAppIcon />
    </Tooltip>
);
