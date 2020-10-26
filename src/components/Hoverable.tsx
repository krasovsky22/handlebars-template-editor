import React, { useState, useCallback, MouseEvent } from 'react';
import classNames from 'classnames';
import useHover from '@hooks/useHover';

interface HoverablePropsType {
  children: React.ReactChild;
  className?: string;
}

const Hoverable: React.FC<HoverablePropsType> = ({
  children,
  className,
}: HoverablePropsType) => {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  return (
    <div
      ref={hoverRef}
      className={classNames({
        'current-hovered': isHovered,
        [className as string]: true,
      })}
    >
      {children}
    </div>
  );
};

export default Hoverable;
