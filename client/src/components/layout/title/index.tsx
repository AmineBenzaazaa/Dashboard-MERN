import React from "react";
import { useRouterContext, TitleProps } from "@refinedev/core";
import Button from "@mui/material/Button";

import { logo, bookit } from "assets";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    const { Link } = useRouterContext();

    return (
        <Button fullWidth variant="text" disableRipple>
            <Link to="/">
                {collapsed ? (
                    <img src={bookit} alt="Bookit" width="250px" />
                ) : (
                    <img src={bookit} alt="Bookit" width="250px" />
                )}
            </Link>
        </Button>
    );
};
