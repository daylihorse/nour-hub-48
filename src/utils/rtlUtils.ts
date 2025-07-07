/**
 * RTL (Right-to-Left) utility functions for consistent Arabic/Hebrew support
 */

export type Direction = 'ltr' | 'rtl';

/**
 * Helper class names for RTL-aware layout
 */
export const rtlClasses = {
  // Flexbox utilities
  flexRowReverse: 'rtl:flex-row-reverse',
  flexStart: 'flex justify-start rtl:justify-end',
  flexEnd: 'flex justify-end rtl:justify-start',
  flexBetween: 'flex justify-between',
  
  // Text alignment
  textLeft: 'text-left rtl:text-right',
  textRight: 'text-right rtl:text-left',
  textStart: 'text-start',
  textEnd: 'text-end',
  
  // Margins and Padding (logical properties)
  marginStart: (size: string) => `ms-${size}`,
  marginEnd: (size: string) => `me-${size}`,
  paddingStart: (size: string) => `ps-${size}`,
  paddingEnd: (size: string) => `pe-${size}`,
  
  // Positioning
  left: 'left-0 rtl:right-0 rtl:left-auto',
  right: 'right-0 rtl:left-0 rtl:right-auto',
  
  // Borders
  borderLeft: 'border-l rtl:border-r rtl:border-l-0',
  borderRight: 'border-r rtl:border-l rtl:border-r-0',
  
  // Rounded corners
  roundedLeft: 'rounded-l rtl:rounded-r rtl:rounded-l-none',
  roundedRight: 'rounded-r rtl:rounded-l rtl:rounded-r-none',
  
  // Transforms for directional icons
  flipHorizontal: 'rtl:scale-x-[-1]',
};

/**
 * Combines class names with RTL awareness
 */
export const cn = (...classes: (string | undefined | boolean)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Determines if a direction is RTL
 */
export const isRTL = (direction: Direction): boolean => {
  return direction === 'rtl';
};

/**
 * Gets the opposite direction
 */
export const getOppositeDirection = (direction: Direction): Direction => {
  return direction === 'rtl' ? 'ltr' : 'rtl';
};

/**
 * Creates direction-aware class names
 */
export const createDirectionalClasses = (
  direction: Direction,
  ltrClasses: string,
  rtlClasses: string
): string => {
  return direction === 'rtl' ? rtlClasses : ltrClasses;
};

/**
 * Icon components that should be flipped in RTL
 */
export const directionalIcons = [
  'arrow-left',
  'arrow-right', 
  'chevron-left',
  'chevron-right',
  'move-left',
  'move-right',
  'corner-down-left',
  'corner-down-right',
  'corner-up-left',
  'corner-up-right',
  'trending-up',
  'trending-down',
];

/**
 * Checks if an icon should be flipped in RTL
 */
export const shouldFlipIcon = (iconName: string): boolean => {
  return directionalIcons.includes(iconName);
};

/**
 * Gets appropriate margin classes for RTL
 */
export const getMarginClasses = (direction: Direction, position: 'start' | 'end', size: string): string => {
  if (position === 'start') {
    return direction === 'rtl' ? `mr-${size}` : `ml-${size}`;
  } else {
    return direction === 'rtl' ? `ml-${size}` : `mr-${size}`;
  }
};

/**
 * Gets appropriate padding classes for RTL
 */
export const getPaddingClasses = (direction: Direction, position: 'start' | 'end', size: string): string => {
  if (position === 'start') {
    return direction === 'rtl' ? `pr-${size}` : `pl-${size}`;
  } else {
    return direction === 'rtl' ? `pl-${size}` : `pr-${size}`;
  }
};

/**
 * Common RTL-aware layout patterns
 */
export const rtlLayouts = {
  // Button with icon
  buttonWithIcon: (direction: Direction) => cn(
    'flex items-center gap-2',
    direction === 'rtl' && 'flex-row-reverse'
  ),
  
  // Card header with actions
  cardHeader: (direction: Direction) => cn(
    'flex justify-between items-center',
    direction === 'rtl' && 'flex-row-reverse'
  ),
  
  // Form field with label
  formField: (direction: Direction) => cn(
    'space-y-2',
    direction === 'rtl' && 'text-right'
  ),
  
  // Navigation item
  navItem: (direction: Direction) => cn(
    'flex items-center gap-3 px-3 py-2',
    direction === 'rtl' && 'flex-row-reverse'
  ),
  
  // Table cell with actions
  tableCell: (direction: Direction) => cn(
    'flex items-center gap-2',
    direction === 'rtl' && 'flex-row-reverse justify-end'
  ),
};