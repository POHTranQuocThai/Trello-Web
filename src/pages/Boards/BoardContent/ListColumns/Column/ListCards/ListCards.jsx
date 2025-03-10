

import { Box } from '@mui/material'
import Card from './Card/Card'
import { verticalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'


function ListCards({ cards }) {
  return (
    <SortableContext items={cards?.map(c => c._id)} strategy={verticalListSortingStrategy}>
      <Box
        sx={{
          p: '0 5px 5px',
          m: '0 5px',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          overflowX: 'hidden',
          overflowY: 'auto',
          maxHeight: (theme) => `calc(
            ${theme.trello.boardContentHeight} - 
            ${theme.spacing(5)} -
            ${theme.trello.column_header_height} -
            ${theme.trello.column_footer_height}
            )`,
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ced0da',
            borderRadius: '8px'
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#bfc2cf'
          }
        }}
      >
        {cards?.map(card => (<Card key={card._id} card={card} />))}
      </Box>
    </SortableContext>
  )
}

export default ListCards
