import React from "react";
import { useQuery } from "@apollo/client";
import { All_STATUSES, FIND_STATUS } from "./statusQueries";

export default function Status() {
  const all_statuses = useQuery(All_STATUSES);
  const findStatus = useQuery(FIND_STATUS);
  if (all_statuses.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      saddsa
      {all_statuses.data.allStatuses.map((x: any) => x.status_text)}
    </div>
  );
}
