import React from "react";
import { useQuery } from "@apollo/client";

import CreateStatus from "./CreateStatus";
import { All_STATUSES, FIND_STATUS } from "./statusQueries";

import Image from "material-ui-image";
import Typography from "@material-ui/core/Typography";

export default function Status() {
  const all_statuses = useQuery(All_STATUSES);
  const findStatus = useQuery(FIND_STATUS);
  if (all_statuses.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      {all_statuses.data.allStatuses.map((x: any) => (
        <>
          <Typography variant="h5">//{x.username}</Typography>
          <Typography variant="h6">{x.status_text}</Typography>
          <Image src={x.status_picture_url} />
        </>
      ))}
      <CreateStatus />
    </div>
  );
}
