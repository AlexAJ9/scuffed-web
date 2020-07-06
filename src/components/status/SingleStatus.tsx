import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import Image from "material-ui-image";

import { useQuery, useMutation } from "@apollo/client";

import { LIKE } from "./statusMutations";
import { USER_PROFILE } from "../Profile/userProfileQueries";
import { All_STATUSES } from "../status/statusQueries";
import { ADD_FRIEND } from "../Friends/addFriendMutation";

import ConfirmDialog from "../Profile/ConfirmDialog";
import AddCommentDialog from "../Profile/AddCommentDialog";
import EditStatus from "../common/EditStatusDialog";

import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Avatar from "@material-ui/core/Avatar";
import ChatIcon from "@material-ui/icons/Chat";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    statusBox: {
      margin: "10px",
      // border: "solid 2px",
      // borderRadius: "5px",
      padding: "5px",
      width: "90%",
    },
    title: {
      fontWeight: "bold",
    },
    itemEnd: {
      marginLeft: "30px",

      color: "#fff",
    },
    root: {
      paddingTop: "10px",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid",
      borderColor:
        theme.palette.type === "light"
          ? "#0000001f !important"
          : "rgba(255, 255, 255, 0.12)",
    },
    card: {
      width: "80%",
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
    avatar: {
      marginRight: "10px",
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
  })
);

interface Props {
  status: any;
}
export default function Status({ status }: Props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [imageId, setImageId] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const all_statuses = useQuery(All_STATUSES);

  const id = localStorage.getItem("user-id");
  const userId = useQuery(USER_PROFILE, { variables: { id } });
  const userProfilePicture = useQuery(USER_PROFILE, {
    variables: { id: status.userId },
  });
  const [liked, setLiked] = useState(
    userId?.data?.getUserInfo?.favorites?.includes(status.id)
  );
  const [like, result] = useMutation(LIKE, {
    refetchQueries: [
      { query: All_STATUSES },
      { query: USER_PROFILE, variables: { id: id } },
    ],
    onCompleted: (data) => {
      console.log(data);
    },

    onError: (error) => {
      enqueueSnackbar("Възникна проблем. Пробвайте отновo!", {
        variant: "error",
      });
      console.log(error);
    },
  });
  console.log(userProfilePicture.data?.getUserInfo.profile_image_url);

  const [friend, friendResult] = useMutation(ADD_FRIEND, {
    refetchQueries: [{ query: All_STATUSES }],
    onCompleted: (data) => {
      enqueueSnackbar(`Успех! 😎`, {
        variant: "success",
      });
    },
    onError: (error) => {
      enqueueSnackbar("Възникна проблем. Пробвайте отновo!", {
        variant: "error",
      });
    },
  });
  const handleLike = (statusId: string) => {
    console.log(status.id, statusId);
    setLiked(!liked);
    like({ variables: { id: statusId } });
  };
  const handleAddFriend = (id: string) => {
    friend({ variables: { id: id } });
  };

  if (all_statuses.loading) {
    return <div>loading...</div>;
  }

  return (
    <div className={classes.root}>
      <div className={classes.statusBox}>
        <div style={{ display: "flex", padding: "10px" }}>
          <Avatar
            className={classes.avatar}
            alt="Cindy Baker"
            src={`${userProfilePicture.data?.getUserInfo.profile_image_url}`}
          />
          <Typography className={classes.title} variant="h6">
            {status.username}
          </Typography>

          <div className={classes.itemEnd}>
            {id !== status.userId ? (
              userId.data?.getUserInfo.friends?.includes(status.userId) ? (
                <Button
                  onClick={() => handleAddFriend(status.userId)}
                  style={{ color: "#fff", fontSize: "10px" }}
                  variant="contained"
                  color="primary"
                >
                  Спри следването
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => handleAddFriend(status.userId)}
                    style={{ color: "#fff", fontSize: "10px" }}
                    variant="contained"
                    color="primary"
                  >
                    Последвай
                  </Button>
                </>
              )
            ) : (
              <></>
            )}
          </div>
        </div>

        <Typography style={{ padding: "10px", color: "#05334c" }} variant="h6">
          {status.status_text}
        </Typography>
        {status.status_picture_url ? (
          <Image src={status.status_picture_url} />
        ) : (
          <></>
        )}

        <div className={classes.toolbar}>
          <IconButton onClick={() => handleLike(status?.id)}>
            {liked ? (
              <FavoriteIcon color="secondary" />
            ) : (
              <FavoriteBorderIcon color="secondary" />
            )}
          </IconButton>

          <IconButton onClick={handleClick}>
            {open ? (
              <ExpandLess color="secondary" />
            ) : (
              <ChatIcon color="secondary" />
            )}
          </IconButton>

          <AddCommentDialog
            id={status.id}
            username={status.username}
            text={status.status_text}
          />
          {id !== status.userId ? (
            <></>
          ) : (
            <>
              <ConfirmDialog id={status.id} />
              <EditStatus id={status.id} text={status.status_text} />
            </>
          )}
        </div>

        <List component="div" disablePadding>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {status.comments?.map((comment: any) => (
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
                    secondary={<React.Fragment>{comment.text}</React.Fragment>}
                  />
                </ListItem>
              </ListItem>
            ))}
          </Collapse>
        </List>
      </div>
    </div>
  );
}
