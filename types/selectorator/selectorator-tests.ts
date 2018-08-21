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

console.log('subtotal: ', getSubtotal(state));
console.log('tax: ', getTax(state));
console.log('total: ', getTotal(state));

const getFlattedState = createSelector({
  items: 'shop.items',
  subtotal: getSubtotal,
  tax: getTax,
  total: getTotal
});

console.log('structured state', getFlattedState(state));

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

console.log('using serializer', getFoo({foo: 'baz'}));
console.log(getFoo({foo: 'baz'}));

const getIdentity = createSelector(['foo.bar.baz[0]']);

console.log(
  getIdentity({
    foo: {
      bar: {
        baz: ['foo']
      }
    }
  })
);

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

console.log(getMultipleParams(first, second, third));

try {
  // $ExpectError
  createSelector();
} catch (error) {
  console.error(error);
}

try {
  createSelector([]);
} catch (error) {
  console.error(error);
}

try {
  // $ExpectError
  createSelector([true]);
} catch (error) {
  console.error(error);
}
