import "./Home.css";
import Header from "../../common/header/Header";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography
} from "@material-ui/core";
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-free-solid";
import "@fortawesome/fontawesome-svg-core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },

  grid: {
    padding: "20px",
    transform: "translateZ(0)",
    cursor: "pointer"
  },
  gridCard: {
    //Style for the Grid card
    "@media (min-width: 1200px)": {
      "flex-grow": "0",
      "max-width": "25%",
      "flex-basis": "25%"
    },

    "@media (min-width: 960px) and (max-width:1200px)": {
      "flex-grow": "0",
      "max-width": "33%",
      "flex-basis": "33%"
    }
  },

  card: {
    height: "500px",
    "@media (min-width: 1300px)": {
      height: "500px"
    },
    "@media (min-width: 960px) and (max-width:1300px)": {
      height: "375px"
    }
  },

  media: {
    height: "40%",
    width: "100%"
  },
  title: {
    "font-size": "25px"
  },
  categories: {
    "font-size": "16px"
  },

  cardContent: {
    padding: "5px",
    "margin-left": "20px",
    height: "20%",
    display: "flex",
    "align-items": "center"
  },
  cardActionArea: {
    display: "flex",
    height: "100%",
    "flex-direction": "column",
    "align-items": "normal",
    "justify-content": "space-between"
  }
});

class Home extends Component {
  constructor() {
    super();
    this.state = {
      restaurant: null,
      isSearchOccured: false
    };
  }

  componentDidMount() {
    let data = null;
    let xhrRestaurant = new XMLHttpRequest();
    let that = this;
    xhrRestaurant.addEventListener("readystatechange", function() {
      if (xhrRestaurant.readyState === 4 && xhrRestaurant.status === 200) {
        let restaurant = JSON.parse(xhrRestaurant.responseText);
        that.setState({
          restaurant: restaurant.restaurants
        });
      }
    });
    console.log("baseUrl=" + this.props.baseUrl);
    xhrRestaurant.open("GET", this.props.baseUrl + "restaurant"); // Getting all data from the restaurant endpoint.
    xhrRestaurant.send(data);
  }

  restaurantCardClicked = id => {
    this.props.history.push("/restaurant/" + id);
  };

  searchRestaurants = (searchRestaurant, searchOccured) => {
    let allRestaurantData = [];
    if (searchOccured) {
      if (!this.state.isSearchOccured) {
        allRestaurantData = this.state.restaurant;
        this.setState({
          restaurant: searchRestaurant,
          allRestaurantData: allRestaurantData,
          isSearchOccured: true
        });
      } else {
        this.setState({
          ...this.state,
          restaurant: searchRestaurant
        });
      }
    } else {
      allRestaurantData = this.state.allRestaurantData;
      this.setState({
        restaurant: allRestaurantData,
        isSearchOn: false
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header
          baseUrl={this.props.baseUrl}
          searchRestaurants={this.searchRestaurants}
          showHeaderSearchBox={true}
        ></Header>
        <div className="flex-container">
          <Grid
            container
            spacing={3}
            wrap="wrap"
            alignContent="center"
            className={classes.grid}
          >
            {this.state.restaurant !== null ? (
              this.state.restaurant.map(restaurant => (
                <Grid
                  key={restaurant.id}
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  className={classes.gridCard}
                >
                  <Card className={classes.card}>
                    <CardActionArea
                      className={classes.cardActionArea}
                      onClick={() => this.restaurantCardClicked(restaurant.id)}
                    >
                      <CardMedia
                        className={classes.media}
                        image={restaurant.photo_URL}
                        title={restaurant.restaurant_name}
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography
                          className={classes.title}
                          variant="h5"
                          component="h2"
                        >
                          {restaurant.restaurant_name}
                        </Typography>
                      </CardContent>
                      <CardContent className={classes.cardContent}>
                        <Typography
                          variant="subtitle1"
                          component="p"
                          className={classes.categories}
                        >
                          {restaurant.categories}
                        </Typography>
                      </CardContent>
                      <CardContent className={classes.cardContent}>
                        <div className="card-bottom-info">
                          <span className="rest-rating">
                            <span>
                              <FontAwesomeIcon
                                icon="star"
                                size="lg"
                                color="white"
                              />
                            </span>
                            <Typography variant="caption" component="p">
                              {restaurant.customer_rating}
                            </Typography>
                            <Typography variant="caption" component="p">
                              ({restaurant.number_customers_rated})
                            </Typography>
                          </span>
                          <span className="cost-for-two">
                            <Typography
                              variant="caption"
                              component="p"
                              style={{ fontSize: "14px" }}
                            >
                              <i className="fa fa-inr" aria-hidden="true"></i>₹
                              {restaurant.average_price} for two
                            </Typography>
                          </span>
                        </div>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="body1" component="p">
                No restaurant with given name.
              </Typography>
            )}
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
