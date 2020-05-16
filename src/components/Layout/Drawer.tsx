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
import WbIncandescentOutlinedIcon from "@material-ui/icons/WbIncandescentOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PeopleOutlineOutlinedIcon from "@material-ui/icons/PeopleOutlineOutlined";

import CurrentUser from "./CurrentUser";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    link: {
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
      padding: theme.spacing(3),
    },
    text: {
      fontWeight: "bolder",
      fontSize: "20px",
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
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem button>
            <Link to="/" className={classes.link}>
              <ListItemIcon>
                <IconButton>
                  <HomeIcon color="primary" />
                </IconButton>
              </ListItemIcon>
              <ListItemText
                primary={<Typography className={classes.text}>Home</Typography>}
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
                  <Typography className={classes.text}>Profile</Typography>
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
                  <Typography className={classes.text}>Friends</Typography>
                }
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
                  <Typography className={classes.text}>Likes</Typography>
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
                <Typography className={classes.text}>Display</Typography>
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
                  <Typography className={classes.text}>Settings</Typography>
                }
              />
            </Link>
          </ListItem>
          <ListItem onClick={logout} button>
            <ListItemIcon>
              <IconButton>
                <ExitToAppOutlinedIcon color="primary" />
              </IconButton>
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography className={classes.text}>Log out</Typography>
              }
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
