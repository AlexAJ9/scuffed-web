import React from "react";
import { Link } from "react-router-dom";

import {
  Theme,
  useTheme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";
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
    text: {
      fontWeight: "bolder",
      fontSize: "22px",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

interface Props {
  handleChangeTheme: () => void;
  logout: () => void;
}

export default function ResponsiveDrawer({ logout, handleChangeTheme }: Props) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
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
      </List>

      <List>
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
          <Link className={classes.link} to="/profile">
            <ListItemIcon>
              <IconButton>
                <FavoriteBorderIcon color="primary" />
              </IconButton>
            </ListItemIcon>
            <ListItemText
              primary={<Typography className={classes.text}>Likes</Typography>}
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
            primary={<Typography className={classes.text}>Display</Typography>}
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
            primary={<Typography className={classes.text}>Log out</Typography>}
          />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />

      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}
