import React, { useState } from "react";
import Image from "material-ui-image";

import { useQuery, useMutation } from "@apollo/client";

import { LIKE } from "../Favourites/likeStatusMutation";
import { USER_PROFILE } from "./userProfileQueries";
import { All_STATUSES } from "../status/statusQueries";
import { ADD_FRIEND } from "../Friends/addFriendMutation";

import Header from "../Header/Header";
import ConfirmDialog from "./ConfirmDialog";
import AddCommentDialog from "./AddCommentDialog";
import EditStatus from "../common/EditStatusDialog";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Avatar from "@material-ui/core/Avatar";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import PersonAddDisabledOutlinedIcon from "@material-ui/icons/PersonAddDisabledOutlined";

import CreateStatus from "../status/CreateStatus";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    statusBox: {
      margin: "10px",
      padding: "10px",
    },
    title: {
      fontWeight: "bold",
      padding: "10px",
    },
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    componentContainer: {
      border: "1px solid",
      borderColor:
        theme.palette.type === "light"
          ? "#0000001f !important"
          : "rgba(255, 255, 255, 0.12)",

      height: "100%",
    },
    inline: {
      display: "inline",
    },
    toolbar: {
      display: "flex",
      justifyContent: "flex-end",
    },
  })
);

export default function Status() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const all_statuses = useQuery(All_STATUSES);

  const id = localStorage.getItem("user-id");
  const userId = useQuery(USER_PROFILE, { variables: { id } });
  console.log(userId);

  const [like, result] = useMutation(LIKE, {
    onError: (error) => {
      console.log(error);
    },
  });
  const [friend, friendResult] = useMutation(ADD_FRIEND, {
    onError: (error) => {
      console.log(error);
    },
  });
  const handleLike = (statusId: string) => {
    like({ variables: { id: statusId } });
  };
  const handleAddFriend = (id: string) => {
    console.log(id + "id");

    friend({ variables: { id: id } });
  };
  if (all_statuses.loading) {
    return <div>loading...</div>;
  }

  return (
    <Container className={classes.componentContainer} maxWidth="sm">
      <Header title={"Profile"} />
      <CreateStatus />
      <Typography variant="h5" gutterBottom className={classes.title}>
        Your posts
      </Typography>
      {all_statuses.data.allStatuses
        .filter((status: any) => status.userId !== userId)
        .map((x: any) => (
          <Paper className={classes.statusBox} elevation={3}>
            <Typography className={classes.title} variant="h5">
              {x.username}
              {userId.data?.getUserInfo.friends?.includes(x.userId) ? (
                <IconButton onClick={() => handleAddFriend(x.userId)}>
                  <PersonAddDisabledOutlinedIcon />
                </IconButton>
              ) : (
                <IconButton onClick={() => handleAddFriend(x.userId)}>
                  <PersonAddOutlinedIcon />
                </IconButton>
              )}
            </Typography>
            <Typography variant="h6">{x.status_text}</Typography>
            {x.status_picture_url ? (
              <Image src={x.status_picture_url} />
            ) : (
              <></>
            )}

            <div className={classes.toolbar}>
              <IconButton onClick={() => handleLike(x.id)}>
                {userId.data?.getUserInfo.favorites.includes(x.id) ? (
                  <FavoriteBorderIcon color="secondary" />
                ) : (
                  <FavoriteIcon color="secondary" />
                )}
              </IconButton>

              <IconButton onClick={handleClick}>
                {open ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
              <ConfirmDialog id={x.id} />
              <AddCommentDialog
                id={x.id}
                username={x.username}
                text={x.status_text}
              />
              <EditStatus id={x.id} text={x.status_text} />
            </div>

            <List component="div" disablePadding>
              <Collapse in={open} timeout="auto" unmountOnExit>
                {x.comments?.map((comment: any) => (
                  <ListItem button className={classes.nested}>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt="Cindy Baker"
                          src="/static/images/avatar/3.jpg"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={comment.user}
                        secondary={
                          <React.Fragment>{comment.text}</React.Fragment>
                        }
                      />
                    </ListItem>
                  </ListItem>
                ))}
              </Collapse>
            </List>
          </Paper>
        ))}
    </Container>
  );
}
