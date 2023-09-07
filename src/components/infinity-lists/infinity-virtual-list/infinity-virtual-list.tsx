import React, { CSSProperties } from 'react'
import { FixedSizeList } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import { DEFAULT_ITEM_HEIGHT, DEFAULT_ITEM_SIZE, DEFAULT_ITEM_WIDTH } from './infinity-virtual-list.config'

type Props<T> = {
  hasNextPage: boolean
  isNextPageLoading: boolean
  items: T[]
  loadNextPage: () => void
  Item: any
  ItemSkeleton?: any
  height?: number
  width?: number
  itemSize?: number
}

interface IInfinityVirtualListDefault {
  _id: string
}

interface IWrappedItem {
  index: number
  style: CSSProperties
}

const InfinityVirtualList = <T extends IInfinityVirtualListDefault>(props: Props<T>) => {
  const { hasNextPage, isNextPageLoading, items, height, width, itemSize, Item, ItemSkeleton, loadNextPage } = props
  /** plus 1 is to detect the data list has more data to fetch */
  const itemCount = hasNextPage ? items.length + 1 : items.length

  const loadMoreItems = isNextPageLoading
    ? () => {
        return
      }
    : loadNextPage

  const isItemLoaded = (idx: number) => !hasNextPage || idx < items.length

  const WrappedItem = ({ index, style }: IWrappedItem) => {
    if (!isItemLoaded(index)) {
      return !!ItemSkeleton ? <ItemSkeleton style={style} /> : <div>Loading...</div>
    }

    return <Item style={style} key={items[index]?._id || `item-${index}`} data={items[index]} />
  }

  return (
    <InfiniteLoader isItemLoaded={isItemLoaded} itemCount={itemCount} loadMoreItems={loadMoreItems}>
      {({ onItemsRendered, ref }) => (
        <FixedSizeList
          className='List'
          height={height ?? DEFAULT_ITEM_HEIGHT}
          itemCount={itemCount}
          itemSize={itemSize ?? DEFAULT_ITEM_SIZE}
          onItemsRendered={onItemsRendered}
          ref={ref}
          width={width ?? DEFAULT_ITEM_WIDTH}
        >
          {WrappedItem}
        </FixedSizeList>
      )}
    </InfiniteLoader>
  )
}

export default InfinityVirtualList
