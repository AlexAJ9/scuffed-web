import React from "react";
import { useQuery } from "@apollo/client";

import CreateStatus from "./CreateStatus";
import { All_STATUSES, FIND_STATUS } from "./statusQueries";

import Image from "material-ui-image";

export default function Status() {
  const all_statuses = useQuery(All_STATUSES);
  const findStatus = useQuery(FIND_STATUS);
  if (all_statuses.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      saddsa
      {all_statuses.data.allStatuses.map((x: any) => (
        <div>
          <p>{x.status_text}</p> <Image src={x.status_picture_url} />
        </div>
      ))}
      <CreateStatus />
    </div>
  );
}
