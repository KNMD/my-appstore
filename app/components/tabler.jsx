import React from "react";
import * as Icons from 'react-icons/tb';

  
const TablerIcon = ({ iconName, ...props }) => {
    const IconComponent = Icons[iconName];
    if (!IconComponent) return null;

    return <IconComponent {...props} />;
};

export default TablerIcon;