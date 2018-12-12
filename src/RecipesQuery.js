// import React, { Component } from "react";
import gql from "graphql-tag";
// import { Query } from "react-apollo";

export default gql`
  query recipes($vegetarian: Boolean!) {
    recipes(vegetarian: $vegetarian) {
      id
      title
    }
  }
`;
