import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Protect = ({Component, name }) => {
    useEffect(()=>{
        document.title = name
    },[name])
  return <Component/>
}

Protect.propType = {
    Component: PropTypes.any
}

export default Protect