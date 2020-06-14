import React, { useState } from "react";
import Image from "material-ui-image";

import {
  useQuery,
  useMutation,
  useSubscription,
  useApolloClient,
} from "@apollo/client";

import { LIKE, ADD_LIKE } from "./statusMutations";
import { USER_PROFILE } from "../Profile/userProfileQueries";
import { All_STATUSES } from "../status/statusQueries";
import { ADD_FRIEND } from "../Friends/addFriendMutation";

import ConfirmDialog from "../Profile/ConfirmDialog";
import AddCommentDialog from "../Profile/AddCommentDialog";
import EditStatus from "../common/EditStatusDialog";

import Typography from "@material-ui/core/Typography";
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
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    statusBox: {
      margin: "10px",
      padding: "10px",
    },
    title: {
      fontWeight: "bold",
    },
    root: {
      paddingTop: "10px",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.palette.background.paper,
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
  })
);

interface Props {
  status: any;
}
export default function Status({ status }: Props) {
  const classes = useStyles();

  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const all_statuses = useQuery(All_STATUSES);

  const id = localStorage.getItem("user-id");
  const userId = useQuery(USER_PROFILE, { variables: { id } });

  const [like, result] = useMutation(LIKE, {
    refetchQueries: [{ query: All_STATUSES }],
    onError: (error) => {
      console.log(error);
    },
  });
  const [friend, friendResult] = useMutation(ADD_FRIEND, {
    refetchQueries: [{ query: All_STATUSES }],
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
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia>
            {status.status_picture_url ? (
              <Image src={status.status_picture_url} />
            ) : (
              <></>
            )}
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {status.username}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {status.status_text}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <IconButton onClick={() => handleLike(status.id)}>
            {userId.data?.getUserInfo.favorites.includes(status.id) ? (
              <FavoriteIcon color="secondary" />
            ) : (
              <FavoriteBorderIcon color="secondary" />
            )}
          </IconButton>

          <IconButton onClick={handleClick}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>

          {userId.data?.getUserInfo.id === status.userId ? (
            <ConfirmDialog id={status.id} />
          ) : (
            <></>
          )}

          <AddCommentDialog
            id={status.id}
            username={status.username}
            text={status.status_text}
          />
          {userId.data?.getUserInfo.id === status.userId ? (
            <EditStatus id={status.id} text={status.status_text} />
          ) : (
            <></>
          )}
        </CardActions>
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
      </Card>
    </div>
  );
}
