import React from 'react';
import { SVGProps } from 'react';

type IconProps = {
  icon: React.FC<SVGProps<SVGSVGElement>>;
  className?: string;
};

const SvgIcon: React.FC<IconProps> = ({ icon: Icon, className = '' }) => {
  return <Icon className={className} />;
};

export default SvgIcon; 