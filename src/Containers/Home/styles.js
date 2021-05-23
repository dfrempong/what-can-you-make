import styled from 'styled-components'

export const HomeWrapper = styled.div`
  width: 75vw;
  height: 90vh;
  display: flex;
  flex-flow: column;
  margin: auto;
  padding: 8px;
`
export const RecipeButton = styled.div`
  &:hover {
    background: grey;
    cursor: pointer
  }
  &.selected {
    background: pink;
  }
  width: 100%
`