import React from 'react';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';

interface IProps {
    component: any;
}

export const LoadingComponent: React.FC<IProps> = ({component}) => {
  return (
    <div>
      <Segment>
        <Dimmer active>
          <Loader>{component}</Loader>
        </Dimmer>
      </Segment>
    </div>
  );
};
