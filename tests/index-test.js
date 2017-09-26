import expect from 'expect';
import * as ReactSignin from 'src/';

describe('ReactSignin', () => {
  it('is a valid module', () => {
  	expect(ReactSignin);
  });

  it('exports necessary modules', function(){
  	const { MakeActions, ActionTypes, Reducers, Selectors } = ReactSignin;
  	expect(MakeActions);
  	expect(ActionTypes);
  	expect(Reducers);
  	expect(Selectors);
  });
})
