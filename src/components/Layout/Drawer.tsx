import React from "react";
import { Link } from "react-router-dom";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import MessageOutlinedIcon from "@material-ui/icons/MessageOutlined";
import WbIncandescentOutlinedIcon from "@material-ui/icons/WbIncandescentOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PeopleOutlineOutlinedIcon from "@material-ui/icons/PeopleOutlineOutlined";
import MessageTwoToneIcon from "@material-ui/icons/MessageTwoTone";
import CurrentUser from "./CurrentUser";
import WavesIcon from "@material-ui/icons/Waves";

const drawerWidth = 200;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    link: {
      textDecoration: "none",
      color: "black",
      all: "unset",
      display: "flex",
      justifyContent: "center",
      alignItems: " center",
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginRight: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(2),
    },
    text: {
      fontWeight: "bolder",
      fontSize: "16px",
      color: theme.palette.text.primary,
    },
  })
);
interface Props {
  handleChangeTheme: () => void;
  logout: () => void;
}
export default function SideDrawer({ handleChangeTheme, logout }: Props) {
  const classes = useStyles();

  return (
    <>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List>
          <ListItem
            style={{ display: "flex", justifyContent: "center" }}
            button
          >
            <ListItemIcon>
              <IconButton>
                <WavesIcon color="primary" />
              </IconButton>
            </ListItemIcon>
          </ListItem>
          <Divider />
          <ListItem button>
            <Link to="/" className={classes.link}>
              <ListItemIcon>
                <IconButton>
                  <HomeIcon color="primary" />
                </IconButton>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography className={classes.text}>
                    Начална страница
                  </Typography>
                }
              />
            </Link>
          </ListItem>

          <ListItem className={classes.root} button>
            <Link className={classes.link} to="/profile">
              <ListItemIcon>
                <IconButton>
                  <PersonIcon color="primary" />
                </IconButton>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography className={classes.text}>Профил</Typography>
                }
              />
            </Link>
          </ListItem>
          <ListItem className={classes.root} button>
            <Link className={classes.link} to="/friends">
              <ListItemIcon>
                <IconButton>
                  <PeopleOutlineOutlinedIcon color="primary" />
                </IconButton>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography className={classes.text}>Приятели</Typography>
                }
              />
            </Link>
          </ListItem>
          <ListItem className={classes.root} button>
            <Link className={classes.link} to="/chat">
              <ListItemIcon>
                <IconButton>
                  <MessageTwoToneIcon color="primary" />
                </IconButton>
              </ListItemIcon>
              <ListItemText
                primary={<Typography className={classes.text}>Чат</Typography>}
              />
            </Link>
          </ListItem>
          <ListItem className={classes.root} button>
            <Link className={classes.link} to="/likes">
              <ListItemIcon>
                <IconButton>
                  <FavoriteBorderIcon color="primary" />
                </IconButton>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography className={classes.text}>Харесвания</Typography>
                }
              />
            </Link>
          </ListItem>

          <ListItem onClick={handleChangeTheme} button>
            <ListItemIcon>
              <IconButton>
                <WbIncandescentOutlinedIcon color="primary" />
              </IconButton>
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography className={classes.text}>Светла тема</Typography>
              }
            />
          </ListItem>
          <ListItem className={classes.root} button>
            <Link className={classes.link} to="/settings">
              <ListItemIcon>
                <IconButton>
                  <SettingsIcon color="primary" />
                </IconButton>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography className={classes.text}>Настройки</Typography>
                }
              />
            </Link>
          </ListItem>
          <ListItem className={classes.root} onClick={logout} button>
            <ListItemIcon>
              <IconButton>
                <ExitToAppOutlinedIcon color="primary" />
              </IconButton>
            </ListItemIcon>
            <ListItemText
              className={classes.link}
              primary={<Typography className={classes.text}>Изход</Typography>}
            />
          </ListItem>
          <ListItem>
            <CurrentUser />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
