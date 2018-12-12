import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import recipesQuery from "./RecipesQuery";

const addRecipeMutation = gql`
  mutation addRecipe($recipe: RecipeInput!) {
    addRecipe(recipe: $recipe) {
      id
      title
    }
  }
`;

export default class AddRecipe extends Component {
  state = {
    title: "",
    vegetarian: false
  };
  updateVegetarian = ({ target: { checked } }) => {
    this.setState({
      vegetarian: checked
    });
  };
  updateTitle = ({ target: { value } }) => {
    this.setState({
      title: value
    });
  };
  resetFields = () => {
    this.setState({
      title: "",
      vegetarian: false
    });
  };
  render() {
    return (
      <Mutation
        mutation={addRecipeMutation}
        refetchQueries={[
          {
            query: recipesQuery,
            variables: { vegetarian: false }
          },
          { query: recipesQuery, variables: { vegetarian: true } }
        ]}
        awaitRefetchQueries={true}
      >
        {(addRecipe, { loading, error }) => {
          return (
            <form
              onSubmit={e => {
                e.preventDefault();
                addRecipe({
                  variables: {
                    recipe: {
                      title: this.state.title,
                      vegetarian: this.state.vegetarian
                    }
                  }
                });
                this.resetFields();
              }}
            >
              <label>
                <span>TITLE</span>
                <input
                  type="text"
                  value={this.state.title}
                  onChange={this.updateTitle}
                />
              </label>
              <label>
                <input type="checkbox" onChange={this.updateVegetarian} />
                <span>VEGETARIAN</span>
              </label>
              <button>Add Recipe</button>
              {loading && <p>Loading...</p>}
              {error && <p>Error! Please try again.</p>}
            </form>
          );
        }}
      </Mutation>
    );
  }
}
