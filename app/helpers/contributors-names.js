import Ember from 'ember';

export function contributorsNames([contributors]) {
  let sumNames = '';
  contributors.forEach((contributor, i) => {
    sumNames += contributor.get('contributorName');
    if (i < contributors.get('length') - 1) {
      sumNames += ' + ';
    }
  })
  return sumNames;
}

export default Ember.Helper.helper(contributorsNames);
