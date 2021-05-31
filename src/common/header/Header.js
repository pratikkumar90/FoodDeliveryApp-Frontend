import React, { Component } from "react";
import "./Header.css";

import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

import AccountCircle from "@material-ui/icons/AccountCircle";

import FastfoodIcon from "@material-ui/icons/Fastfood";
import {
  Input,
  InputAdornment,
  Button,
  Tab,
  Tabs,
  FormControl,
  InputLabel,
  FormHelperText,
  Snackbar,
  Menu,
  MenuList,
  Link,
  MenuItem
} from "@material-ui/core";

import Modal from "react-modal";

import TypoGraphy from "@material-ui/core/Typography";

// Custom Styles to over ride material ui default styles
const styles = theme => ({
  searchText: {
    //Style for Search box
    color: "white",
    "&:after": {
      borderBottom: "2px solid white"
    }
  },
  loginButton: {
    //Style for Login Button
    "font-weight": 400,
    margin: "8px 8px 8px 8px"
  },
  formButton: {
    //Style for the Form Buttons
    "font-weight": 400,
    "margin-left": "37%"
  },
  tab: {
    // Tab Styling
    "font-weight": 400
  },
  formControl: {
    // Form Control Styling
    width: "100%"
  },
  profileButton: {
    // Profile Button Styling
    color: "#c2c2c2",
    "text-transform": "none",
    "font-weight": 400,
    padding: "8px 8px 8px 8px"
  },
  menuItems: {
    //Style for the menu items
    "text-decoration": "none",
    color: "black",
    "text-decoration-underline": "none",
    "padding-top": "0px",
    "padding-bottom": "0px"
  },
  menuList: {
    //Styling for the menulist component
    padding: "0px"
  }
});
const customStyles = {
  // Style for the Modal
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const TabContainer = function(props) {
  return (
    <TypoGraphy component="div" style={{ padding: 0 }}>
      {props.children}
    </TypoGraphy>
  );
};

class Header extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      isModalOpen: false,
      loginContactNo: "",
      loginContactNoRequired: "display-none",
      loginPassword: "",
      loginPasswordRequired: "display-none",
      inValidLoginContact: "display-none",
      invalidPassword: "display-none",
      notRegisteredContact: "display-none",
      firstName: "",
      firstNameRequired: "display-none",
      lastName: "",
      email: "",
      emailRequired: "display-none",
      contactNo: "",
      contactNoRequired: "display-none",
      password: "",
      passwordRequired: "display-none",
      snackBarOpen: false,
      snackBarMessage: "",
      loggedIn: false,
      loggedInName: "",
      invalidEmailFormat: "display-none",
      passwordFormatRequired: "display-none",
      contactHelpText: "display-none",
      isMenuOpen: false
    };
  }

  loginButtonClickHandler = () => {
    console.log("clicked login button");
    this.setState({
      isModalOpen: true,
      value: 0
    });
  };

  closeModalHandler = () => {
    this.setState({
      ...this.state,
      isModalOpen: false,
      loginContactNoRequired: "display-none",
      loginPasswordRequired: "display-none",
      inValidLoginContact: "display-none",
      invalidPassword: "display-none",
      notRegisteredContact: "display-none",
      loginContactNo: "",
      loginPassword: "",
      firstName: "",
      firstNameRequired: "display-none",
      lastName: "",
      email: "",
      emailRequired: "display-none",
      contactNo: "",
      contactNoRequired: "display-none",
      password: "",
      passwordRequired: "display-none",
      snackBarOpen: false,
      snackBarMessage: "",
      invalidEmailFormat: "display-none",
      passwordFormatRequired: "display-none",
      contactHelpText: "display-none"
    });
  };

  tabsChangeHandler = (event, value) => {
    this.setState({
      value
    });
  };

  inputLoginContactNoChangeHandler = event => {
    this.setState({
      ...this.state,
      loginContactNo: event.target.value,
      loginContactNoRequired: "display-none"
    });
  };

  inputLoginPasswordChangeHandler = event => {
    this.setState({
      ...this.state,
      loginPassword: event.target.value,
      loginPasswordRequired: "display-none"
    });
  };

  inputFirstNameChangeHandler = event => {
    this.setState({
      ...this.state,
      firstName: event.target.value,
      firstNameRequired: "display-none"
    });
  };

  inputLastNameChangeHandler = event => {
    this.setState({
      ...this.state,
      lastName: event.target.value
    });
  };

  inputPasswordChangeHandler = event => {
    this.setState({
      ...this.state,
      password: event.target.value,
      passwordRequired: "display-none",
      passwordFormatRequired: "display-none"
    });
  };

  inputEmailChangeHandler = event => {
    this.setState({
      ...this.state,
      email: event.target.value,
      emailRequired: "display-none",
      invalidEmailFormat: "display-none"
    });
  };

  inputContactNoChangeHandler = event => {
    this.setState({
      ...this.state,
      contactNo: event.target.value,
      contactNoRequired: "display-none",
      contactHelpText: "display-none"
    });
  };

  validateLoginFormData = () => {
    let contactNo = this.state.loginContactNo;
    let password = this.state.loginPassword;
    let validationSuccessful = true;
    if (contactNo === "") {
      this.setState({
        loginContactNoRequired: "display-block"
      });
      validationSuccessful = false;
    }
    if (password === "") {
      this.setState({
        loginPasswordRequired: "display-block"
      });
      validationSuccessful = false;
    }
    return validationSuccessful;
  };

  loginClickHandler = () => {
    if (this.validateLoginFormData()) {
      let dataLogin = null;
      let xhrLogin = new XMLHttpRequest();
      let that = this;
      xhrLogin.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
          if (xhrLogin.status === 200) {
            let loginResponse = JSON.parse(this.responseText);
            sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
            sessionStorage.setItem(
              "access-token",
              xhrLogin.getResponseHeader("access-token")
            );
            sessionStorage.setItem("customer-name", loginResponse.first_name);
            that.setState({
              ...that.state,
              loggedIn: true,
              loggedInName: loginResponse.first_name,
              snackBarMessage: "Logged in successfully!",
              snackBarOpen: true
            });
            that.closeModalHandler(); //close th modal on successful login
          } else if (xhrLogin.status === 401) {
            //Checking for the error and showing the corresponding message.
            let loginResponse = JSON.parse(this.responseText);
            let notRegisteredContact = "display-none";
            let invalidPassword = "display-none";
            if (loginResponse.code === "ATH-001") {
              notRegisteredContact = "display-block";
            }
            if (loginResponse.code === "ATH-002") {
              invalidPassword = "display-block";
            }
            that.setState({
              ...that.state,
              notRegisteredContact: notRegisteredContact,
              invalidPassword: invalidPassword
            });
          }
        }
      });
      xhrLogin.open("POST", this.props.baseUrl + "customer/login");
      xhrLogin.setRequestHeader(
        "Authorization",
        "Basic " +
          window.btoa(
            this.state.loginContactNo + ":" + this.state.loginPassword
          )
      );
      xhrLogin.setRequestHeader("Content-Type", "application/json");
      xhrLogin.setRequestHeader("Cache-Control", "no-cache");
      xhrLogin.send(dataLogin);
    }
  };

  signUpFormValidation = () => {
    let signUpFormValidationSuccessful = true;
    if (this.state.firstName === "") {
      //Checking for the first name not empty
      this.setState({
        firstNameRequired: "display-block"
      });
      signUpFormValidationSuccessful = false;
    }
    if (this.state.email === "") {
      this.setState({
        emailRequired: "display-block"
      });
      signUpFormValidationSuccessful = false;
    }
    if (this.state.email !== "") {
      //Checking for the email format

      if (!/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w+)+$/.test(this.state.email)) {
        this.setState({
          invalidEmailFormat: "display-block"
        });
        signUpFormValidationSuccessful = false;
      }
    }
    if (this.state.contactNo === "") {
      this.setState({
        contactNoRequired: "display-block"
      });
      signUpFormValidationSuccessful = false;
    }
    if (this.state.contactNo !== "") {
      var contactNo = "[0-9]{10}";
      if (!this.state.contactNo.match(contactNo)) {
        this.setState({
          contactHelpText: "display-block"
        });
        signUpFormValidationSuccessful = false;
      }
    }
    if (this.state.password === "") {
      this.setState({
        passwordRequired: "display-block"
      });
      signUpFormValidationSuccessful = false;
    }
    if (this.state.password !== "") {
      if (!this.isPasswordValid(this.state.password)) {
        //Checking for password strength
        this.setState({
          passwordFormatRequired: "display-block"
        });
        signUpFormValidationSuccessful = false;
      }
    }

    return signUpFormValidationSuccessful;
  };

  isPasswordValid = password => {
    let lowerCase = false;
    let upperCase = false;
    let number = false;
    let specialCharacter = false;

    // Check min length
    if (password.length < 8) {
      return false;
    }
    // Check min 1 number
    if (password.match("(?=.*[0-9]).*")) {
      number = true;
    }

    // Check lowercase character
    if (password.match("(?=.*[a-z]).*")) {
      lowerCase = true;
    }

    // Check upper case character
    if (password.match("(?=.*[A-Z]).*")) {
      upperCase = true;
    }

    // Check special character
    if (password.match("(?=.*[#@$%&*!^]).*")) {
      specialCharacter = true;
    }

    if (lowerCase && upperCase) {
      if (specialCharacter && number) {
        return true;
      }
    } else {
      return false;
    }
    return false;
  };

  signUpClickHandler = () => {
    //Checking for the form validation
    if (this.signUpFormValidation()) {
      let dataSignUp = JSON.stringify({
        //Creating data for the post endpoint.
        contact_number: this.state.contactNo,
        email_address: this.state.email,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        password: this.state.password
      });

      let xhrSignUp = new XMLHttpRequest();
      let that = this;
      xhrSignUp.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
          if (xhrSignUp.status === 201) {
            that.setState({
              ...that.state,
              value: 0,
              snackBarMessage: "Registered successfully! Please login now!",
              snackBarOpen: true,
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              contactNo: ""
            });
          }
          if (xhrSignUp.status === 400) {
            //checking if error to display the error message
            let responseData = JSON.parse(this.responseText);
            if (responseData.code === "SGR-001") {
              that.setState({
                ...that.state,
                contactNoRegistered: "dispBlock"
              });
            }
          }
        }
      });
      xhrSignUp.open("POST", this.props.baseUrl + "customer/signup");
      xhrSignUp.setRequestHeader("Content-Type", "application/json");
      xhrSignUp.setRequestHeader("Cache-Control", "no-cache");
      xhrSignUp.send(dataSignUp);
    }
  };

  profileButtonClickHandler = event => {
    this.setState({
      anchorEl: event.currentTarget,
      isMenuOpen: !this.state.isMenuOpen
    });
  };

  onLogOutClickHandler = () => {
    let logoutData = null;
    let that = this;
    let xhrLogout = new XMLHttpRequest();
    xhrLogout.addEventListener("readystatechange", function() {
      if (xhrLogout.readyState === 4 && xhrLogout.status === 200) {
        sessionStorage.removeItem("uuid"); //Clearing uuid
        sessionStorage.removeItem("access-token"); //Clearing access-token
        sessionStorage.removeItem("customer-name"); //Clearing customer-name
        that.setState({
          ...that.state,
          loggedIn: false,
          isMenuOpen: !that.state.isMenuOpen
        });

        if (that.props.logoutRedirect) {
          that.props.logoutRedirect();
        }
      }
    });

    xhrLogout.open("POST", this.props.baseUrl + "customer/logout");
    xhrLogout.setRequestHeader(
      "authorization",
      "Bearer " + sessionStorage.getItem("access-token")
    );
    xhrLogout.send(logoutData);
  };

  inputSearchChangeHandler = event => {
    let searchOccured = true;
    if (!(event.target.value === "")) {
      let restaurantData = null;
      let that = this;
      let xhrSearchRestaurant = new XMLHttpRequest();

      xhrSearchRestaurant.addEventListener("readystatechange", function() {
        if (
          xhrSearchRestaurant.readyState === 4 &&
          xhrSearchRestaurant.status === 200
        ) {
          var restaurant = JSON.parse(this.responseText).restaurants;
          that.props.searchRestaurants(restaurant, searchOccured);
        }
      });

      xhrSearchRestaurant.open(
        "GET",
        this.props.baseUrl + "restaurant/name/" + event.target.value
      );
      xhrSearchRestaurant.setRequestHeader("Content-Type", "application/json");
      xhrSearchRestaurant.setRequestHeader("Cache-Control", "no-cache");
      xhrSearchRestaurant.send(restaurantData);
    } else {
      let restaurant = [];
      searchOccured = false;
      this.props.searchRestaurants(restaurant, searchOccured);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className="application-header">
          <FastfoodIcon
            className="application-logo"
            fontSize="large"
            htmlColor="white"
          />

          <span className="application-header-searchbox">
            <Input
              className={classes.searchText}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon id="search-icon" htmlColor="white"></SearchIcon>
                </InputAdornment>
              }
              fullWidth={true}
              placeholder="Search by Restaurant Name"
              onChange={this.inputSearchChangeHandler}
            />
          </span>

          {this.state.loggedIn !== true ? (
            <Button
              className={classes.loginButton}
              size="large"
              variant="contained"
              onClick={this.loginButtonClickHandler}
            >
              <AccountCircle className="login-button-icon" />
              LOGIN
            </Button>
          ) : (
            <Button
              className={classes.profileButton}
              size="large"
              variant="text"
              onClick={this.profileButtonClickHandler}
            >
              <AccountCircle
                className="profile-button-icon"
                htmlColor="#c2c2c2"
              />
              {this.state.loggedInName}
            </Button>
          )}

          <Menu
            id="profile-menu"
            anchorEl={this.state.anchorEl}
            anchorPosition="right"
            open={this.state.isMenuOpen}
            onClose={this.profileButtonClickHandler}
          >
            <MenuList className={classes.menuList}>
              <Link
                to={"/profile"}
                className={classes.menuItems}
                underline="none"
                color={"default"}
              >
                <MenuItem
                  className={classes.menuItems}
                  onClick={this.onMyProfileClicked}
                  disableGutters={false}
                >
                  My profile
                </MenuItem>
              </Link>
              <MenuItem
                className="menu-items"
                onClick={this.onLogOutClickHandler}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
        <Modal
          ariaHideApp={false}
          isOpen={this.state.isModalOpen}
          contentLabel="Login"
          onRequestClose={this.closeModalHandler}
          style={customStyles}
        >
          <Tabs value={this.state.value} onChange={this.tabsChangeHandler}>
            <Tab label="LOGIN" className={classes.tab} />
            <Tab label="SIGNUP" className={classes.tab} />
          </Tabs>
          {this.state.value === 0 && (
            <TabContainer>
              <div>
                <br />
                <FormControl required className={classes.formControl}>
                  <InputLabel htmlFor="login-contact-no">
                    Contact No.
                  </InputLabel>
                  <Input
                    id="login-contact-no"
                    fullWidth={true}
                    type="text"
                    logincontactno={this.state.loginContactNo}
                    onChange={this.inputLoginContactNoChangeHandler}
                    value={this.state.loginContactNo}
                  />
                  <FormHelperText className={this.state.loginContactNoRequired}>
                    <span className="red">required</span>
                  </FormHelperText>
                  <FormHelperText className={this.state.inValidLoginContact}>
                    <span className="red">Invalid Contact</span>
                  </FormHelperText>
                </FormControl>
                <br />
                <br />
                <FormControl required className={classes.formControl}>
                  <InputLabel htmlFor="login-password">Password</InputLabel>
                  <Input
                    id="login-password"
                    className="input-fields"
                    type="password"
                    loginpassword={this.state.loginPassword}
                    fullWidth={true}
                    onChange={this.inputLoginPasswordChangeHandler}
                    value={this.state.loginPassword}
                  />
                  <FormHelperText className={this.state.loginPasswordRequired}>
                    <span className="red">required</span>
                  </FormHelperText>
                  <FormHelperText className={this.state.invalidPassword}>
                    <span className="red">Invalid Credentials</span>
                  </FormHelperText>
                  <FormHelperText className={this.state.notRegisteredContact}>
                    <span className="red">
                      This contact number has not been registered!
                    </span>
                  </FormHelperText>
                </FormControl>
                <br />
                <br />
                <Button
                  variant="contained"
                  className={classes.formButton}
                  color="primary"
                  onClick={this.loginClickHandler}
                  position="center"
                >
                  LOGIN
                </Button>
              </div>
            </TabContainer>
          )}

          {this.state.value === 1 && (
            <TabContainer>
              <div>
                <br />
                <FormControl required className={classes.formControl}>
                  <InputLabel htmlFor="register-firstname">
                    First Name
                  </InputLabel>
                  <Input
                    id="register-firstname"
                    fullWidth={true}
                    type="text"
                    firstname={this.state.firstName}
                    onChange={this.inputFirstNameChangeHandler}
                    value={this.state.firstName}
                  />
                  <FormHelperText className={this.state.firstNameRequired}>
                    <span className="red">required</span>
                  </FormHelperText>
                </FormControl>
                <br />
                <br />
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="register-lastname">Last Name</InputLabel>
                  <Input
                    id="register-lastname"
                    fullWidth={true}
                    type="text"
                    lastname={this.state.lastName}
                    onChange={this.inputLastNameChangeHandler}
                    value={this.state.lastName}
                  />
                </FormControl>
                <br />
                <br />
                <FormControl required className={classes.formControl}>
                  <InputLabel htmlFor="register-email">Email</InputLabel>
                  <Input
                    id="register-email"
                    fullWidth={true}
                    type="text"
                    email={this.state.email}
                    onChange={this.inputEmailChangeHandler}
                    value={this.state.email}
                  />
                  <FormHelperText className={this.state.emailRequired}>
                    <span className="red">required</span>
                  </FormHelperText>
                  <FormHelperText className={this.state.invalidEmailFormat}>
                    <span className="red">Invalid Email</span>
                  </FormHelperText>
                </FormControl>
                <br />
                <br />
                <FormControl required className={classes.formControl}>
                  <InputLabel htmlFor="register-password">Password</InputLabel>
                  <Input
                    id="register-password"
                    fullWidth={true}
                    type="password"
                    password={this.state.password}
                    onChange={this.inputPasswordChangeHandler}
                    value={this.state.password}
                  />
                  <FormHelperText className={this.state.passwordRequired}>
                    <span className="red">required</span>
                  </FormHelperText>
                  <FormHelperText className={this.state.passwordFormatRequired}>
                    <span className="red">
                      Password must contain at least one capital letter, one
                      small letter, one number, and one special character
                    </span>
                  </FormHelperText>
                </FormControl>
                <br />
                <br />
                <FormControl required className={classes.formControl}>
                  <InputLabel htmlFor="register-contactno">
                    Contact No.
                  </InputLabel>
                  <Input
                    id="register-contactno"
                    fullWidth={true}
                    type="text"
                    lastname={this.state.contactNo}
                    onChange={this.inputContactNoChangeHandler}
                    value={this.state.contactNo}
                  />
                  <FormHelperText className={this.state.contactNoRequired}>
                    <span className="red">required</span>
                  </FormHelperText>
                  <FormHelperText className={this.state.contactHelpText}>
                    <span className="red">
                      Contact No. must contain only numbers and must be 10
                      digits long
                    </span>
                  </FormHelperText>
                </FormControl>
                <br />
                <br />
                <Button
                  variant="contained"
                  className={classes.formButton}
                  color="primary"
                  onClick={this.signUpClickHandler}
                  position="center"
                >
                  SIGNUP
                </Button>
              </div>
            </TabContainer>
          )}
        </Modal>

        <div>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={this.state.snackBarOpen}
            autoHideDuration={4000}
            onClose={this.snackBarClose}
            TransitionComponent={this.state.transition}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id">{this.state.snackBarMessage}</span>}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
