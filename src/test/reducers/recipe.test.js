import reducers from '../../reducers'
import * as types from '../../actions'

describe('recipe reducer', () => {
  it('should return the initial state', () => {
    expect(reducers(undefined, {}).recipe).toEqual(
      {
        recipe: null,
        isLoading: false,
        error: null
      }
    )
  })

  it('should handle GET_RECIPE', () => {
    expect(
      reducers({}, {
        type: types.GET_RECIPE,
      }).recipe
    ).toEqual(
      {
        isLoading: true,
      }
    )

    expect(
      reducers(
        {
          recipe: {
            recipe: 'recipe present',
            isLoading: false,
            error: null
          }
        }
        ,
        {
          type: types.GET_RECIPE,
        }
      ).recipe
    ).toEqual(
      {
        isLoading: true,
      }
    )
  })

  it('should handle RECEIVE_RECIPE', () => {
    expect(
      reducers({}, {
        type: types.RECEIVE_RECIPE,
        payload: {id: '123', instructions: 'deets'}
      }).recipe
    ).toEqual(
      {
        isLoading: false,
        recipe: {id: '123', instructions: 'deets'},
        error: null
      }
    )

    expect(
      reducers(
        {
          recipe: {
            recipe: 'recipe present',
            isLoading: false,
            error: null
          }
        }
        ,
        {
          type: types.RECEIVE_RECIPE,
          payload: {id: '123', instructions: 'deets2'}
        }
      ).recipe
    ).toEqual(
      {
        isLoading: false,
        recipe: {id: '123', instructions: 'deets2'},
        error: null
      }
    )
  })
})