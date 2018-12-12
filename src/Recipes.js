import React, { Component } from "react";
import { Query } from "react-apollo";
import recipesQuery from "./RecipesQuery";

export default class recipes extends Component {
  state = {
    vegetarian: false
  };
  updateVegetarian = ({ target: { checked } }) => {
    this.setState({
      vegetarian: checked
    });
  };
  render() {
    const { vegetarian } = this.state;
    return (
      <React.Fragment>
        <label>
          <input
            type="checkbox"
            checked={vegetarian}
            onChange={this.updateVegetarian}
          />
          <span>vegetarian</span>
        </label>
        <Query query={recipesQuery} variables={{ vegetarian: vegetarian }}>
          {({ data, loading, error }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Something went wrong.</p>;
            return (
              <ul>
                {data.recipes.map(({ id, title }) => (
                  <li key={id}>{title}</li>
                ))}
              </ul>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}
