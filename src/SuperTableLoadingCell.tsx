import { Circle, Skeleton, Stack } from '@chakra-ui/react'
import { ReactNode } from 'react'

/**
 * Available skeleton cell types for loading rows.
 */
export type SuperTableLoadingCellType =
  | 'text'
  | 'line'
  | 'circle'
  | 'badge'
  | 'button'
  | 'avatar'
  | 'icon'

/**
 * Skeleton circle component for loading states.
 * Used internally for circle, avatar, and icon variants.
 */
const SkeletonCircle = ({ size = '20px' }: { size?: string }) => (
  <Circle size={size} asChild>
    <Skeleton />
  </Circle>
)

/**
 * Skeleton text component showing multiple lines.
 * Used internally for the 'text' variant.
 */
const SkeletonText = ({ noOfLines = 2 }: { noOfLines?: number }) => (
  <Stack gap="1" width="full">
    {Array.from({ length: noOfLines }).map((_, index) => (
      <Skeleton
        height="3"
        key={index}
        {...(index === noOfLines - 1 ? { maxW: '80%' } : {})}
      />
    ))}
  </Stack>
)

/**
 * Map of loading cell types to their skeleton components.
 * Used by SuperTableLoadingRow to render appropriate skeletons.
 */
export const SuperTableLoadingCellMap: Record<SuperTableLoadingCellType, ReactNode> = {
  /** Multi-line text skeleton */
  text: <SkeletonText />,
  /** Single line skeleton (default) */
  line: <Skeleton height="4">placeholder</Skeleton>,
  /** Small circle skeleton */
  circle: <SkeletonCircle />,
  /** Badge/tag shaped skeleton */
  badge: <Skeleton width="60px" height="20px" borderRadius="full" />,
  /** Button shaped skeleton */
  button: <Skeleton width="80px" height="32px" borderRadius="md" />,
  /** Large avatar circle skeleton */
  avatar: <SkeletonCircle size="40px" />,
  /** Small icon skeleton */
  icon: <Skeleton width="24px" height="24px" borderRadius="md" />
}
