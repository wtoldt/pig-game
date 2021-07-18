import { actions, utils }  from '../App.gameActions';
import { INITIAL_STATE } from '../App.consts';

describe('Game Action Tests', () => {

  //https://jestjs.io/docs/api#testeachtablename-fn-timeout
  it.each(Object.entries(actions))('%s returns entire state', (actionName, action) => {
    const newState = action({...INITIAL_STATE});
    expect(
      Object.keys(newState).sort()
    ).toEqual(
      Object.keys(INITIAL_STATE).sort()
    );
  });

});

describe('Game Action Utility Tests', () => {
  it('act passes gamestate through an arry of actions', () => {
    //assemble
    const mockState = {touched: undefined};
    const action1 = jest.fn().mockReturnValue({touched: 'action1'});
    const action2 = jest.fn().mockReturnValue({touched: 'action2'});
    const action3 = jest.fn().mockReturnValue({touched: 'action3'});

    //act
    const newState = utils.act(mockState, [action1, action2, action3]);

    //assert
    expect(action1).toHaveBeenCalledWith({touched: undefined});
    expect(action2).toHaveBeenCalledWith({touched: 'action1'});
    expect(action3).toHaveBeenCalledWith({touched: 'action2'});
    expect(newState).toEqual({touched: 'action3'});
  });

  it('setCurrentScore sets current score based on parameter', () => {
    //assemble & act
    const newState = utils.setCurrentScore({...INITIAL_STATE}, 99);

    //assert
    expect(newState.p1.currentScore).toEqual(99);
  });
});