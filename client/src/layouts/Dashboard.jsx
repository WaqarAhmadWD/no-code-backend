import  { useState } from 'react';

import PropTypes from 'prop-types';
Dashboard.propTypes = {
  Element: PropTypes.elementType,
  permissions: PropTypes.func,
};

function Dashboard({Element,permissions}) {

 
  return (
    <>

          <Element permissions={permissions}/>

    </>
  );
}

export default Dashboard;