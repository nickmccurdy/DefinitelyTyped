// Based on https://github.com/planttheidea/selectorator/blob/master/DEV_ONLY/App.js
// Copyright (c) 2016 Tony Quetano, MIT License
import moize from 'moize';
import createSelector from 'selectorator';

const getSubtotal = createSelector(
  ['shop.items'],
  (items) => {
    return items.reduce((sum: number, {value}: {value: number}) => {
      return sum + value;
    }, 0);
  },
  {
    memoizer: moize.simple
  }
);
const getTax = createSelector([getSubtotal, 'shop.taxPercent'], (subtotal, taxPercent) => {
  return subtotal * (taxPercent / 100);
});
const getTotal = createSelector([getSubtotal, getTax], (subtotal, tax) => {
  return subtotal + tax;
});

const state = {
  shop: {
    taxPercent: 8,
    items: [{name: 'apple', value: 1.2}, {name: 'orange', value: 0.95}]
  }
};

// $ExpectType number
getSubtotal(state);
// $ExpectType number
getTax(state);
// $ExpectType number
getTotal(state);

const getFlattedState = createSelector({
  items: 'shop.items',
  subtotal: getSubtotal,
  tax: getTax,
  total: getTotal
});

// $ExpectType { items: { name: string, value: number }[], subtotal: number, tax: number, total: number }
getFlattedState(state);

const getFoo = createSelector(
  ['foo'],
  (foo) => {
    return {
      bar: foo
    };
  },
  {
    deepEqual: true
  }
);

// $ExpectType { bar: 'baz'; }
getFoo({foo: 'baz'});
// $ExpectType { bar: 'baz'; }
getFoo({foo: 'baz'});

const getIdentity = createSelector(['foo.bar.baz[0]']);

// $ExpectType 'foo'
getIdentity({
  foo: {
    bar: {
      baz: ['foo']
    }
  }
});

const getMultipleParams = createSelector(
  ['foo.bar', {path: 'baz', argIndex: 1}, {path: 0, argIndex: 2}],
  (bar, baz, quz) => {
    return [bar, baz, quz];
  }
);

const first = {
  foo: {
    bar: 'baz'
  }
};
const second = {
  baz: 'quz'
};
const third = ['blah'];

// $ExpectType ['baz', 'quz', 'blah']
getMultipleParams(first, second, third);

// $ExpectError
createSelector();

// $ExpectError
createSelector([]);

// $ExpectError
createSelector([true]);
