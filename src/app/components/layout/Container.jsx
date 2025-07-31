import React from 'react';
import { cn } from '@/app/lib/utils';

const Container = React.forwardRef(({ className, size = 'default', ...props }, ref) => {
  const sizeVariants = {
    sm: 'max-w-2xl',
    default: 'max-w-7xl',
    lg: 'max-w-screen-2xl',
    full: 'max-w-full',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8',
        sizeVariants[size],
        className
      )}
      {...props}
    />
  );
});

Container.displayName = 'Container';

const Section = React.forwardRef(({ className, padding = 'default', ...props }, ref) => {
  const paddingVariants = {
    none: '',
    sm: 'py-8 sm:py-12',
    default: 'py-12 sm:py-16 lg:py-20',
    lg: 'py-16 sm:py-20 lg:py-24',
    xl: 'py-20 sm:py-24 lg:py-32',
  };

  return (
    <section
      ref={ref}
      className={cn(
        paddingVariants[padding],
        className
      )}
      {...props}
    />
  );
});

Section.displayName = 'Section';

const Grid = React.forwardRef(({ className, cols = 1, gap = 'default', ...props }, ref) => {
  const colsVariants = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  };

  const gapVariants = {
    none: 'gap-0',
    sm: 'gap-4',
    default: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'grid',
        colsVariants[cols],
        gapVariants[gap],
        className
      )}
      {...props}
    />
  );
});

Grid.displayName = 'Grid';

const Flex = React.forwardRef(({ 
  className, 
  direction = 'row', 
  align = 'start', 
  justify = 'start',
  wrap = false,
  gap = 'default',
  ...props 
}, ref) => {
  const directionVariants = {
    row: 'flex-row',
    column: 'flex-col',
    'row-reverse': 'flex-row-reverse',
    'column-reverse': 'flex-col-reverse',
  };

  const alignVariants = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
  };

  const justifyVariants = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  const gapVariants = {
    none: 'gap-0',
    sm: 'gap-2',
    default: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'flex',
        directionVariants[direction],
        alignVariants[align],
        justifyVariants[justify],
        wrap && 'flex-wrap',
        gapVariants[gap],
        className
      )}
      {...props}
    />
  );
});

Flex.displayName = 'Flex';

export { Container, Section, Grid, Flex };
