import reducers from '../../src/reducers'
import * as types from '../../src/actions'

describe('search reducer', () => {
  it('should return the initial state', () => {
    expect(reducers(undefined, {}).search).toEqual(
      {
        recipes: null,
        isLoading: false,
        error: null
      }
    )
  })

  it('should handle GET_SEARCH', () => {
    expect(
      reducers({}, {
        type: types.GET_SEARCH,
      }).search
    ).toEqual(
      {
        isLoading: true,
      }
    )

    expect(
      reducers(
        {
          search: {
            recipes: null,
            isLoading: false,
            error: null
          }
        }
        ,
        {
          type: types.GET_SEARCH,
        }
      ).search
    ).toEqual(
      {
        isLoading: true,
      }
    )
  })

  it('should handle RECEIVE_SEARCH', () => {
    expect(
      reducers({}, {
        type: types.RECEIVE_SEARCH,
        payload: [{id: '123', instructions: 'deets'}]
      }).search
    ).toEqual(
      {
        isLoading: false,
        recipes: [{id: '123', instructions: 'deets'}],
        error: null
      }
    )

    expect(
      reducers(
        {
          search: {
            recipes: 'search present',
            isLoading: false,
            error: null
          }
        }
        ,
        {
          type: types.RECEIVE_SEARCH,
          payload: [{id: '123', instructions: 'deets2'}]
        }
      ).search
    ).toEqual(
      {
        isLoading: false,
        recipes: [{id: '123', instructions: 'deets2'}],
        error: null
      }
    )
  })

   it('should handle FAIL_SEARCH', () => {
    expect(
      reducers({}, {
        type: types.FAIL_SEARCH,
        payload: 'Error'
      }).search
    ).toEqual(
      {
        isLoading: false,
        recipes: null,
        error: 'Error'
      }
    )
  })
})