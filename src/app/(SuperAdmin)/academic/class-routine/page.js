import React from 'react'
import Data from "./Data"
import {withAuth} from "@/authHoc/withAuth";

const MyServerComponent = ({session}) => {
    return (
      <div>
      <Data session={session}/>
    </div>
  );
}

export default withAuth(MyServerComponent);
