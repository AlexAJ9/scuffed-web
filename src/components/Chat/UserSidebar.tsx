import React, { useCallback } from "react";
import { useQuery } from "@apollo/client";
import { ALL_USERS } from "./chatQueries";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "absolute",
      right: "0px",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export default function UserSideBar(props: any) {
  const { selectedUsername, username } = props;
  const all_users = useQuery(ALL_USERS);
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    user: any
  ) => {
    setSelectedIndex(index);
    selectUserFunction(user.username);
  };

  const selectUserFunction = useCallback(
    (username: any) => {
      selectedUsername(username);
    },
    [selectedUsername]
  );

  return (
    <div>
      <div className={classes.root}>
        <List component="nav" aria-label="users">
          {all_users?.data?.allUsers.map((user: any, index: any) => (
            <ListItem
              button
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index, user)}
              key={user.id}
            >
              <ListItemText primary={user.username} />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}
