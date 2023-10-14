import { gql } from "@apollo/client";

export const DASHBOARD = gql`
  query Dashboard {
    dashboard {
      scenarios {
        active
        inactive
        completed
      }
      lists {
        active
        inactive
        completed
      }
      dialogs {
        active
        inactive
        completed
      }
    }
  }
`;
